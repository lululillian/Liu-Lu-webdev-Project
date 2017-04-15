/**
 * Created by lululillian on 3/13/17.
 */
module.exports = function (app) {

    //app.get("/api/user", findUser);
    //app.get("/api/user/:userId", findUserById);
    //app.put("/api/user/:userId", updateUser);
    // app.delete("/api/user/:userId", deleteUser);

    var api = {
        createWebsite: createWebsite,
        findWebsiteById:findWebsiteById,
        updateWebsite:updateWebsite,
        deleteWebsite:deleteWebsite,
        findAllWebsitesForUser:findAllWebsitesForUser
    };

    var mongoose = require('mongoose');

    var WebsiteSchema = require('./website.schema.server')();
    var WebsiteModel = mongoose.model('WebsiteModel', WebsiteSchema);


    function deleteWebsite(req, res) {
        var websiteId = req.params.websiteId;
        WebsiteModel
            .remove({_id: websiteId})
            .then(
                function (movies) {
                    res.send(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )
    }

    function createWebsite(req, res) {
        var newWebsite = req.body;
        WebsiteModel
            .create(newWebsite)
            .then(function(website){
                console.log(website);
                res.json(website);

            }, function (err) {
                console.log(err);

                res.sendStatus(400).send(err);
            })
    }

    function findAllWebsitesForUser(req, res) {
        var userId = req.params.userId;
        WebsiteModel
            .find({_user:userId})
            .then(
                function (websites) {
                    res.json(websites);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }


    function updateWebsite(req, res) {
        var websiteId = req.params.websiteId;
        var website = req.body;
        WebsiteModel
            .update({_id: websiteId}, {$set: {
                name: website.name,
                description: website.description,

            }})
            .then(
                function (status) {
                    console.log(status);
                    res.json(status);
                },
                function (error) {

                    res.sendStatus(400).send(error);
                }
            );
    }

    function findWebsiteById(req, res) {
        var websiteId = req.params.websiteId;
        WebsiteModel
            .findById(websiteId)
            .then(function(website){
                res.json(website);
            },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }
    return api;

};