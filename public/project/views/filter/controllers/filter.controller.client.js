(function(){
    angular
        .module("WebAppMaker")
        .controller("filterController", filterController);

    function filterController($routeParams,$rootScope,  $scope) {
    this.types =["role play game","action","First Person Shooter","Simulation","Puzzle","Platformer","Point & Click","Strategy","Sports"];
    this.filter = [];



    }


})();
