'use strict';

angular.module('hospitaladminApp')
  .controller('AddHospitalCtrl', function (DataService,$timeout) {
    var vm = this;

    vm.getStates = function () {
      DataService.getStates()
        .then(function (res) {
          vm.statesArr = res.data;
        });
    };

    vm.getCities = function (state) {
      if (state == "" || state == null) {
        vm.citiesArr = [];
      } else {
        DataService.getCities(state)
          .then(function (res) {
            vm.citiesArr = res.data;
          }, function (err) {

          });
      }
    };

    vm.fnGetHospitalData = function () {
      DataService.getHospital()
        .then(function (res) {
          vm.doctorsArray = res.data.data;
          vm.gridOptions.data = vm.doctorsArray;
        }, function (err) {

        });
    };

      vm.fnEditHospital = function(row,event){
        vm.hospital = angular.copy(row.entity) ;

        angular.forEach(vm.statesArr,function(obj){
          if(vm.hospital.state == obj.state_name){
            vm.hospital.state = obj.state_code;
            vm.getCities(vm.hospital.state);
          }
        });

        $timeout(function(){
          angular.forEach(vm.citiesArr,function(obj){
            if(vm.hospital.city == obj.city_name){
              vm.hospital.city = obj.city_code;
            }
          });
          $('#addHospital').modal();
        },500);
      };

      vm.fnAddHospital = function(){
        vm.hospital = {};
        $('#addHospital').modal();
      };

      vm.fnDeleteHospital = function(row, event){
        vm.hospital = row.entity ;
        $('#confirm').modal();
      };

      vm.fnDeleteConfirm = function(){
       vm.hospital.flag = 'delete';
        DataService.addHospital(vm.hospital)
          .then(function (res) {
            vm.hospital = {};
            vm.fnGetHospitalData();
            //$('#addHospital').modal('toggle');
          }, function (err) {

          });
        $('#confirm').modal('toggle');
      };

      vm.No = '<span>{{grid.renderContainers.body.visibleRowCache.indexOf(row) + 1}}</span>';
      vm.action = '<span class="fa fa-lg fa-pencil mouseHoverPointer" title="Edit" style="color:navy" ng-click="grid.appScope.addHos.fnEditHospital(row,$event)"></span> | ' +
        '<span class="fa fa-lg fa-trash mouseHoverPointer" title="Delete" style="color:red" ng-click="grid.appScope.addHos.fnDeleteHospital(row,$event)"></span>';

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
            minWidth: 200
          },
          {
            name: 'Address',
            headerCellClass: 'text-center',
            field: 'address',
            minWidth: 200
          },
          {
            name: 'Registration Number',
            headerCellClass: 'text-center',
            cellClass: 'text-center',
            field: 'reg_number',
            minWidth: 80
          },
          {
            name: 'City',
            headerCellClass: 'text-center',
            field: 'city',
            minWidth: 80
          },
          {
            name: 'State',
            headerCellClass: 'text-center',
            field: 'state',
            minWidth: 80
          },
          {
            name: 'Phone',
            headerCellClass: 'text-center',
            enableSorting: true,
            field: 'phone_number',
            width: 100
          },
          {
            name: 'E-mail',
            headerCellClass: 'text-center',
            field: 'email',
            minWidth: 150
          },
          {
            name: 'Action',
            headerCellClass: 'text-center',
            cellTemplate: vm.action,
            cellClass: 'text-center',
            //visible: !vm.isAdmin(),
            minWidth: 100
          }

        ],
        onRegisterApi: function (gridApi) {
        }

      };



    vm.fnAddData = function () {
      angular.forEach(vm.statesArr,function(obj){
        if(vm.hospital.state == obj.state_code){
          vm.hospital.state = obj.state_name;
        }
      });
      angular.forEach(vm.citiesArr,function(obj){
        if(vm.hospital.city == obj.city_code){
          vm.hospital.city = obj.city_name;
        }
      });
      if(!vm.hospital.id){
        //Add hospital info call
        vm.hospital.username = vm.hospital.reg_number;
        vm.hospital.password = 123456;
        DataService.addHospital(vm.hospital)
          .then(function (res) {
            vm.hospital = {};
            vm.fnGetHospitalData();
            $('#addHospital').modal('toggle');
          }, function (err) {

          });
      } else {
        //Update Hospital info call
        DataService.addHospital(vm.hospital)
          .then(function (res) {
            vm.hospital = {};
            vm.fnGetHospitalData();
            $('#addHospital').modal('toggle');
          }, function (err) {

          });
      }
    };

    vm.inItAddHospital = function () {

      vm.getStates();
      //vm.fnGetHospitalGrid();

        vm.fnGetHospitalData();

    };

  });
