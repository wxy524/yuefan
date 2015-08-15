/*
 * Controlller for showing fanju(s)
 */
angular
    .module('yuefan.fanjus', ['yuefan.services'])
    .controller('FanjusCtrl', FanjusCtrl);

function FanjusCtrl ($scope, $rootScope, $state, FanjuSrv) {
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
}
