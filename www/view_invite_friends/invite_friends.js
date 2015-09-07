/*
* This module is responsible for friend lists
*/
(function() {
    'use strict';
    angular
        .module('yuefan.invitefriends', ['yuefan.fanjus'])
        .controller('InviteFriendsCtrl',InviteFriendsCtrl)
        .service('InviteFriendsSrv', InviteFriendsSrv);
    
    function InviteFriendsCtrl ($scope, $rootScope, $state, InviteFriendsSrv, FanjuSrv) {
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
        });
        
        $scope.addedFriends = function() {
            for(var i in $scope.friendlist) {
                if($scope.friendlist[i].SELECTED == 'Y') {
                    NewFanjuCtrl.addedFriendList.push($scope.friendlist[i]);
                }
            } 
            return $scope.addedFriendList;
        };     

        $scope.submit = function() {
            /*if($scope.addedFriendList.length != 0) {
                NewFanjuCtrl.incorrect = true;
            }*/
            $state.go('newfanju');
        }

        $scope.backToNewFanju = function() {
            $state.go('newfanju');
        };
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
    }
})();

