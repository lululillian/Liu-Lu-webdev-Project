/**
 * Created by lululillian on 3/13/17.
 */
module.exports = function () {
    var mongoose = require('mongoose');
    var WidgetSchema = mongoose.Schema({
        _page: String,
        type: String,
        name: String,
        text:String,
        placeholder:String,
        description:String,
        url:String,
        width:{type:String,default:"100%"},
        height:String,
        rows:Number,
        size:Number,
        class:String,
        icon:String,
        deletable:Boolean,
        formatted:Boolean,
        dateCreated: {type:Date,default:Date.now()}
    }, {collection: 'widget'});

    return WidgetSchema;
};