'use strict';

angular.module('hospitaladminApp')
  .controller('AddHospitalCtrl', function (DataService) {
    var vm = this;

    vm.getStates = function () {
      DataService.getStates()
        .then(function (res) {
          vm.statesArr = res.data;
        })
    };

    vm.getCities = function (state) {
      if (state == "" || state == null) {
        vm.citiesArr = [];
      } else {
        DataService.getCities(state)
          .then(function (res) {
            vm.citiesArr = res.data;
          }, function (err) {

          })
      }
    };

    vm.fnGetHospitalData = function () {
      DataService.getHospital()
        .then(function (res) {

        }, function (err) {

        })
    };

    vm.fnGetHospitalGrid = function () {
      vm.fnGetHospitalData()
    };

    vm.fnAddData = function () {
      vm.hospital.username = vm.hospital.reg_number;
      vm.hospital.password = 123456;
      DataService.addHospital(vm.hospital)
        .then(function (res) {
          vm.hospital = {};
        }, function (err) {

        })
    };

    vm.inItAddHospital = function () {
      vm.getStates();
      vm.fnGetHospitalGrid();
    }

  });
