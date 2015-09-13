/*
* This module is responsible for friend lists
*/
(function() {
    'use strict';
    angular
        .module('yuefan.invitefriends', ['yuefan.fanjus'])
        .controller('InviteFriendsCtrl',InviteFriendsCtrl);

        function InviteFriendsCtrl ($scope, $rootScope, $state, FanjusSrv) {
        //$scope.$watch('$ionicView.enter', function(){
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
        //});
        var addedFriends = [];
        $scope.addedFriends = function(){
            var added = [];
            for(var i in $scope.friendlist){
                if($scope.friendlist[i].SELECTED == 'Y') {
                    added.push($scope.friendlist[i]);
                }
            }
            addedFriends = added;
            return added;
        };

        $scope.submit = function() {
            FanjusSrv.invitedFriendList = addedFriends;
            /*if($scope.addedFriendList.length != 0) {
                NewFanjuCtrl.incorrect = true;
            }*/
            $state.go('newfanju');
        };
        $scope.backToNewFanju = function() {
            $state.go('newfanju');
        };
    }
})();

