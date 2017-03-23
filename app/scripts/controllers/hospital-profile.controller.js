/**
 * Created by LENOVO on 3/13/2017.
 */
'use strict';

angular.module('hospitaladminApp')
  .controller('HospitalProfileCtrl', function (DataService, Auth, $cookies, cookieName) {

    var vm = this;

    vm.currentUser = Auth.getCurrentUser();
    vm.hospitalPro = angular.copy(vm.currentUser);

    vm.fnGetHospital = function (hos_id) {
      DataService.getHospital(hos_id)
        .then(function (res) {
          var user = res.data.data[0];
          $cookies.put(cookieName, JSON.stringify(user));
          $timeout(function () {
            vm.currentUser = Auth.getCurrentUser();
            vm.hospitalPro = angular.copy(vm.currentUser);
          }, 500);
        }, function (err) {

        })
    };

    vm.fnUpdateProfile = function () {
      DataService.updateHospitalProfile(vm.hospitalPro)
        .then(function (res) {
          vm.fnGetHospital(vm.currentUser.id);
        }, function (err) {

        })
    }
  });
