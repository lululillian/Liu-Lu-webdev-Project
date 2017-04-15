module.exports = function(app) {
    // models
    var model = require("./server/model/models.server")();

    // service
    require("./services/user.service.client.js")(app, model);
    require("./services/website.service.client.js")(app, model);
    require("./services/page.service.client.js")(app, model);
    require("./services/widget.service.client.js")(app, model);
    require("./services/flickr.service.client.js")(app, model);
};