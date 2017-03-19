'use strict';

angular.module('hospitaladminApp')
  .controller('AddHospitalCtrl',function(DataService){
      var vm = this;
    //vm.hospital = {
    //  "name":"Test Web",
    //  "username":"gj_na",
    //  "password":"123456",
    //  "reg_number":"gj_na",
    //  "address":"Surat city",
    //  "city":"surat",
    //  "state":"Gujarat",
    //  "phone_number":"123456789",
    //  "email":"test@test.com"
    //};
    vm.getStates = function(){
      DataService.getStates()
        .then(function(res){
          console.log(res);
        })
    };

    vm.fnAddData = function(){
      vm.hospital.username = vm.hospital.reg_number;
      vm.hospital.password = 123456;
        DataService.addHospital(vm.hospital)
          .then(function(res){
            console.log(res);
          },function(err){
            console.log(err);
          })
    }
  });
