(function(){
    angular
        .module("WebAppMaker")
        .controller("PageNewController", PageNewController);

    function PageNewController($routeParams, $rootScope, $location, PageService) {
        var vm = this;
        vm.userId = $rootScope.currentUser._id;
        vm.websiteId = $routeParams.wid;
        vm.nameError = nameError;
        function nameError(){
            var q=  document.getElementById("q");
            q.hidden = true;
        }

        function init() {
            vm.create_page = function  (page) {

                if(page != undefined && page.name!=undefined &&page.name !=""){
                    page._website = vm.websiteId;
                    PageService.createPage(vm.websiteId, page);
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                }
                else{
                    var q=  document.getElementById("q");
                    q.hidden = false;
                    var e=  document.getElementById("e");
                    e.hidden = false;
                }


            };
        }
        init();
    }
})();
