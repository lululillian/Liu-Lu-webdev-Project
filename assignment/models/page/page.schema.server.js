/**
 * Created by lululillian on 3/13/17.
 */
module.exports = function () {
    var mongoose = require('mongoose');
    var PageSchema = mongoose.Schema({
        _website: String,
        name: String,
        title:String,
        description:String,
        widgets:[String],
        dateCreated: {type:Date,default:Date.now()}
    }, {collection: 'page'});

    return PageSchema;
};