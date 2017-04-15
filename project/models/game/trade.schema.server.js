/**
 * Created by lululillian on 3/13/17.
 */
module.exports = function () {
    var mongoose = require('mongoose');
    var TradeSchema = mongoose.Schema({
        user: String,
        have:Number,
        want:Number,
       dateCreated: {type:Date,default:Date.now()}
    }, {collection: 'trade'});

    return TradeSchema;
};