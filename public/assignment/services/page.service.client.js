(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService($http) {

        var api = {
            "createPage" : createPage,
            "findPageById": findPageById,
            "updatePage": updatePage,
            "deletePage": deletePage,
            "findAllPagesForWebsite":findAllPagesForWebsite
            }
        return api;

        function createPage(websiteId,page) {
            return $http.post("/api/website/"+websiteId+"/page",page);
        }

        function findAllPagesForWebsite(websiteId) {
            return $http.get("/api/website/"+websiteId+"/page");
        }

        function findPageById(pageId) {
            return $http.get("/api/page/"+pageId);
        }

        function updatePage(pageId, newPage) {
            return $http.put("/api/page/"+pageId, newPage);
        }

        function deletePage(pageId) {
            return $http.delete("/api/page/"+pageId);
        }
    }
})();