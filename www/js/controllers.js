angular.module('yuefan.controllers', ['yuefan.services'])

.controller('FanjuCtrl', ['$scope', 'FanjuSrv', function($scope, FanjuSrv){
  FanjuSrv.getAll().then(
    function(results){
      $scope.fanjus = results;
    }, function(){}
  );
}]);
