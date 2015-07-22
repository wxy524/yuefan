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
}]);
