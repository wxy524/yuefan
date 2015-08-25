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
        $scope.$on('$ionicView.enter', function(){
            $scope.friendlist = [];
            InviteFriendsSrv.getUser().then(
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


        $scope.submit = function(data) {
            console.log("data is " + data);
            var arr = [];
            for(var i in data) {
                console.log("selected ? " + data[i].SELECTED);
                if(data[i].SELECTED == 'Y') {
                    arr.push(data[i]);
                }
            }    
            for (var i in arr) {
                console.log("arr [" + i + "] is " + arr[i].name);
            }
            return arr;
        }

        $scope.backToNewFanju = function() {
            $state.go('newfanju');
        };

        $scope.save = function() {
            InviteFriendsSrv.save().then(
                
            );
        };
    }    

    function InviteFriendsSrv ($q, $rootScope) {
        var self = this;

        self.getUser = getUser;

        function getUser(){
          var query = new Parse.Query(Parse.User);
            query.equalTo("objectId", $rootScope.sessionUser.id); 
            var defer = $q.defer();
            query.find({
                success: function(results) {
                  defer.resolve(results);
                },
                error: function(error) {
                    defer.reject(error);
                }
            });
            return defer.promise;
        };

        self.save = function() {

        }
    }
})();

