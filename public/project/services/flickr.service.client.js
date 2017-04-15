/**
 * Created by ChienliMa on 13/11/2016.
 */

(function() {
    angular
        .module("WebAppMaker")
        .factory("FlickrService", FlickrService);

    function FlickrService($http) {

        var key = "94769b2e140bb0d2181805eee4b8a3af";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT&per_page=9";

        return {
            searchPhotos: function (searchTerm) {
                var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
                return $http.get(url);
            }


        }
    }
})();