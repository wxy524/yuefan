// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
(function(){
angular
    .module('yuefan', [
        'ionic',
        'yuefan.services',
        'yuefan.login',
        'yuefan.signup',
        'yuefan.fanjus',
        'yuefan.newfanju',
        'yuefan.invitefriends',
    ])
    .run(run)
    .config(config);

    function run ($ionicPlatform, $rootScope, $state, $window) {
        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if(window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if(window.StatusBar) {
                StatusBar.styleDefault();
            }
            Parse.initialize("kWL2ilUOoFbTj7iC3MKJbonKkX9tMQPFouOKjB2C", "bb8LAEOzOs0ASZCQESNABIBjzjPxdOxsL7DG41mR");

            $window.fbAsyncInit = function() {
                Parse.FacebookUtils.init({ // this line replaces FB.init({
                    appId      : '1574365689555899', // Facebook App ID
                    status     : true,  // check Facebook Login status
                    cookie     : false,  // enable cookies to allow Parse to access the session
                    xfbml      : true,  // initialize Facebook social plugins on the page
                    version    : 'v2.4' // point to the latest Facebook Graph API version
                });

                $rootScope.sessionUser = Parse.User.current();
                if($rootScope.sessionUser){
                    $state.go('fanjus');
                } else {
                    $state.go('login');
                }
            };

            (function(d, s, id){
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) {return;}
                js = d.createElement(s); js.id = id;
                js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.4&appId=1574365689555899";
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
        });
    }

    function config ($stateProvider){
        $stateProvider
            .state('fanjus', {
                url: '/fanjus',
                controller: 'FanjusCtrl',
                templateUrl: 'view_fanjus/fanjus.html'
            })
            .state('login', {
                url: '/login',
                controller: 'LoginCtrl',
                templateUrl: 'view_login/login.html'
            })
            .state('signup', {
                url: '/signup',
                controller: 'SignupCtrl',
                templateUrl: 'view_signup/signup.html'
            })
            .state('newfanju', {
                url: '/newfanju',
                controller: 'NewFanjuCtrl',
                templateUrl: 'view_new_fanju/new_fanju.html'
            })
            .state('invitefriends', {
                url:'/invitefriends',
                controller: 'InviteFriendsCtrl',
                templateUrl: 'view_invite_friends/invite_friends.html'
            });
            //$urlRouterProvider.otherwise("/fanjus");
    }
})();
