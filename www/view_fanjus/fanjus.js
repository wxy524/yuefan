/*
 * Controlller for showing fanju(s)
 */
(function(){
    'use strict';
    angular
        .module('yuefan.fanjus', [])
        .controller('FanjusCtrl', FanjusCtrl)
        .service('FanjusSrv', FanjusSrv);

    function FanjusCtrl ($scope, $rootScope, $state, FanjusSrv) {

        $scope.$on('$ionicView.enter', function() {
        // code to run each time view is entered
        // need a better way to do this
        $scope.fanjus = {
            'planned': [],
            'settled': []
        };
        FanjusSrv.getAll().then(
            function(results){
            angular.forEach(results, function(fanju){
                if(fanju.get('status') == 'planned'){
                  $scope.fanjus.planned.push(fanju);
                } else {
                  $scope.fanjus.settled.push(fanju);
                }
            });
            }, function(error){
            console.log(error);
            $state.go('login');
            }
        );
        });

        $scope.logout = function(){
            Parse.User.logOut();
            $rootScope.sessionUser = Parse.User.current();
            $state.go('login');
        };

        $scope.add_new_fanju = function(){
            $state.go('newfanju');
        };

        $scope.addFriendToTest = function() {
          FanjusSrv.addFriendToTest().then(
              function(result) {
                  $rootScope.sessionUser.set("friendList", result);
                  $rootScope.sessionUser.save();
              },
              function(error) {
                  console.log("this is error " + error);
              }
          );
        };
    }

    function FanjusSrv ($q, $rootScope) {
        var self = this;
        var invitedFriendList = [];
        self.getAll = function(){
            var Fanju = Parse.Object.extend("Fanju");
            var query = new Parse.Query(Fanju);
            query.equalTo("host", $rootScope.sessionUser);
            var defer = $q.defer();
            query.find({
            success: function(results){
                defer.resolve(results);
            },
            error: function(err){
                defer.reject(err);
            }
            });
            return defer.promise;
        };

        self.add_fanju = function(fanju){
            var Fanju = Parse.Object.extend("Fanju");
            var new_fanju = new Fanju();
            new_fanju.set("title", fanju.title);
            new_fanju.set("times", {"mydate": 1});
            new_fanju.set("host", Parse.User.current());
            new_fanju.set("status", "planned");

            var defer = $q.defer();
            new_fanju.save(null, {
            success: function(fanju){
                defer.resolve(fanju);
            },
            error: function(fanju, err){
                defer.reject(err);
            }
            });
            return defer.promise;
        };

        self.getFriendLists = function (user){
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

        self.setInvitedFriend = function(user){
            invitedFriendList.push(user);
        };

        self.getInvitedFriend = function(){
            return invitedFriendList;
        };

        self.addFriendToTest = function(){
            var query = new Parse.Query(Parse.User);
            query.equalTo("objectId", "fmbJNNPM8e");

            var defer = $q.defer();
            query.find({
                success: function(result) {
                    console.log("success");
                    defer.resolve(result);
                },
                error: function(result, err) {
                    console.log("failed");
                    defer.reject(err);
                }
            });
            return defer.promise;
        };
    }
})();
