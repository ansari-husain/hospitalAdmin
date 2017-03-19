/**
 * Created by LENOVO on 3/7/2017.
 */
angular.module('hospitaladminApp')
        .factory('locationService',function($q,$http,base_url1){

    var locationFactory = {};

    locationFactory.fetchPatients = function(){
      var defer = $q.defer();
      $http.get(base_url1+'get_patients')
        .then(function(res){
          defer.resolve(res);
        },function(err){
          defer.resolve(err);
        });
      return defer.promise;
    };

    return locationFactory;
  });
