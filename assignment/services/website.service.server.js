/**
 * Created by lululillian on 2/27/17.
 */
module.exports = function (app,websiteModel) {
    app.get('/api/user/:userId/website',websiteModel.findAllWebsitesForUser);
    app.get('/api/website/:websiteId',websiteModel.findWebsiteById);
    app.put("/api/website/:websiteId", websiteModel.updateWebsite);
    app.delete("/api/website/:websiteId", websiteModel.deleteWebsite);
    app.post("/api/user/:userId/website", websiteModel.createWebsite);

    var websites = [
        { "_id": "123", "name": "Facebook",    update:new Date(), "developerId": "456", "description": "Lorem", created: new Date() },
        { "_id": "234", "name": "Tweeter",     update:new Date(), "developerId": "456", "description": "Lorem", created: new Date() },
        { "_id": "456", "name": "Boston Weather",     update:new Date(), "developerId": "456", "description": "Lorem", created: new Date() },
        { "_id": "567", "name": "Tic Tac Toe", update:new Date(), "developerId": "123", "description": "Lorem", created: new Date() },
        { "_id": "678", "name": "Checkers",    update:new Date(), "developerId": "123", "description": "Lorem", created: new Date() },
        { "_id": "789", "name": "Chess",       update:new Date(), "developerId": "234", "description": "Lorem", created: new Date() }
    ];

};