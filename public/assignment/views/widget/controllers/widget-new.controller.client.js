(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetChooserController", WidgetChooserController);

    function WidgetChooserController($sce, $routeParams,$rootScope,  WidgetService, $location) {
        var vm = this;

        vm.userId = $rootScope.currentUser._id
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        //vm.widgets = WidgetService.findAllWidgetsForPage(vm.pageId);
        WidgetService.findAllWidgetsForPage(vm.pageId)
            .success(function(widgets){
                vm.widgets = widgets;
            })
            .error(function(widgets) {
                vm.error = 'widget not found';
            });


        vm.types = ["HTML","IMAGE","YOUTUBE","HEADING","TEXT"];
        vm.getEditorURL =function (type) {
            return 'views/widget/templates/editors/widget-' + type + '-editor.view.client.html';
        }
        vm.createWidget =  function (type){
            var newWidget = {};
            newWidget.type = type;
            var response;
            WidgetService.createWidget(vm.pageId,newWidget)
                .success(function(widget){
                    response = widget;
                    var URL ="/user/" +
                        vm.userId + "/website/"+
                        vm.websiteId+"/page/"+vm.pageId+"/widget/"+ response._id;
                    console.log(URL);
                    $location.url(URL);
                })
                .error(function(error){console.log(error);});


        }

    }




})();