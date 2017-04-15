(function(){
    angular
        .module("WebAppMaker")
        .controller("PageEditController", PageEditController);

    function PageEditController($routeParams,$rootScope,  $location, PageService) {
        var vm = this;
        var userId = $rootScope.currentUser._id;
        var websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.nameError = nameError;
        function nameError(){
            var q=  document.getElementById("q");
            q.hidden = true;
        }
        PageService.findPageById(vm.pageId)
            .success(function(page){console.log(page);vm.page = page;});
        vm.websiteId = websiteId;
        vm.userId = userId;

        vm.goback = function () {
            $location.url('/profile/' + vm.userId);
        }
        vm.update_Page = function (page) {
            var name = document.getElementById("pageName").value;
            console.log(name.length);
            if( name!=null &&name.length >0){
                PageService.updatePage(vm.pageId, page);
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
            }
            else{
                var q=  document.getElementById("q");
                q.hidden = false;
                var e=  document.getElementById("e");
                e.hidden = false;
            }

        }

        vm.delete_page = function (){
            PageService.deletePage(vm.pageId);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
        };
    }


})();
