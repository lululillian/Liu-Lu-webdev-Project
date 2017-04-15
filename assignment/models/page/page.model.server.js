/**
 * Created by lululillian on 3/13/17.
 */
module.exports = function (app) {

    //app.get("/api/user", findUser);
    //app.get("/api/user/:userId", findUserById);
    //app.put("/api/user/:userId", updateUser);
    // app.delete("/api/user/:userId", deleteUser);

    var api = {
        createPage: createPage,
        findAllPagesForWebsite:findAllPagesForWebsite,
        findPageById:findPageById,
        updatePage:updatePage,
        deletePage:deletePage
    };

    var mongoose = require('mongoose');

    var PageSchema = require('./page.schema.server')();
    var PageModel = mongoose.model('PageModel', PageSchema);


    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params.websiteId;
        PageModel
            .find({_website:websiteId})
            .then(
                function (websites) {
                    res.json(websites);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }




    function deletePage(req, res) {
        var pageId = req.params.pageId;
        PageModel
            .remove({_id: pageId})
            .then(
                function (page) {
                    res.send(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )
    }

    function createPage(req, res) {
        var newPage = req.body;
        PageModel
            .create(newPage)
            .then(function(page){
                res.json(page);
            }, function (err) {
                res.sendStatus(400).send(err);
            })
    }

    function findPageById(req, res) {
        var pageId = req.params.pageId;
        PageModel
            .findById(pageId)
            .then(
                function (page) {
                    res.json(page);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }


    function updatePage(req, res) {
            var pageId = req.params.pageId;
            var page = req.body;
            PageModel
                .update({_id: pageId}, {$set: {
                    name: page.name,
                    description: page.description,

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
    return api;

};