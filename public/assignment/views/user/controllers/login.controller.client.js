(function(){
    angular
        .module("WebAppMaker")
        .controller("loginController", loginController);

    function loginController(UserService, $location,$rootScope) {
        var vm = this;
        vm.login = login;
        vm.usernameError = usernameError;
        function usernameError(){
            var q=  document.getElementById("q");
            q.hidden = true;
        }
        vm.passwordError = passwordError;
        function passwordError(){
            var p=  document.getElementById("p");
            p.hidden = true;
        }


        function login(user) {
            var error = false;

            if(user == undefined || user.username == null||user.username == ""){
                var q=  document.getElementById("q");
                q.hidden = false;
                error = true;
            }
            if(user == undefined || user.password == null||user.password == ""){
                var p=  document.getElementById("p");
                p.hidden = false;
                error = true;
            }
            if(error == true){
                var e=  document.getElementById("e");
                e.hidden = false;
            }
            else{
                UserService
                    .login(user)
                    .then(
                        function(response) {
                            var user = response.data;
                            $rootScope.currentUser = user;
                            $location.url("/profile/"+user._id);
                        })
            }

        }

        vm.logout = logout;
        function logout() {
            UserService
                .logout()
                .then(
                    function(response) {
                        $rootScope.currentUser = null;
                        $location.url("/");
                    })
        }






    }
})();

