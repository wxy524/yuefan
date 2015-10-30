/*
* This module is responsible for friend lists
*/
(function() {
    'use strict';
    angular
        .module('yuefan.invitefriends', [])
        .controller('InviteFriendsCtrl',InviteFriendsCtrl)
        .service('InviteFriendsSrv', InviteFriendsSrv);
    
    function InviteFriendsCtrl ($scope, $rootScope, $state, InviteFriendsSrv) {
        $scope.$watch('$ionicView.enter', function(){
            $scope.friendlist = [];
            InviteFriendsSrv.getFriendLists().then(
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

            $scope.addedFriends = [];

        });

        $scope.submit = function(data) {
            console.log("data is " + data);
            for(var i in data) {
                console.log("selected ? " + data[i].SELECTED);
                if(data[i].SELECTED == 'Y') {
                    $scope.addedFriends.push(data[i]);
                } else {
                    $scope.addedFriends.slice(i, i+1);
                }
            }    
            /*for (var i in arr) {
                console.log("arr [" + i + "] is " + arr[i].name);
            } */
            return $scope.addedFriends;
        }

        $scope.backToNewFanju = function() {
            $state.go('newfanju');
        };

        /*$scope.save = function() {
            InviteFriendsSrv.save().then(
                
            );
        };*/
    }    

    function InviteFriendsSrv ($q, $rootScope) {
        var self = this;

        self.getFriendLists = getFriendLists;

        function getFriendLists(user){
            var query = new Parse.Query(Parse.User);
            query.equalTo("objectId", $rootScope.sessionUser.id); 
            var defer = $q.defer();
            query.find({
                success: function(user) {
                  defer.resolve(user);
                },
                error: function(error) {
                    console.log("the error is " + error);
                    defer.reject(error);
                }
            });
            return defer.promise;
        };

        self.save = function() {

        }
    }
})();

