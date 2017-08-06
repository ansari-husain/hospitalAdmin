'use strict';
angular.module('hospitaladminApp')
  .controller('DoctorCtrl', function (Auth, DoctorService, $timeout, DataService) {

    var vm = this;
    vm.isAdmin = Auth.isAdmin;
    vm.currentUser = Auth.getCurrentUser();


    vm.getAllDoctors = function (hos_id) {
      DoctorService.getAllDoctors(hos_id)
        .then(function (res) {
          vm.DoctorsArray = res.data.data;
          vm.gridOptions.data = vm.DoctorsArray;
        })
    };

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

    vm.fnEditDoctor = function (row, event) {
      vm.doctor = angular.copy(row.entity);
      $('#doctor').modal();

    };

    vm.fnAddDoctor = function () {
      vm.doctor = {};
      $('#doctor').modal();
    };

    vm.fnDeleteDoctor = function (row, event) {
      vm.doctor = row.entity;
      $('#confirm').modal();
    };

    vm.fnDeleteConfirm = function () {
      vm.doctor.flag = 'delete';
      DoctorService.doctorOperation(vm.doctor)
        .then(function (res) {
          /*if (!vm.isAdmin()) {
            vm.getAllDoctors(vm.currentUser.id);
          }*/
          if (vm.currentUser.username === 'Admin') {
            vm.getAllDoctors();
          }
          else {
            vm.getAllDoctors(vm.currentUser.id);
          }
        }, function (err) {
        })
    };

    vm.fnSaveDoctor = function () {
      vm.doctor.hos_id = vm.currentUser.id;
      DoctorService.doctorOperation(vm.doctor)
        .then(function (res) {
          /*if (!vm.isAdmin()) {
            vm.getAllDoctors(vm.currentUser.id);
          }*/
          if (vm.currentUser.username === 'Admin') {
            vm.getAllDoctors();
          }
          else {
            vm.getAllDoctors(vm.currentUser.id);
          }
        }, function (err) {

        });
      $('#doctor').modal('toggle');
    };
    //vm.viewTemplate = "<span data-toggle='tootltip' title='Open' ng-click='grid.appScope.patDetail.fnOpenPatientModal(row,$event)' class='fa fa-lg fa-eye'></span>";
    vm.No = '<span>{{grid.renderContainers.body.visibleRowCache.indexOf(row) + 1}}</span>';
    vm.action = '<span class="fa fa-lg fa-pencil mouseHoverPointer" title="Edit" style="color:navy" ng-click="grid.appScope.doctor.fnEditDoctor(row,$event)"></span> | ' +
      '<span class="fa fa-lg fa-trash mouseHoverPointer" title="Delete" style="color:red" ng-click="grid.appScope.doctor.fnDeleteDoctor(row,$event)"></span>';

    vm.gridOptions = {
      enableSorting: false,
      enableColumnMenus: false,
      enablePagination: true,
      enableFiltering: true,

      paginationPageSizes: [10, 25, 50, 75],
      columnDefs: [
        {
          name: 'No',
          cellTemplate: vm.No,
          headerCellClass: 'text-center',
          cellClass: 'text-center',
          enableSorting: true,
          enableFiltering: false,
          width: 50
        },
        {
          name: 'Name',
          headerCellClass: 'text-center',
          cellClass: 'text-uppercase',
          enableSorting: true,
          field: 'name',
          minWidth: 230
        },
        {
          name: 'Address',
          headerCellClass: 'text-center',
          field: 'address',
          minWidth: 350
        },
        {
          name: 'GMC Number',
          headerCellClass: 'text-center',
          cellClass: 'text-center',
          field: 'gmc_number',
          minWidth: 80
        },
        {
          name: 'IMA Number',
          headerCellClass: 'text-center',
          field: 'ima_number',
          minWidth: 80
        },
        {
          name: 'Phone',
          headerCellClass: 'text-center',
          enableSorting: true,
          field: 'phone',
          width: 200
        },
        {
          name: 'E-mail',
          headerCellClass: 'text-center',
          field: 'email',
          minWidth: 200
        },
        {
          name: 'Action',
          headerCellClass: 'text-center',
          cellTemplate: vm.action,
          cellClass: 'text-center',
          minWidth: 100
        }

      ],
      onRegisterApi: function (gridApi) {
      }

    };


    vm.fnInItDoctor = function () {

      if (vm.currentUser.username === 'Admin') {
        vm.getAllDoctors();
      }
      else {
        vm.getAllDoctors(vm.currentUser.id);
      }
    }
  });
