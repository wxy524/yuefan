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

        $scope.signup = function(user){
            //console.log(user);
            LoginSrv.signup(user).then(
                function(user){
                    $rootScope.sessionUser = user;
                    $state.go('fanjus');
                },
                function(error){
                    $scope.incorrect = true;
                    $state.go('login');
                }
            );
        }; 

        $scope.facebook = function(){
            LoginSrv.facebook().then(
                function(){
                    $rootScope.sessionUser = user;
                    $state.go('fanjus');
                },
                function(){
                    $scope.incorrect = true;
                    $state.go('login');
                }
            );
        }
    }

    function LoginSrv ($q) {
        var self = this;

        self.signup = signup;
        self.login = login;
        self.facebook = facebook;

        function signup (user_) {
            var user = new Parse.User();
            // use phone number as ID
            user.set("username", user_.phone);
            user.set("password", user_.password);
            user.set("email",    user_.email);

            var defer = $q.defer();
            user.signUp(null, {
                success: function(user) {
                    defer.resolve(user);
                },
                error: function(user, error) {
                    // Show the error message somewhere and let the user try again.
                    console.log("Error: " + error.code + " " + error.message);
                    defer.reject(error);
                }
            });
            return defer.promise;
        };

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

        function facebook () {
            var defer = $q.defer();
            (function(d, s, id){
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) {
                    return;
                }
                js = d.createElement(s); js.id = id;
                js.src = "//connect.facebook.net/en_US/sdk.js";
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));    
         
            window.fbAsyncInit = function() {
                Parse.FacebookUtils.init({ // this line replaces FB.init({
                    appId      : '421761141364404', // Facebook App ID
                    status     : true,  // check Facebook Login status
                    cookie     : true,  // enable cookies to allow Parse to access the session
                    xfbml      : true,  // initialize Facebook social plugins on the page
                    version    : 'v2.3' // point to the latest Facebook Graph API version
                });

                //var defer = $q.defer();
                Parse.FacebookUtils.logIn(null, {
                    success: function(user) {
                        defer.resolve(user);
                        console.log("user is " + user);
                    },
                    error: function(user, error) {
                        defer.reject(error);
                        console.log("errer code is " + error);
                    }
                });
                //return defer.promise;
            };
            return defer.promise;
        }
    }
})();

