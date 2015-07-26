angular.module('yuefan.controllers', ['yuefan.services'])

.controller('FanjuCtrl', [
  '$scope',
  'FanjuSrv',
  function($scope, FanjuSrv){
  FanjuSrv.getAll().then(
    function(results){
      $scope.fanjus = results;
    }, function(){}
  );
}])

.controller('LoginCtrl', ['$scope', 'SignUpSrv', '$rootScope', '$state', function($scope, SignUpSrv, $rootScope, $state){
  $scope.login = function(){

  };

  $scope.signup = function(user){
    console.log(user);
    SignUpSrv.signup(user).then(function(user){
      $rootScope.sessionUser = user;
      $state.go('fanjus');
    }, function(eror){
      $scope.incorrect = true;
      $state.go('login');
    });
  };
}]);
