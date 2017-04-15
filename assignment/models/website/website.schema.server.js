/**
 * Created by lululillian on 3/13/17.
 */
module.exports = function () {
    var mongoose = require('mongoose');
    var WebsiteSchema = mongoose.Schema({
        _user: String,
        name: String,
        description:String,
        pages: [Number],
        dateCreated: {type:Date,default:Date.now()}
    }, {collection: 'website'});

    return WebsiteSchema;
};