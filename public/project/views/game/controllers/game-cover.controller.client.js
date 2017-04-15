(function(){
    angular
        .module("WebAppMaker")
        .controller("GameListController", GameListController);

    function GameListController($routeParams, $rootScope, $location, TradeService,$window) {

        var vm = this;
        vm.infos = {};
        vm.games ={};
        vm.typeFilter ={};
        var typeFilter = {};
        vm.query = "";
        init();

        vm.gameName = [];

        vm.reload = function(){
            $window.location.reload();
        };


        vm.clearQuery = function() {
            vm.query == "";
            for (var key in vm.infos) {
                    vm.infos[key].enable = true;
            }

        };
            vm.search = function(){

                if(vm.query == ""){
                    alert("Query cannot be empty");
                    return;
                }
            var temp =[];
            TradeService.search(vm.query)
                .success(function(res){

                    console.log(res);
                    if(res.length == 0 ){
                        alert("sorry, but the query return no result ! Please try another query");
                        return;
                    }
                    res.forEach(function(t){
                       temp.push(t._id);
                    });
                    for (var key in vm.infos) {
                        if(temp.indexOf(key) == -1){
                            vm.infos[key].enable = false;
                        }
                        else{
                            vm.infos[key].enable = true;

                        }
                    }
                })
                .error(function(err){
                    console.log(err);
                });
        };
        /*
         vm.update = function(){
         var infos = {};
         TradeService.findTradeWithFilter(vm.typeFilter).
         success(function(res){
         console.log("hey");

         if(res == null) return;
         var counter = res.length;
         res.forEach(function(t){

         infos[t._id] = t;

         TradeService.findGame(t.have).
         success(function (res) {
         if(res!=null)
         infos[t._id].name = res.name;
         infos[t._id].image_url = res.image_url;
         counter--;
         if(counter == 0){
         console.log(infos);
         vm.infos = infos;

         }
         })
         .error(function (err) {
         console.log(err);
         });

         });


         })
         .error(function(pages) {
         vm.error = 'pages not found';
         });




         };

         */


        vm.trade = function(trade){
            $location.url("/trade/"+trade._id)
        };
        vm.all = function(){
            vm.typeFilter = typeFilter;
        };
        vm.none = function(){
            vm.typeFilter = {};
        };
        function init() {
            TradeService.findAllTrade()
                .success(function(trades){

                    trades.forEach(function(t){

                        vm.infos[t._id] = t;
                        TradeService.findGame(t.have).
                        success(function (res) {
                            if(res!=null){

                                vm.games[res.type] = true;
                                typeFilter[res.type] = true;
                                vm.typeFilter[res.type] = true;
                                vm.infos[t._id].name = res.name;
                                vm.infos[t._id].image_url = res.image_url;
                                vm.infos[t._id].type = res.type;
                                vm.infos[t._id].enable = true;
                                vm.gameName.push(res.name);
                            }



                        })
                            .error(function (err) {
                            });

                    });

                    $( "#tags" ).autocomplete({
                        source: vm.gameName
                    });


                })
                .error(function(pages) {
                    vm.error = 'pages not found';
                });

            }

    }
})();
