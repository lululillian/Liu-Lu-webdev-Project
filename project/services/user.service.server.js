/**
 * Created by lululillian on 2/27/17.
 */
module.exports = function (app,userModel,tradeModel) {

    var bcrypt = require("bcrypt-nodejs");
    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var FacebookStrategy = require('passport-facebook').Strategy;

    // login with sesson
    app.post  ('/game/login', passport.authenticate('local'), login);
    app.post('/game/logout', logout);
    app.post ('/game/register', register);
    app.get ('/game/loggedin', isLoggedin);
    app.put ('/game/comment/', userModel.updateComment);
    app.get ('/game/allUser/', userModel.findAllUser);

    function isLoggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    var passport = require('passport');
    passport.use(new LocalStrategy(localStrategy));


    function deleteUser(req, res) {
        var userId = req.params.userId;
        userModel.deleteUser(req,res);
        tradeModel.findTradesForUserBackEnd(userId)
            .then(
                function(trades){
                    trades.forEach(function(t){
                        tradeModel.deleteTradeById(t._id);
                    });
                },
                function(err){}
            );

    }

    function localStrategy(username, password, done) {
        nsole.log(username);
        console.log(password);
        userModel
            .findUserByUsername(username)
            .then(
                function(user){
                    if(user && bcrypt.compareSync(password, user.password)) {
                        console.log(user);
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }
    var facebookConfig = {
        clientID     : 204772693193270,
        clientSecret : "5988b6517dd913035dc5dd32ed34f5cc",
        callbackURL  : "https://lulu-webdev.herokuapp.com/auth/facebook/callback"
    };
    app.post ('/game/register', register);

    app.get("/game/user/:userId", userModel.findUserByUserId);
    app.put("/game/user/:userId", userModel.updateUser);
    app.delete("/game/user/:userId", deleteUser);
    app.post("/game/user", userModel.createUser);
    app.get("/game/user", userModel.findUser);
    app.post('/game/logout', logout);
    app.get ('/game/facebook', passport.authenticate('facebook', { scope : 'email' }));
    // facebook callback api
    app.get('/game/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/assignment/#/user/',
            failureRedirect: '/assignment/#/login'
        }));


    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

    function facebookStrategy(token, refreshToken, profile, done) {
        userModel
            .findUserByFacebookId(profile.id)
            .then(
                function(user) {
                    if (user == null) {
                        var user  = {};
                        user.firstName = profile.name.givenName || "";
                        user.lastName = profile.name.familyName || "";
                        user.facebook = {id : profile.id, token : token};
                        return userModel.createUser(user)
                            .then(
                                function(val){
                                    return done(null, val);
                                },
                                function (err) {
                                    return done(err, false);
                                });
                    } else {
                        return done(null, user);
                    }
                }
            );
    }
    function logout(req, res) {
        req.logOut();
        res.send(200);
    }



    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    passport.serializeUser(serializeUser);
    function serializeUser(user, done) {
        done(null, user);
    }
    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }


    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firsatName: "Jose",   lastName: "Annunzi" }
    ];

    function findUserByUsername(req, res) {
        var username = req.query['username'];
        var user = users.find(function(u){
            return u.username == username;
        });
        if(user) {
            res.send(user);
        } else {
            res.sendStatus(404).send('User not found for username: ' + username);
        }
    }


    function register (req, res) {
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
        userModel
            .createUser(user)
            .then(
                function (user) {
                    req.login(user, function (err) {
                        if (err) {
                            res.status(400).send("register fail");
                        }
                        res.status(200).send(user);
                    });
                });
    }

};