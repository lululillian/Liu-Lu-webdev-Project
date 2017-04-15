/**
 * Created by lululillian on 3/13/17.
 */
module.exports = function () {
    var mongoose = require('mongoose');
    var GameSchema = mongoose.Schema({
        gameId:Number,
        name: String,
        type:String,
        url:String,
        image_url:String,
        short_description:String,
        video:String,
        dev:String,
        pub:String,
        dateCreated: {type:Date,default:Date.now()}
    }, {collection: 'game'});

    return GameSchema;
};