(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController", WebsiteEditController);

    function WebsiteEditController($routeParams,$rootScope, $location, WebsiteService) {
        var vm = this;
        vm.userId = $rootScope.currentUser._id;
        vm.websiteId = $routeParams.wid;
        vm.deleteWebsite = deleteWebsite;
        vm.nameError = nameError;
        function nameError(){
            var q=  document.getElementById("q");
            q.hidden = true;
        }

        function init() {
            WebsiteService.findWebsiteById(vm.websiteId).
                            success(function(newWebsite){
                            vm.website = newWebsite;
            });

            vm.update = function(website) {
                if(website != undefined && website.name!=undefined &&website.name !=""){

                    WebsiteService.updateWebsite(vm.websiteId,website);
                    $location.url("/user/"+vm.userId+"/website");
                }
                else{
                    var q=  document.getElementById("q");
                    q.hidden = false;
                    var e=  document.getElementById("e");
                    e.hidden = false;
                }

            }
        }
        init();

        function deleteWebsite () {
            WebsiteService.deleteWebsite(vm.websiteId);
            $location.url("/user/"+vm.userId+"/website");
        };
    }
})();