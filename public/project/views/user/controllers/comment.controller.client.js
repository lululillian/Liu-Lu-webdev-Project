(function(){
    angular
        .module("WebAppMaker")
        .controller("commentController", commentController);

    function commentController(UserService, $routeParams,$location,$rootScope,$route) {
        var vm = this;
        var uid = $routeParams.uid;

        vm.user = $rootScope.currentUser;
        vm.text = "";

        vm.userInfo = {};

        vm.submit = function(){
            var object = {
                host:uid,
                reviewer:vm.user._id,
                comment:vm.text
            };
            UserService.updateComment(object)
                .success(
                    function(res){
                        $route.reload();

                    }
                )
                .error(function(err){});
        };
        init();

        function init(){
            UserService.findUserById(uid)
                .success(function (r) {
                    console.log(vm.user);
                    vm.swapper = r;
                    vm.comments = r.comments;
                    r.comments.forEach(function(c){
                        UserService.findUserById(c.user)
                            .success(function (user) {
                                if(user != null || user!=undefined ){
                                    vm.userInfo[c.user] = {
                                        avatar:user.avatar,
                                        username:user.username
                                    };
                                }

                            })
                            .error(function (err) {
                            });
                    });
                    if(r.steam != undefined)    vm.linkedProfile = true;
                    else  vm.linkedProfile = false;

                })
                .error(function (err) {
                });
        }



    }
})();

