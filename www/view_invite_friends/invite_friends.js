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
            $scope.friendlists = {
                'list': []
            } 
            InviteFriendsSrv.getFriendList().then(
                function(results) {
                    console.log("len is " + results.length + "sessionUser is " + $rootScope.sessionUser.get("objectId"));
                    angular.forEach(results, function(friend) {
                        $scope.friendlists.list.push(friend);
                    });    
                }, 
                function(error) {
                    console.log("456");
                    console.log(error);
                    $state.go('fanjus');
                }   
            );
        });  
        $scope.doSomething = function() {
            $state.go('newfanju');
        };
        
    }    

    function InviteFriendsSrv ($q, $rootScope) {
        var self = this;
        self.getFriendList = function() {
            var query = new Parse.Query(Parse.User);
            //query.equalTo("objectId", $rootScope.sessionUser); 
            query.equalTo("objectId", "I5dORIlzQm"); 
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
    }
})();

