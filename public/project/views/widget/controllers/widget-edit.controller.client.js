(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetEditController", WidgetEditController);

    function WidgetEditController($routeParams,$rootScope, WidgetService) {
        var vm = this;
        vm.userId = $rootScope.currentUser._id;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;
        vm.getEditorTemplateUrl = getEditorTemplateUrl;
        vm.update_widget = WidgetService.updateWidget;
        WidgetService.findWidgetById(vm.widgetId)
            .success(function (widget) {
                vm.widget = widget;
            })
            .error(function (widgets) {
                vm.error = 'widget not found';
            });


        vm.delete = WidgetService.deleteWidget;




        function getEditorTemplateUrl() {
            if(vm.widget == undefined) return;
            return 'views/widget/templates/editors/widget-'+vm.widget.type+'-editor.view.client.html';
        }



    }
})();