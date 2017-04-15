(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService($http) {

        var api = {
            "createWidget": createWidget,
            "updateWidget": updateWidget,
            "findWidgetById": findWidgetById,
            "findAllWidgetsForPage": findAllWidgetsForPage,
            "deleteWidget":deleteWidget
        };
        return api;

        function createWidget(pageId,widget) {
            return $http.post("/api/page/"+pageId+"/widget",widget);
        }

        function findAllWidgetsForPage(pageId) {
            return $http.get("/api/page/"+pageId+"/widget");
        }

        function findWidgetById(widgetId) {
            return $http.get("/api/widget/"+widgetId);
        }

        function updateWidget(widgetId, newWidget,pageId) {
            newWidget._page = pageId;
            console.log(newWidget);
            return $http.put("/api/widget/"+widgetId, newWidget);
        }

        function deleteWidget(widgetId) {
            return $http.delete('/api/widget/'+widgetId);
        }


    }
})();