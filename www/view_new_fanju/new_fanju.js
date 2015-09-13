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

        $scope.addedFriendList = FanjusSrv.invitedFriendList;
        console.log("invitedFriendList is " + $scope.addedFriendList);

        $scope.selectFriends = function() {
            $state.go('invitefriends');
        };

        $scope.addedFriendList = [];
        $scope.incorrect = true;

        $scope.backToFanju = function() {
            $state.go('fanjus');
        };
    }
})();
