/**
 * Created by lululillian on 3/13/17.
 */
module.exports = function (app,tradeModel) {

    //app.get("/api/user", findUser);
    //app.get("/api/user/:userId", findUserById);
    //app.put("/api/user/:userId", updateUser);
    // app.delete("/api/user/:userId", deleteUser);
    var api = {
        createTrade: createTrade,
        updateTrade:updateTrade,
        deleteTrade:deleteTrade,
        findTrade:findTrade,
        findTradeWithFilter:findTradeWithFilter,
        findAllTrade:findAllTrade,
        findGame:findGame,
        findTradesForUser:findTradesForUser,
        tradeModel:TradeModel,
        deleteTradeById:deleteTradeById,
        findTradesForUserBackEnd:findTradesForUserBackEnd,
        search:search
    };

    var http = require('http');

    var gameInfoURL = "http://store.steampowered.com/api/appdetails?appids=";
    var gameURL ="http://store.steampowered.com/app/";
    var mongoose = require('mongoose');
    mongoose.Promise = global.Promise;

    var TradeSchema = require('./trade.schema.server.js')();
    var TradeModel = mongoose.model('TradeModel', TradeSchema);


    var GameSchema = require('./game.schema.server.js')();
    var GameModel = mongoose.model('GameModel', GameSchema);


    function findTradeWithGameId(gameId){
        return TradeModel.find({have:gameId});
    }
    function deleteTrade(req, res) {
        var tradeId = req.params.tid;
        TradeModel
            .remove({_id: tradeId})
            .then(
                function (movies) {
                    res.send(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )
    }

    function search(req, res) {


        var q = req.params.query;
        var result = [];
        GameModel
            .find({name : {$regex : new RegExp(".*"+q+".*", "i")}})
            .then(
                function (games) {
                    if(games.length == 0) {

                        res.json(result);
                    }
                    else{
                        games.forEach(function(game) {
                            findTradeWithGameId(game.gameId)
                                .then(
                                    function (trades) {
                                        var temp = trades.length;

                                            trades.forEach(function(trade) {
                                                    temp--;
                                                    if (trade != null) result.push(trade);
                                                    if (temp == 0) {
                                                        console.log(result.length);
                                                        res.json(result);
                                                    }
                                                }
                                            );
                                        },
                                        function (err) {
                                    });
                        });
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )
    }


    function deleteTradeById(tid) {
        TradeModel
            .remove({_id: tid})
            .then(
                function (movies) {
                    res.send(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )
    }

    function createTrade(req,res) {
        var trade = req.body;
        var user = trade.user;
        var have = trade.have;
        var want = trade.want;
        createGameIfNotExist(user,have);
        if(have != want ) createGameIfNotExist(user,want);
        TradeModel.create(trade)
            .then(function(){},function(){});

    }

    function createGameIfNotExist(user,gameId){
        GameModel.findOne({gameId:gameId})
            .then(function(response){
                    if(response == null)  createGame(user,gameId);

                },
                function(e){
                }
            );
    }
    function updateTrade(req,res) {
            var trade = req.body;

        createGameIfNotExist(trade.user,trade.have);
        if(trade.have != trade.want ) createGameIfNotExist(trade.user,trade.want);
            TradeModel
                .update({_id: trade._id}, {$set: {
                have:trade.have,
                want:trade.want

                }})
                .then(
                    function (status) {
                        res.json(status);
                    },
                    function (error) {
                        res.sendStatus(400).send(error);
                    }
                );

    }

    function findAllTrade(req,res) {
            TradeModel
                .find()
                .then(
                    function (trades) {
                        res.json(trades);
                    },
                    function (error) {
                        res.sendStatus(400).send(error);
                    }
                );

    }
    function findTradesForUser(req,res){
        var userId = req.params.uid;
        return TradeModel.find({user:userId})
            .then(
                function (trades) {
                    res.json(trades);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findTradesForUserBackEnd(userId){
        return TradeModel.find({user:userId});
    }


    function findGame(req,res) {
        var gameId = req.params.gameId;
        return GameModel.findOne({gameId:Number(gameId)})
            .then(
                function (game) {
                    res.json(game);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findTradeWithFilter(req,res) {
        var filter = req.body;
        var f = {};
        for (var key in filter) {
            if(filter[key] == true) f[key] = true;
        }
        var result = [];
        TradeModel
            .find()
            .then(
                function (trades) {
                    var temp = 0;
                    trades.forEach(function(t){
                        GameModel.findOne({gameId:Number(t.have)})
                            .then(
                                function (game) {
                                    temp++;
                                    if(f[game.type] == true) {
                                        result.push(t);
                                        if(temp == trades.length) {
                                            res.json(result);
                                            return;
                                        }
                                    }
                                },
                                function (error) {
                                    res.sendStatus(400).send(error);
                                }
                            );
                    });
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }





    function findTrade(req,res) {
        var tid = req.params.tid;
        TradeModel
            .findOne({_id:tid})
            .then(
                function (trade) {
                    res.json(trade);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }
    function createGame(userId,gameId){



             http.get({
             host: 'store.steampowered.com',
             path: '/api/appdetails?appids='+gameId
             }, function(response) {
             // Continuously update stream with data
             var body = '';
             response.on('data', function(d) {
             body += d;
             });
             response.on('end', function() {
             body = JSON.parse(body);

             if(body == null){}//to be contninued
             var game = {
             gameId:Number(gameId),
             name: body[gameId].data.name,
             type:body[gameId].data.genres[0].description,
             image_url:body[gameId].data.header_image,
             url:gameURL+gameId,
             short_description:body[gameId].data.short_description,
              video:body[gameId].data.movies[0].webm["480"],
              dev : body[gameId].data.developers[0],
                 pub: body[gameId].data.publishers[0]

             }

             GameModel.create(game).
             then(function(a){},function(){});

             });
             });






    }


    return api;

};