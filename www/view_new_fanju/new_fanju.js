/**
 *
 * Controller for adding new fanju
 */
(function() {
angular
    .module('yuefan.newfanju', ['yuefan.fanjus'])
    .controller('NewFanjuCtrl', NewFanjuCtrl);
    //.service('FanjusSrv', FanjusSrv);

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
    }

    /*function FanjusSrv ($q) {
        var self = this;

        /*self.add_fanju = function(fanju) {

        } 

    } */
})();
