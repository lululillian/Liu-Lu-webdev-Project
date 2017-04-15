(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);

    function WidgetListController($sce, $routeParams,$rootScope,  WidgetService) {
        var vm = this;
        vm.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        vm.getTrustedHtml = getTrustedHtml;
        vm.getWidgetTemplateUrl = getWidgetTemplateUrl;
        vm.userId = $rootScope.currentUser._id
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        //vm.widgets = WidgetService.findAllWidgets(vm.pageId);
        vm.text = "<h1>dd</h1>"
        WidgetService.findAllWidgetsForPage(vm.pageId)
            .success(function(widgets){
                vm.widgets = widgets;
                console.log(widgets);
            })
            .error(function(widgets) {
                vm.error = 'widget not found';
            });
        //
        $('#widget-list').sortable();

        function getWidgetTemplateUrl(widgetType) {
            var url = 'views/widget/templates/widget-'+widgetType+'.view.client.html';
            return url;
        }

        function getTrustedHtml(html) {
            return $sce.trustAsHtml(html);
        }

        function getYouTubeEmbedUrl(widgetUrl) {
            var urlParts = widgetUrl.split('=');
            var id = urlParts[urlParts.length - 1];
            var url = "https://www.youtube.com/embed/"+id;
            return $sce.trustAsResourceUrl(url);
        }
    }
})();