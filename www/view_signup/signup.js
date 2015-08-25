/*
 * This module is resposnible for sigup
 * */
(function() {
    'use strict';
    angular
        .module('yuefan.signup', [])
        .controller('SignupCtrl', SignupCtrl)
        .service('SignupSrv', SignupSrv);
    
    function SignupCtrl ($scope, $rootScope, $state, SignupSrv) {
        $scope.signup = function(user) {
            SignupSrv.signup(user).then(
                function(user) {
                    $rootScope.sessionUser = user;
                    $state.go('fanjus');
                },
                function(error) {
                    $scope.incorrect = true;
                    $state.go('login');
                }
            );
        };
        
         $scope.facebook = function(){
            SignupSrv.facebook().then(
                function(user){
                    $rootScope.sessionUser = user;
                    $state.go('fanjus');
                },
                function(error){
                    $scope.incorrect = true;
                    $state.go('signup');
                }
            );
        };    
    }

    function SignupSrv($q) {
        var self = this;
        
        self.signup = signup;
        self.facebook = facebook;

        function signup (user_) {
            var user = new Parse.User();
            // user phone number as ID
            user.set("username", user_.phone);
            user.set("password", user_.password);
            user.set("email", user_.email);

            var defer = $q.defer();
            user.signUp(null, {
                success: function(user) {
                    defer.resolve(user);
                },
                error: function(user, error) {
                    alert("Error: " + error.code + " " + error.message);
                    defer.reject(error);
                }    
            });
            return defer.promise;
        };

        function facebook () {
            var user = new Parse.User();

            var defer = $q.defer();
            Parse.FacebookUtils.logIn('email', { 
                success: function(user) {
            //        if(!user.existed()) {
                        //FB.api('/me?fields=name,email', function(me) {
                        FB.api('/me', {fields: 'name, email'}, function(me) {
                            user.set("email", me.email);
                            user.set("username", me.email);
                            user.set("password", "123456");
                            //console.log("/me response", me.email);
                        });
                        defer.resolve(user);                        
           //         } 
                    //defer.resolve(user);
                },
                error: function(user, error) {
                    defer.reject(error);
                }
            });
            return defer.promise;
        }    
    }
})();



