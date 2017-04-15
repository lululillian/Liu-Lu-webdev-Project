/**
 * Created by aw on 4/9/2017.
 */

(function(){
    angular
        .module("WebAppMaker")
        .controller("GameDetailController", GameDetailController);

    function GameDetailController($http,$routeParams, $rootScope, $location, TradeService,$sce,UserService) {

        var tid = $routeParams.tid;
        var vm = this;
        //if we do not write vm, we use this directly ,we will have error
        init();
        vm.send = function(){
            alert("Successfully send the request to swap!");
            $location.url("/");
        };
        function init() {
            TradeService.findTrade(tid)
                .success(function (res) {
                    TradeService.findGame(res.have).
                    success(function (r) {
                        vm.have = r;
                        console.log(r);
                        console.log(res.have);
                    })
                        .error(function (err) {
                        });


                    TradeService.findGame(res.want)
                        .success(function (res) {
                            vm.want = res;
                    })
                        .error(function (err) {
                        });

                    UserService.findUserById(res.user)
                        .success(function (r) {
                            vm.user = r;
                            if(r.steam != undefined)    vm.linkedProfile = true;
                            else  vm.linkedProfile = false;

                                console.log(r);
                        })
                        .error(function (err) {
                        });


                })


                .error(function (e) {});

        }

        vm.getTrustedURL = function (a) {
           return $sce.trustAsResourceUrl(a);
        }


    }
})();

