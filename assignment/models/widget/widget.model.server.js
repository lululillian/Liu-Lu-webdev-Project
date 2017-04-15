/**
 * Created by lululillian on 3/13/17.
 */
module.exports = function (app) {


    var api = {
        createWidget: createWidget,
        findAllWidgetsForPage:findAllWidgetsForPage,
        findWidgetById:findWidgetById,
        updateWidget:updateWidget,
        deleteWidget:deleteWidget
        //reorderWidget:reorderWidget
    };

    var mongoose = require('mongoose');

    var WidgetSchema = require('./widget.schema.server')();
    var WidgetModel = mongoose.model('WidgetModel', WidgetSchema);


    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;
        WidgetModel
            .remove({_id: widgetId})
            .then(
                function (widget) {
                    res.send(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )
    }

    function createWidget(req, res) {
        var newWidget = req.body;
        WidgetModel
            .create(newWidget)
            .then(function(widget){
                res.json(widget);

            }, function (err) {
                res.sendStatus(400).send(err);
            })
    }

    function findAllWidgetsForPage(req, res) {
        var pageId = req.params.pageId;
        WidgetModel
            .find({_page:pageId})
            .then(
                function (websites) {
                    res.json(websites);
                },
                function (error) {
                    console.log(error);
                    res.sendStatus(400).send(error);
                }
            );
    }


    function updateWidget(req, res) {
        var widgetId = req.params.widgetId;
        var widget = req.body;
        var updatedWidget = {};
        if(widget._page) updatedWidget._page = widget._page;
        if(widget.name) updatedWidget.name = widget.name;
        if(widget.text) updatedWidget.text = widget.text;
        if(widget.placeholder) updatedWidget.placeholder = widget.placeholder;
        if(widget.description) updatedWidget.description = widget.description;
        if(widget.url) updatedWidget.url = widget.url;
        if(widget.width) updatedWidget.width = widget.width;
        if(widget.height) updatedWidget.height = widget.height;
        if(widget.rows) updatedWidget.rows = widget.rows;
        if(widget.size !=undefined) updatedWidget.size = widget.size;
        if(widget.class) updatedWidget.class = widget.class;
        if(widget.icon) updatedWidget.icon = widget.icon;
        if(widget.deletable!= undefined) updatedWidget.deletable = widget.deletable;
        if(widget.formatted != undefined) updatedWidget.formatted = widget.formatted;
        WidgetModel
            .update({_id: widgetId}, {$set:updatedWidget })
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

    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;
        WidgetModel
            .findById(widgetId)
            .then(function(widget){
                    res.json(widget);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }
    return api;

};