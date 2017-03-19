'use strict';
angular.module('hospitaladminApp')
  .factory('DoctorService', function ($q, $http, base_url1) {

    var DoctorService = {};

    DoctorService.getAllDoctors = function (hos_id) {
      var defer = $q.defer();
      //$http.get(base_url1 + 'doctors_data' + ( hos_id ? ('&hos_id='+hos_id ) : '') )
      $http.post(base_url1 + 'doctors_data',{'hos_id':hos_id})
        .then(function (res) {
        defer.resolve(res);
      }, function (err) {
        defer.resolve(err);
      });
      return defer.promise;
    };

    return DoctorService;

  });
