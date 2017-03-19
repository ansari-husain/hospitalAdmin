'use strict';

angular.module('hospitaladminApp')
  .controller('PatientDetailCtrl', function (locationService, DataService, Auth) {
    var vm = this ;

    vm.isAdmin = Auth.isAdmin();

    vm.getAllPatient = function(){
      locationService.fetchPatients()
        .then(function(response){

          vm.patientData = response.data;
          angular.forEach(vm.patientData,function(obj){
            obj.full_name = obj.pname + ' '+obj.hname+ ' '+ obj.surname;
            var phone1 = obj.phone_wife;
            var phone2 = obj.phone_husband;
            if(phone1 && phone2){
              obj.phone_number = phone1 + ', ' + phone2;

            }else if(phone1 && !phone2){
              obj.phone_number = phone1;
            }else if(!phone1 && phone2){
              obj.phone_number = phone2;
            }else{
              obj.phone_number = '';
            }
          });
          vm.gridOptions.data = vm.patientData;
        },function(error){

        })
    };

    vm.fnOpenPatientModal = function(row,event){
      event.preventDefault();
      console.log(row.entity.full_name);
      vm.patientDetail = row.entity;
      $('#patientModal').modal();

    };

    vm.fnSavePatientDetail = function(){
      console.log('called saved');
      $('#patientModal').modal('toggle');
      locationService.updatePatient(vm.patientDetail)
        .then(function(res){
          console.log('controller res ',res);
        },function(err){
          console.log('error controller ',err);
        })
    };

    vm.strToInt = function(val){
      if(val){
        return parseInt(val,10);
      }else{
        return 0;
      }
    };

    vm.viewTemplate = "<span data-toggle='tootltip' title='Open' ng-click='grid.appScope.patDetail.fnOpenPatientModal(row,$event)' class='fa fa-lg fa-eye'></span>";
    vm.No = '<span>{{grid.renderContainers.body.visibleRowCache.indexOf(row) + 1}}</span>';

    vm.gridOptions = {
      enableSorting: false,
      enableColumnMenus:false,
      enablePagination:true,
      enableFiltering:true,

      paginationPageSizes: [10, 25, 50, 75],
      columnDefs: [
        { name: 'No',
          cellTemplate:vm.No,
          headerCellClass:'text-center',
          cellClass:'text-center',
          enableSorting:true,
          enableFiltering:false,
          width:50
        },
        { name: 'Name',
          headerCellClass:'text-center',
          cellClass:'text-uppercase',
          enableSorting:true,
          field:'full_name',
          minWidth:130
        },
        { name: 'Phone',
          headerCellClass:'text-center',
          enableSorting:true,
          field:'phone_number',
          width:200
        },
        { name: 'Age',
          headerCellClass:'text-center',
          field:'age',
          width:50
        },
        { name: 'City',
          headerCellClass:'text-center',
          field:'city',
          width:100
        },
        { name: 'State',
          headerCellClass:'text-center',
          field:'state',
          width:150
        },
        { name: 'Hospital',
          headerCellClass:'text-center',
          field:'name',
          width:280
        },
        {
          name:'Action',
          headerCellClass:'text-center',
          cellTemplate:vm.viewTemplate,
          width:70,
          enableFiltering:false,
          cellClass:'text-center'
        }

      ],
      onRegisterApi : function(gridApi){
    }

    };



    vm.getStates = function(){
      console.log('states');
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


    vm.initPatients = function(){
      vm.getStates();
      vm.getAllPatient();
    };
  });
