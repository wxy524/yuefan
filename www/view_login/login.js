/**
 * This controller is responsible for login/logout
 */
angular
    .module('yuefan.login', ['yuefan.services'])
    .controller('LoginCtrl', LoginCtrl);

function LoginCtrl ($scope,  $rootScope, $state, SignUpSrv) {
    $scope.login = function(user){
        SignUpSrv.login(user).then(
            function(user){
                $rootScope.sessionUser = Parse.User.current();
                $state.go('fanjus');
            },
            function(error){
                $scope.incorrect = true;
                $state.go('login');
            }
        );
    };

    $scope.signup = function(user){
        //console.log(user);
        SignUpSrv.signup(user).then(
            function(user){
                $rootScope.sessionUser = user;
                $state.go('fanjus');
            },
            function(error){
                $scope.incorrect = true;
                $state.go('login');
            }
        );
    };
}
