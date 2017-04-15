(function(){
    angular
        .module("WebAppMaker")
        .factory('UserService', userService);

    function userService($http) {

        var api = {
            "register": register,
            "createUser": createUser,
            "updateUser": updateUser,
            "findUserByCredentials": findUserByCredentials,
            "findUserById": findUserById,
            "findUserByUsername": findUserByUsername,
            "deleteUser":deleteUser,
            "logout":logout,
            "login":login,
            "updateComment":updateComment,
            "findAllUser":findAllUser
        };

        return api;

        function findAllUser(){
            return $http.get("/game/allUser/");

        }
        function updateComment(comment){
            console.log(comment);
            return $http.put("/game/comment/", comment);

        }
        function register(user) {
            return $http.post("/game/register", user);
        }

        function login(user) {
            return $http.post("/game/login", user);
        }

        function logout(user) {
            return $http.post("/game/logout", user);
        }

        function deleteUser(userId) {
            return $http.delete('/game/user/'+userId);
        }

        function createUser(user) {
            return $http.post("/game/user", user);
        }

        function findUserByUsername(username) {
            return $http.get("/game/user?username="+username);
        }

        function findUserByCredentials(username, password) {
            return $http.get("/game/user?username="+username+"&password="+password);
        }

        function updateUser(userId, newUser) {
            return $http.put("/game/user/"+userId, newUser);
        }

        function findUserById(userId) {
            return $http.get("/game/user/"+userId);
        }



    }
})();