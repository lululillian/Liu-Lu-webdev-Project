module.exports = function(app) {
    // models
    var model = require("./server/model/models.server")();

    // service
    require("./services/user.service.client.js")(app, model);
    require("./services/flickr.service.client.js")(app, model);
    require("./services/trade.service.client.js")(app, model);
};