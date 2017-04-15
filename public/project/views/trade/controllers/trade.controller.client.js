(function(){
    angular
        .module("WebAppMaker")
        .controller("TradeController", TradeController);


    function TradeController($routeParams, $rootScope, $location, TradeService,$location) {
        //var userId = $rootScope.currentUser._id;
        var have = this.have;
        var want = this.want;
        var userId = $rootScope.currentUser._id;
        this.submit = function(){
            var trade = {
                user:userId,
                have:this.have,
                want:this.want
            };
            TradeService.createTrade(trade);
            alert("create Successfully");
            $window.location.reload();

            $location.url("/");

        }
    }

})();

