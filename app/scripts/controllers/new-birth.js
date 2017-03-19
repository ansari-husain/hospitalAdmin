/**
 * Created by LENOVO on 3/18/2017.
 */
angular.module('hospitaladminApp')
          .controller('BirthRegisterCtrl',function(){
    var vm = this;
    vm.fnSave = function(){
      console.log(vm.newBirth);
      vm.newBirth = {};
    }

  });
