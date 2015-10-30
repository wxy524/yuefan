/**
 *
 * Controller for adding new fanju
 */
(function() {
angular
    .module('yuefan.newfanju', ['yuefan.fanjus'])
    .controller('NewFanjuCtrl', NewFanjuCtrl);

    function NewFanjuCtrl ($scope, $state, FanjusSrv) {
        $scope.add_fanju = function(fanju) {
            FanjusSrv.add_fanju(fanju).then(
                function(fanju){
                    $state.go('fanjus');
                },
                function(){
                    // need to handle failure
                }
            );
        };

        //$scope.addedFriendList = FanjusSrv.invitedFriendList;
        //console.log($scope.addedFriendList);
        $scope.addedFriends = function() {
            return FanjusSrv.invitedFriendList;
        };

        $scope.selectFriends = function() {
            $state.go('invitefriends');
            console.log(FanjusSrv.invitedFriendList);
        };

        $scope.backToFanju = function() {
            $state.go('fanjus');
        };
    }
})();
