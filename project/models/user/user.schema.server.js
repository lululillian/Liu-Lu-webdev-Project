/**
 * Created by lululillian on 3/13/17.
 */
module.exports = function () {
    var mongoose = require('mongoose');
    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        avatar:{type:String,default:"http://www.photographersadventureclub.com/wp-content/uploads/2013/02/blank-avatar.png"},
        steam:String,
        comments:[{user:String,comment:String}],
        //websites: [Website],
        dateCreated: {type:Date,default:Date.now()},
        facebook: {
            id:    String,
            token: String
        }
    }, {collection: 'user_game'});

    return UserSchema;
};