angular.module('hospitaladminApp')
        .factory('DataService',function($q, $http, base_url1){

    var DataService = {};

    DataService.getStates = function(){
      var defer = $q.defer();
      $http.get(base_url1+'get_states')
        .then(function(res){
          defer.resolve(res);
        },function(err){
          defer.resolve(err);
        });
      return defer.promise;
    };

    DataService.addHospital = function(hospital){
      var defer = $q.defer();
      $http.post(base_url1+'add_hospital',hospital)
        .then(function(res){
        defer.resolve(res)
      },function(err){
        defer.resolve(err)
      });

      return defer.promise;
    };

    return DataService;
  });
