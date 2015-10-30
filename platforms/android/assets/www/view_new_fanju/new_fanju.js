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
        }
        $scope.selectFriends = function() {
            $state.go('invitefriends');
        }
        $scope.backToFanju = function() {
            $state.go('fanjus');
        }
        
    }

})();
