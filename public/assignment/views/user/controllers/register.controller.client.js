(function(){
    angular
        .module("WebAppMaker")
        .controller("registerController", registerController);


    function registerController(UserService,$http,$location,$rootScope) {
        var vm = this;
        vm.createUser = createUser;
        vm.usernameError = usernameError;
        vm.passwordVerifyError = passwordVerifyError;
        vm.passwordError = passwordError;
        function usernameError(){
            var q=  document.getElementById("q");
            q.hidden = true;
        }
        function passwordError(){
            var p=  document.getElementById("p");
            p.hidden = true;
        }

        function passwordVerifyError(){
            var v=  document.getElementById("v");
            v.hidden = true;
            var f=  document.getElementById("f");
            f.hidden = true;
        }


            function createUser(user) {
                var error = false;
                console.log( vm.confirm );
                if (user == undefined || user.username == null || user.username == "") {

                    var q = document.getElementById("q");
                    q.hidden = false;
                    error = true;
                }
                if (user == undefined || user.password == null || user.password == "") {
                    var p = document.getElementById("p");
                    p.hidden = false;
                    error = true;

                }
                if (user == undefined || vm.confirm != user.password) {
                    var f = document.getElementById("f");
                    f.hidden = false;
                    error = true;
                }
                if (user == undefined || vm.confirm == null || vm.confirm == "") {
                    var v= document.getElementById("v");
                    v.hidden = false;
                    error = true;
                }
                console.log(error);
                if(error == true){
                    var e = document.getElementById("e");
                    e.hidden = false;
                }
                else{
                    UserService
                        .register(user)
                        .then(
                            function (response) {
                                var user = response.data;
                                $rootScope.currentUser = user;
                                $location.url("/profile/" + user._id);
                            })
                }

            }



   /*
        function registerUser(user) {
            UserService
                .findUserByUsername(user.username)
                .success(function (user) {
                    vm.error = "sorry that username is taken"
                })
                .error(function(){
                    UserService
                        .createUser(user)
                        .success(function(user){
                            $location.url('/profile/' + user._id);
                        })
                        .error(function () {
                            vm.error = 'sorry could not register';
                        });
                });
        }
        */
    }
})();