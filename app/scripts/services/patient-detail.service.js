/**
 * Created by LENOVO on 3/7/2017.
 */
angular.module('hospitaladminApp')
        .factory('locationService',function($q,$http,base_url1){

    var locationService = {};

    locationService.fetchPatients = function(){
      var defer = $q.defer();
      $http.get(base_url1+'get_patients')
        .then(function(res){
          defer.resolve(res);
        },function(err){
          defer.resolve(err);
        });
      return defer.promise;
    };

    locationService.updatePatient = function(patient){
      var defer = $q.defer();
      $http.post(base_url1+'edit_patient',patient)
        .then(function(res){
          console.log('Success Service',res)
          defer.resolve(res);
        },function(err){
          defer.resolve(err);
          console.log('err service ',err)
        });
      return defer.promise;
    };

    return locationService;
  });
