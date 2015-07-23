// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('yuefan', ['ionic', 'yuefan.services', 'yuefan.controllers'])

.run(function($ionicPlatform, $rootScope, $state) {
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
})
.config(function($stateProvider){
  $stateProvider.state('fanjus', {
    url: '/fanjus',
    controller: 'FanjuCtrl',
    templateUrl: 'views/fanjus.html'
  })
  .state('login', {
    url: '/login',
    controller: 'LoginCtrl',
    templateUrl: 'views/login.html'
  });
});
