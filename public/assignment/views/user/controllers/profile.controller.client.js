(function(){
    angular
        .module("WebAppMaker")
        .controller("profileController", profileController);

    function profileController($routeParams, $location, UserService,$http,$rootScope) {
        var vm = this;
        var userId = $rootScope.currentUser._id;
        vm.unregisterUser = unregisterUser;
        vm.updateUser = updateUser;
        init();

        function init() {
            UserService
                .findUserById(userId)
                .success(renderUser);
        }

        function updateUser(user) {
            $http
                .put('/api/user/' + userId, user)
                .success(function(){alert('Successful Update!')});
        }

        function unregisterUser(user) {
            var answer = confirm("Are you sure?");
            if(answer) {
                UserService
                    .deleteUser(user._id)
                    .success(function () {
                        $location.url("/login");
                    })
                    .error(function () {
                        vm.error = 'unable to remove user';
                    });
            }
        }
        vm.logout = logout;
        function logout() {
            UserService
                .logout()
                .then(
                    function(response) {
                        $rootScope.currentUser = null;
                        $location.url("/login");
                    })
        }


        function renderUser(user) {
            vm.user = user;
            console.log(user);
        }
/*
        vm.update = function (newUser) {
            UserService
                .updateUser(userId, newUser)
                .success(function (response) {
                    vm.message = "user successfully updated"
                })
                .error(function () {
                    vm.error = "unable to update user";
                });
        };
        */
    }
})();