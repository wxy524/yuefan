/**
 * This module is responsible for login/logout
 */
(function() {
    'use strict';
    angular
        .module('yuefan.login', [])
        .controller('LoginCtrl', LoginCtrl)
        .service('LoginSrv', LoginSrv);

    function LoginCtrl ($scope,  $rootScope, $state, LoginSrv) {
        $scope.login = function(user){
            LoginSrv.login(user).then(
                function(user){
                    $rootScope.sessionUser = Parse.User.current();
                    $state.go('fanjus');
                },
                function(error){
                    $scope.incorrect = true;
                    $state.go('login');
                }
            );
        };

        $scope.gotoSignup = function(){
            $state.go('signup');
        }
    }

    function LoginSrv ($q) {
        var self = this;

        self.login = login;

        function login (user_) {
            var defer = $q.defer();
            Parse.User.logIn(user_.phone, user_.password, {
                success: function(user){
                    defer.resolve(user);
                },
                error: function(user, error){
                    defer.reject(error);
                }
            });
            return defer.promise;
        };

    }  
})();

