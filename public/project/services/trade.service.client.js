(function () {
    angular
        .module("WebAppMaker")
        .factory("TradeService", TradeService);

    function TradeService($http) {

        var api = {
            "createTrade" : createTrade,
            "findTrade": findTrade,
            "findTradeWithFilter": findTradeWithFilter,
            "updateTrade": updateTrade,
            "findGame": findGame,
            "findTradesForUser":findTradesForUser,
            "findAllTrade":findAllTrade,
            "deleteTrade":deleteTrade,
            "search":search
        };
        return api;

        function createTrade(trade) {
            console.log(trade);
            return $http.post("/api/trade/",trade);
        }

        function search(q) {
            return $http.get("/api/search/"+q);
        }


        function findTradesForUser(userId){
            return $http.get("/api/trade/user/"+userId.toString());
        }
        function findGame(gameId) {
            return $http.get("/api/game/"+gameId.toString());
        }

        function findTrade(tid) {
            return $http.get("/api/trade/"+tid.toString());
        }

        function findTradeWithFilter(filter){

            return $http.post("/api/tradeFilter",filter);
        }



        function findAllTrade() {
            return $http.get("/api/trade/");
        }

        function updateTrade(trade) {
            return $http.put("/api/trade/", trade);
        }

        function deleteTrade(trade) {
            return $http.delete("/api/trade/"+trade);
        }
    }
})();