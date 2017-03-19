'use strict';

angular.module('hospitaladminApp')
  .controller('LoginCtrl', function ($rootScope, $location,  loginService, $cookies, cookieName, Auth) {
    var vm = this;

    vm.fnLogin = function () {
      Auth.login(vm.user)
        .then(function (res) {
          $location.path('/patient-data');
        }, function (err) {
          console.log(err);
          vm.user = {};
        });
      vm.user = {};
    };

    vm.fnCancelLogin = function () {

    };
  });
