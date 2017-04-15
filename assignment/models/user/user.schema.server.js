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
        //websites: [Website],
        dateCreated: {type:Date,default:Date.now()},
        facebook: {
            id:    String,
            token: String
        }
    }, {collection: 'user'});

    return UserSchema;
};