/**
 * Created by LENOVO on 3/18/2017.
 */
angular.module('hospitaladminApp')
  .controller('BirthRegisterCtrl', function (Auth, DataService) {
    var vm = this;
    vm.currentUser = Auth.getCurrentUser();
    vm.isAdmin = Auth.isAdmin();

    vm.diseases = [
      'Normal','Neural tube defect','Down\'s syndrome','Cleft lip/cleft palate','Club foot','Development dysplasia of hip',
      'Congenital cataract','Congenital heart disease','Ratinopathy of prematurity'
    ];
    vm.changeWeightFormat = function(){
      vm.newBirth.weight = parseFloat(vm.newBirth.weight).toFixed(2);
    };
    vm.fnSave = function () {
      vm.hos_id = vm.currentUser.id;
      if (vm.newBirth.date) {
        vm.newBirth.date = vm.newBirth.date.getDate() + '/' + (vm.newBirth.date.getMonth() + 1) + '/' + vm.newBirth.date.getFullYear();
      } else {
        vm.newBirth.date = "";
      }
      if (vm.newBirth.time) {
        vm.newBirth.time = vm.newBirth.time.getHours() + ':' + vm.newBirth.time.getMinutes();
      } else {
        vm.newBirth.time = "";
      }

      //DataService.birthRegistration(vm.newBirth)
      //  .then(function(res){
      //
      //  },function(err){
      //
      //  });
      //vm.newBirth = {};
    }

  });
