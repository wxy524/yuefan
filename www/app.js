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
        'yuefan.fanjus',
        'yuefan.newfanju',
    ])
    .run(run)
    .config(config);

    function run ($ionicPlatform, $rootScope, $state) {
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

            $rootScope.sessionUser = Parse.User.current();
            if($rootScope.sessionUser){
                $state.go('fanjus');
            } else {
                $state.go('login');
            }
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
            .state('newfanju', {
                url: '/newfanju',
                controller: 'NewFanjuCtrl',
                templateUrl: 'view_new_fanju/new_fanju.html'
            });
            //$urlRouterProvider.otherwise("/fanjus");
    }
})();
