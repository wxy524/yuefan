angular.module('yuefan.controllers', ['yuefan.services'])

.controller('AddFanjuCtrl', [
  '$scope',
  '$state',
  'FanjuSrv',
  function($scope, $state, FanjuSrv){
    $scope.add_fanju = function(fanju){
      FanjuSrv.add_fanju(fanju).then(function(fanju){
        $state.go('fanjus');
      }, function(){
        // need to handle failure
      });
    }
}])

.controller('FanjuCtrl', [
  '$scope',
  '$rootScope',
  '$state',
  'FanjuSrv',
  function($scope, $rootScope, $state, FanjuSrv){
    $scope.$on('$ionicView.enter', function() {
      // code to run each time view is entered
      // need a better way to do this
      $scope.fanjus = {
        'planned': [],
        'settled': []
      };
      FanjuSrv.getAll().then(
        function(results){
          angular.forEach(results, function(fanju){
            if(fanju.get('status') == 'planned'){
              $scope.fanjus.planned.push(fanju);
            } else {
              $scope.fanjus.settled.push(fanju);
            }
          });
        }, function(error){
          console.log(error);
          $state.go('login');
        }
      );
    });

  $scope.logout = function(){
    Parse.User.logOut();
    $rootScope.sessionUser = Parse.User.current();
    $state.go('login');
  };

  $scope.add_new_fanju = function(){
    $state.go('add_fanju')
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
