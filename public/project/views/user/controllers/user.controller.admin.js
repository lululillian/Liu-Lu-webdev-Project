(function(){
    angular
        .module("WebAppMaker")
        .controller("UserController", UserController);

    function UserController($routeParams, $rootScope, $location, UserService) {
        var vm = this;

        UserService.findAllUser()
                .success(function(users){
                    vm.users = users;
                })
                .error(function(error) {
                    vm.error = 'users not found';
                });
    }
})();