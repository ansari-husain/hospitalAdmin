/**
 * Created by LENOVO on 3/13/2017.
 */
'use strict';

angular.module('hospitaladminApp')
          .controller('HospitalProfileCtrl',function(Auth){

    var vm = this;

    vm.currentUser = Auth.getCurrentUser();

  });
