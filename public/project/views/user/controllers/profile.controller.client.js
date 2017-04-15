(function(){
    angular
        .module("WebAppMaker")
        .controller("profileController", profileController);

    function profileController($routeParams, $location, UserService,$http,$rootScope) {
        var vm = this;
        var userId =  $routeParams.uid;

        vm.unregisterUser = unregisterUser;
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;

        init();


        function init() {
            UserService
                .findUserById(userId)
                .success(renderUser);
        }

        function deleteUser() {
            var yes = confirm("You will delete your profile and all your trades will also be deleted, are you sure?");
            if(yes == true){
                UserService.deleteUser(userId)
                    .success(function(){
                        alert("We are sad to see you leave ! Hope to see you again ")
                        if( vm.isAdmin  == false)logout();
                        else $location.url("/");
                    })
                    .error();
            }
        }
        function updateUser(user) {
            $http
                .put('/game/user/' + userId, user)
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
                        $location.url("#/");
                    })
        }


        function renderUser(user) {
            vm.user = user;
            if(user.username == "admin" && userId == user._id) vm.isAdmin = true;
            else vm.isAdmin = false;
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