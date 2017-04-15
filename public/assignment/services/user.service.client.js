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
            "login":login
        };
        return api;

        function register(user) {
            return $http.post("/auth/register", user);
        }

        function login(user) {
            return $http.post("/auth/login", user);
        }

        function logout(user) {
            return $http.post("/auth/logout", user);
        }

        function deleteUser(userId) {
            return $http.delete('/api/user/'+userId);
        }

        function createUser(user) {
            return $http.post("/api/user", user);
        }

        function findUserByUsername(username) {
            return $http.get("/api/user?username="+username);
        }

        function findUserByCredentials(username, password) {
            return $http.get("/api/user?username="+username+"&password="+password);
        }

        function updateUser(userId, newUser) {
            return $http.put("/api/user/"+userId, newUser);
        }

        function findUserById(userId) {
            return $http.get("/api/user/"+userId);
        }

        function register(user) {
            return $http.post("/api/register", user);
        }

    }
})();