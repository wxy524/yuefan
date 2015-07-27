angular.module('yuefan.controllers', ['yuefan.services'])

.controller('FanjuCtrl', [
  '$scope',
  '$rootScope',
  '$state',
  'FanjuSrv',
  function($scope, $rootScope, $state, FanjuSrv){
  FanjuSrv.getAll().then(
    function(results){
      $scope.fanjus = results;
    }, function(error){
      console.log(error);
      $state.go('login');
    }
  );

  $scope.logout = function(){
    Parse.User.logOut();
    $rootScope.sessionUser = Parse.User.current();
    $state.go('login');
  };
}])

.controller('LoginCtrl', [
  '$scope', '$rootScope', '$state', 'SignUpSrv',
  function($scope,  $rootScope, $state, SignUpSrv){

    $scope.login = function(user){
      SignUpSrv.login(user).then(
        function(user){
          $rootScope.sessionUser = Parse.User.current();
          $state.go('fanjus');
        },
        function(error){
          $scope.incorrect = true;
          $state.go('login');
      });
    };

    $scope.signup = function(user){
        console.log(user);
      SignUpSrv.signup(user).then(
        function(user){
          $rootScope.sessionUser = user;
          $state.go('fanjus');
        }, function(error){
          $scope.incorrect = true;
          $state.go('login');
      });
    };
}]);
