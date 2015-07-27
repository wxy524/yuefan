angular.module('yuefan.services', [])

.service('FanjuSrv', ['$http', '$q', function($http, $q){
  var self = this;

  self.getAll = function(){
    var Fanju = Parse.Object.extend("Fanju");
    var query = new Parse.Query(Fanju);
    //query.equalTo("playerEmail", "dstemkoski@example.com");
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
}])

.service('SignUpSrv', ['$q', function($q){
  var self = this;
  self.signup = function(user_){
    var user = new Parse.User();
    // use phone number as ID
    user.set("username", user_.phone);
    user.set("password", user_.password);
    user.set("email",    user_.email);

    var defer = $q.defer();
    user.signUp(null, {
      success: function(user) {
        // Hooray! Let them use the app now.
        defer.resolve(user);
      },
      error: function(user, error) {
        // Show the error message somewhere and let the user try again.
        console.log("Error: " + error.code + " " + error.message);
        defer.reject(error);
      }
    });
    return defer.promise;
  };

  self.login = function(user_){
    var defer = $q.defer();
    Parse.User.logIn(user_.phone, user_.password, {
      success: function(user){
        defer.resolve(user);
      },
      error: function(user, error){
        defer.reject(error);
      }
    });
    return defer.promise;
  };
}]);
