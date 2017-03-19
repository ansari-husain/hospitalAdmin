'use strict';

angular.module('hospitaladminApp')
  .controller('UpdateLocationCtrl', function () {
    var vm = this ;
    vm.fnUpdateLocation = function(val){
        vm.selectedOption = "";
      if(val == 'state'){
        //console.log('State: ',vm.locationValue);
        //console.log('Code: ',vm.locationCode);
      }else if (val == 'city'){
        //console.log('State: ',vm.selectState);
        //console.log('City: ',vm.locationValue);
        //console.log('Code: ',vm.locationCode);
      }else if(val == 'district'){
        //console.log('State: ',vm.selectState);
        //console.log('City: ',vm.selectCity);
        //console.log('District: ',vm.locationValue);

      }
      //console.log(val);
      vm.selectState = "";
      vm.selectCity = "";
      vm.locationValue = "";
      vm.locationCode = "";
    };
  });
