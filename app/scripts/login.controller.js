'use strict';

angular.module('hospitaladminApp')
	.controller('LoginCtrl', function ($rootScope, $location, loginService, $cookies, cookieName, Auth, toastr) {
		var vm = this;

		vm.fnLogin = function () {
			Auth.login(vm.user)
				.then(function (res) {

            if (res && res.data && res.data.userName) {
              toastr.success( res.data.userName[0].username, 'Welcome ');
              $location.path('/patient-data');
            }else {
              toastr.error('Authentication Failed');
            }
					//console.log('hello'+JSON.stringify(res.data.userName[0]));
				}, function (err) {
					vm.user = {};
				});
			vm.user = {};
		};

		vm.fnCancelLogin = function () {

		};
	});
