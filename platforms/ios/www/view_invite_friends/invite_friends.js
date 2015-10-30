/*
* This module is responsible for friend lists
*/
(function() {
    'use strict';
    angular
        .module('yuefan.invitefriends', ['yuefan.fanjus'])
        .controller('InviteFriendsCtrl',InviteFriendsCtrl);

        function InviteFriendsCtrl ($scope, $rootScope, $state, FanjusSrv) {
        $scope.$watch('$ionicView.enter', function(){
            $scope.friendlist = [];
            FanjusSrv.getFriendLists().then(
                function(results) {
                  angular.forEach(results, function(user) {
                        for(var i = 0; i < user.get('friendList').length; i++) {
                            var friend = {
                                            "SELECTED": "N",
                                            "name": user.get('friendList')[i]
                                         };
                            $scope.friendlist.push(friend);
                        }
                    });
                },
                function(error) {
                    console.log(error);
                    $state.go('fanjus');
                }
            );
            //Why this code does not work?
            /*var user = Parse.User.current();
            for(var i = 0; i < user.get('friendList').length; i++) {
                var friend = user.get('friendList')[i];
               $scope.friendlist.push(friend);
            } */
        });
        var selectedFriends = [];
        $scope.addedFriends = function(){
            selectedFriends = [];
            for(var i in $scope.friendlist){
                if($scope.friendlist[i].SELECTED == 'Y') {
                    selectedFriends.push($scope.friendlist[i]);
                }
            }
            return selectedFriends;
        };

        $scope.submit = function() {
            FanjusSrv.invitedFriendList = selectedFriends;
            $state.go('newfanju');
        };
        $scope.backToNewFanju = function() {
            $state.go('newfanju');
        };
    }
})();
