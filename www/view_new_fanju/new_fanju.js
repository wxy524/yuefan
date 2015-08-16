/**
 * Controller for adding new fanju
 */
angular
    .module('yuefan.newfanju', ['yuefan.services'])
    .controller('NewFanjuCtrl', NewFanjuCtrl);

function NewFanjuCtrl ($scope, $state, FanjuSrv) {
    $scope.add_fanju = function(fanju) {
        FanjuSrv.add_fanju(fanju).then(
            function(fanju){
                $state.go('fanjus');
            },
            function(){
            // need to handle failure
            }
        );
    }
})
