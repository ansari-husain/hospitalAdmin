angular.module('hospitaladminApp')
  .factory('DataService', function ($q, $http, base_url1) {

    var DataService = {};

    DataService.getStates = function () {
      var defer = $q.defer();
      $http.get(base_url1 + 'get_states')
        .then(function (res) {
          defer.resolve(res);
        }, function (err) {
          defer.resolve(err);
        });
      return defer.promise;
    };

    DataService.getCities = function (state) {
      var defer = $q.defer();
      $http.get(base_url1 + 'get_cities' + (state ? '&state_code=' + state : ''))
        .then(function (res) {
          defer.resolve(res);

        }, function (err) {
          defer.reject(err);
        });
      return defer.promise;
    };

    DataService.addHospital = function (hospital) {
      var defer = $q.defer();
      $http.post(base_url1 + 'add_hospital', hospital)
        .then(function (res) {
          defer.resolve(res)
        }, function (err) {
          defer.resolve(err)
        });

      return defer.promise;
    };

    DataService.birthRegistration = function (newBirth) {
      var defer = $q.defer();
      $http.post(base_url1 + 'birth_registration', newBirth)
        .then(function (res) {
          defer.resolve(res)
        }, function (err) {
          defer.resolve(err)
        });

      return defer.promise;
    };

    DataService.getNewBirthRegister = function () {
      var defer = $q.defer();
      $http.get(base_url1 + 'get_newbirth')
        .then(function (res) {
          defer.resolve(res)
        }, function (err) {
          defer.resolve(err)
        });

      return defer.promise;
    };

    DataService.getHospital = function (hos_id) {
      var defer = $q.defer();
      $http.get(base_url1 + 'hospital_data' + (hos_id ? '&hos_id=' + hos_id : ''))
        .then(function (res) {
          defer.resolve(res);
        }, function (err) {
          defer.resolve(err);
        });
      return defer.promise;
    };

    DataService.updateHospitalProfile = function (hospital) {
      var defer = $q.defer();

      $http.post(base_url1 + 'hospital_profile', hospital)
        .then(function (res) {
          defer.resolve(res);
        }, function (err) {
          defer.resolve(err);
        });
      return defer.promise;
    };

    DataService.updateState = function (state) {
      var defer = $q.defer();
      $http.post(base_url1 + 'add_state', state)
        .then(function (res) {
          defer.resolve(res);
        }, function (err) {
          defer.resolve(err);
        });
      return defer.promise;
    };

    DataService.updateCity = function (city) {
      var defer = $q.defer();
      $http.post(base_url1 + 'add_city', city)
        .then(function (res) {
          defer.resolve(res);
        }, function (err) {
          defer.resolve(err);
        });
      return defer.promise;
    };

    DataService.updateArea = function (area) {
      var defer = $q.defer();
      $http.post(base_url1 + 'add_area', area)
        .then(function (res) {
          defer.resolve(res);
        }, function (err) {
          defer.resolve(err);
        });
      return defer.promise;
    };

    return DataService;
  });
