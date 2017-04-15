(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, $rootScope, $location, TradeService) {
        var userId = $rootScope.currentUser._id;
        var vm = this;
        if( $rootScope.currentUser.username == "admin"){
            TradeService.findAllTrade()
                .success(function(trades){
                    vm.trades = trades;
                })
                .error(function(websites) {
                    vm.error = 'websites not found';
                });
        }
        else{
            TradeService.findTradesForUser(userId)
                .success(function(trades){
                    vm.trades = trades;
                })
                .error(function(websites) {
                    vm.error = 'websites not found';
                });
        }



        vm.userId = userId;

    }
})();