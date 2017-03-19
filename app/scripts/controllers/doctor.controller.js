'use strict';
angular.module('hospitaladminApp')
        .controller('DoctorCtrl',function(Auth, DoctorService, $timeout, DataService){

    var vm = this;
    vm.isAdmin = Auth.isAdmin;
    vm.currentUser = Auth.getCurrentUser();


    vm.getAllDoctors = function(hos_id){
      DoctorService.getAllDoctors(hos_id)
        .then(function(res){
          vm.DoctorsArray = res.data.data;
            vm.gridOptions.data = vm.DoctorsArray;
          })
    };

    vm.getStates = function(){
      DataService.getStates()
        .then(function(res){
          vm.statesArr = res.data;
        })
    };

    vm.getCities = function(state){
      if(state == "" || state == null){
        vm.citiesArr = [];
      } else {
        DataService.getCities(state)
          .then(function (res) {
            vm.citiesArr = res.data;
          }, function (err) {
            console.log(err);
          })
      }
    };

      //vm.viewTemplate = "<span data-toggle='tootltip' title='Open' ng-click='grid.appScope.patDetail.fnOpenPatientModal(row,$event)' class='fa fa-lg fa-eye'></span>";
      vm.No = '<span>{{grid.renderContainers.body.visibleRowCache.indexOf(row) + 1}}</span>';

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
            minWidth: 20
          },
          {
            name: 'IMA Number',
            headerCellClass: 'text-center',
            field: 'ima_number',
            minWidth: 20
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
