/**
 * Created by lululillian on 2/27/17.
 */
module.exports = function (app,pageModel) {
    app.get('/api/website/:websiteId/page', pageModel.findAllPagesForWebsite);
    app.get('/api/page/:pageId', pageModel.findPageById);
    app.put("/api/page/:pageId", pageModel.updatePage);
    app.delete("/api/page/:pageId", pageModel.deletePage);
    app.post("/api/website/:websiteId/page", pageModel.createPage);

    var pages = [
        { "_id": "321", "name": "Boston Weather 2017", "websiteId": "456", "description": "Lorem" },
        { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
        { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
    ];

};