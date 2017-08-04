'use strict';

angular.module('hospitaladminApp')
	.controller('LoginCtrl', function ($rootScope, $location, loginService, $cookies, cookieName, Auth) {
		var vm = this;

		vm.fnLogin = function () {
			Auth.login(vm.user)
				.then(function (res) {
						$location.path('/patient-data');

					//console.log('hello'+JSON.stringify(res.data.userName[0]));
				}, function (err) {
					vm.user = {};
				});
			vm.user = {};
		};

		vm.fnCancelLogin = function () {

		};
	});
