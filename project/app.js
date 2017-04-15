/**
 * Created by lululillian on 2/27/17.
 */
module.exports = function (app) {



    var tradeModel = require('./models/game/trade.model.server.js')();
    require('./services/trade.service.server.js')(app, tradeModel);
    var userModel = require('./models/user/user.model.server.js')();
    require('./services/user.service.server.js')(app, userModel,tradeModel);



}