(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController", WebsiteEditController);

    function WebsiteEditController($routeParams,$rootScope, $location, TradeService) {
        var vm = this;
        vm.userId = $rootScope.currentUser._id;
        vm.tradeId = $routeParams.tid;
        vm.nameError = nameError;
        vm.deleteTrade = deleteTrade;
        init();
        function nameError(){
            var q=  document.getElementById("q");
            q.hidden = true;
        }

        function init() {
            TradeService.findTrade(vm.tradeId).
                             success(function(t){
                                 console.log(t);
                            vm.trade = t;
            });

            vm.update = function() {
                TradeService.updateTrade(vm.trade).
                success(function(t){
                    alert("update successfully");
                    $location.url("/");
                });

            }
        }

        function deleteTrade () {
            TradeService.deleteTrade(vm.tradeId);
            alert("delete successfully")
            $location.url("/");
        };
    }
})();