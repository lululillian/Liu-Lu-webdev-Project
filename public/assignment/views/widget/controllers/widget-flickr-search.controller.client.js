(function(){
    angular
        .module("WebAppMaker")
        .controller("FlickrController", FlickrController);

    function FlickrController($routeParams, $rootScope, FlickrService,WidgetService,$location) {
        var vm = this;
        vm.userId = $rootScope.currentUser._id;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;
        vm.searchPhotos = function(searchTerm) {
            FlickrService
                .searchPhotos(searchTerm)
                .then(function(response) {
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    vm.photos = data.photos;
                },
                    function(error)
                    {console.log(error);}
                );
        }
        vm.selectPhoto = function (photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";

            WidgetService
                .updateWidget(vm.widgetId, {url:url})
                .then(function(response){

                });

            var URL ="/user/" +
                vm.userId + "/website/"+
                vm.websiteId+"/page/"+vm.pageId+"/widget/"+ vm.widgetId;
            $location.url(URL);
        }

        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;

    }
})();