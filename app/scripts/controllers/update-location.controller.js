'use strict';

angular.module('hospitaladminApp')
  .controller('UpdateLocationCtrl', function (DataService) {
    var vm = this ;
    var data = {};

    vm.getStates = function(){
      DataService.getStates()
        .then(function(res){
          vm.statesArr = res.data;
        })
    };

    vm.getCities = function(state){
        vm.citiesArr = [];
        DataService.getCities(state)
          .then(function (res) {
              vm.citiesArr = res.data;
          }, function (err) {
            console.log(err);
          })
    };

    vm.fnUpdateLocation = function(val){
        vm.selectedOption = "";
      if(val == 'state'){
         data = {
          'state_code' : vm.locationCode,
          'state_name' : vm.locationValue
        };

        DataService.updateState(data)
          .then(function(res){
            vm.locationCode = '';
            vm.locationCode = '';
          },function(err){

          });

      }else if (val == 'city'){
         data = {
          'state_code': vm.selectState,
          'city_name': vm.locationValue,
          'city_code': vm.locationCode
        };
        DataService.updateCity(data)
          .then(function(res){
            vm.locationCode = '';
            vm.locationCode = '';
            vm.selectState = '';
          },function(err){

          });

      }else if(val == 'district'){
         data = {
          'state_code' : vm.selectState,
          'city_code' : vm.selectCity,
          'area' : vm.locationValue
        };

         DataService.updateArea(data)
           .then(function(res){
           },function(err){

           })

      }
      vm.selectState = "";
      vm.selectCity = "";
      vm.locationValue = "";
      vm.locationCode = "";
    };
    vm.fnInitUpdateLocation = function(){
      vm.getStates();
    }
  });
