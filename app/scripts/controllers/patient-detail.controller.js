'use strict';

angular.module('hospitaladminApp')
  .controller('PatientDetailCtrl', function (locationService, DataService, Auth, $timeout) {
    var vm = this;

    vm.isAdmin = Auth.isAdmin;
    vm.currentUser = Auth.getCurrentUser();
    vm.bloodGroupArray = ['A+','A-','B+','B-','O+','O-','AB+','AB-'];
    vm.mopArray = ['Natural','LSCS','Vacuum','MTP','D&C'];
    vm.mopArrayPatient = ["Natural", "IUI", "IVF", "Surrogacy", "Rape", "Unwanted"];
    vm.today = moment().toDate();
    vm.getAllPatient = function () {
      if (vm.currentUser.id == 1){
        var id = null;
      } else {
        id = vm.currentUser.id;
      }
      locationService.fetchPatients(id)
        .then(function (response) {

          vm.patientData = response.data;

          if(typeof vm.patientData === 'object') {
            angular.forEach(vm.patientData, function (obj) {
              obj.full_name = obj.pname + ' ' + obj.hname + ' ' + obj.surname;
              var phone1 = obj.phone_wife;
              var phone2 = obj.phone_husband;
              if (phone1 && phone2) {
                obj.phone_number = phone1 + ', ' + phone2;

              } else if (phone1 && !phone2) {
                obj.phone_number = phone1;
              } else if (!phone1 && phone2) {
                obj.phone_number = phone2;
              } else {
                obj.phone_number = '';
              }
            });
          }else {
            vm.patientData = [];
          }
          vm.gridOptions.data = vm.patientData;
        }, function (error) {

        })
    };

    vm.fnOpenPatientModal = function (row, event) {
        event.preventDefault();
        var patientDetail = angular.copy(row.entity);
        if (patientDetail.dob){
          patientDetail.dob = moment(patientDetail.dob, 'DD/MM/YYYY').toDate()
        }
        if (patientDetail.lmp){
          patientDetail.lmp = moment(patientDetail.lmp, 'DD/MM/YYYY').toDate()
        }
        if (patientDetail.maleChildBirthDate){
          patientDetail.maleChildBirthDate = moment(patientDetail.maleChildBirthDate, 'DD/MM/YYYY').toDate()
        }
        if (patientDetail.anniversary_date){
          vm.AnniversaryYears = moment().diff(moment(patientDetail.anniversary_date,'DD/MM/YYYY').format('YYYY-MM-DD'),'years');
          patientDetail.anniversary_date = moment(patientDetail.anniversary_date,'DD/MM/YYYY').toDate();
        }
        if (patientDetail.state){
          angular.forEach(vm.statesArr,function(obj){
            if (obj.state_name.toLowerCase() === patientDetail.state.toLowerCase()){
              patientDetail.state = obj.state_code ;
                vm.getCities(obj.state_code);
            }
          });
        }
        if (patientDetail.city){
          $timeout(function(){
              if (vm.citiesArr) {
                angular.forEach(vm.citiesArr, function (obj) {
                  if (obj.city_name.toLowerCase() === patientDetail.city.toLowerCase()
                      || (patientDetail.city.toLowerCase().indexOf(obj.city_name.toLowerCase()) > -1 &&
                          patientDetail.city.toLowerCase().toLowerCase().indexOf("city") > -1 )) {
                    patientDetail.city = obj.city_code;
                  }
                });
              }
          }, 500);
        if (patientDetail.numberOfGS) {
          patientDetail.numberOfGS = vm.strToInt(patientDetail.numberOfGS);
        }
        if (patientDetail.gravid) {
          patientDetail.gravid = vm.strToInt(patientDetail.gravid);
        }
        if (patientDetail.abortion) {
          patientDetail.abortion = vm.strToInt(patientDetail.abortion);
        }
        if (patientDetail.para) {
          patientDetail.para = vm.strToInt(patientDetail.para);
        }
        if (patientDetail.noFemaleChild) {
          patientDetail.noFemaleChild = vm.strToInt(patientDetail.noFemaleChild);
        }
        if (patientDetail.noMaleChild) {
          patientDetail.noMaleChild = vm.strToInt(patientDetail.noMaleChild);
        }
        if (patientDetail.maleChildAge) {
          patientDetail.maleChildAge = vm.strToInt(patientDetail.maleChildAge);
        }
        if (patientDetail.maleChildMonth) {
          patientDetail.maleChildMonth = vm.strToInt(patientDetail.maleChildMonth);
        }
      }

      vm.patientDetail = patientDetail;
      $('#patientModal').modal();

    };

    vm.fnAddPatient = function(){
      $('#patientModal').modal('toggle');
    };

    vm.calculateAge = function(){
      if (vm.patientDetail.dob){
        vm.patientDetail.age = moment().diff(moment(vm.patientDetail.dob).format('YYYY-MM-DD'),'years');
      }else {
        vm.patientDetail.age = undefined;
      }
    };

    vm.getDobFromAge = function () {
      if(vm.patientDetail){
        if(vm.patientDetail.age){
          vm.patientDetail.dob = moment().subtract(parseInt(vm.patientDetail.age),'years').toDate();
        }else {
          vm.patientDetail.dob = undefined;
        }
      }
    };

    vm.getMarriageDate = function(){
      if(vm.patientDetail){
        if(vm.AnniversaryYears){
          vm.patientDetail.anniversary_date = moment().subtract(parseInt(vm.AnniversaryYears),'years').toDate();
        }else {
          vm.patientDetail.anniversary_date = undefined;
        }
      }
    };

    vm.calculateMarriageYears = function(){
      if (vm.patientDetail.anniversary_date){
        vm.AnniversaryYears = moment().diff(moment(vm.patientDetail.anniversary_date).format('YYYY-MM-DD'),'years');
      }
    };

    vm.changeWeightFormat = function(){
      vm.patientDetail.weight = parseFloat(vm.patientDetail.weight).toFixed(2);
    };

    vm.getNumber = function(num){
      return new Array(num);
    };

    vm.fnSavePatientDetail = function () {
      $('#patientModal').modal('toggle');

      var patientData = vm.patientDetail;

      if (patientData.dob){
       patientData.dob = moment(patientData.dob).format('DD/MM/YYYY');
      }
      if (patientData.anniversary_date){
        patientData.anniversary_date = moment(patientData.anniversary_date).format('DD/MM/YYYY');
      }
      if (patientData.maleChildBirthDate){
        patientData.maleChildBirthDate = moment(patientData.maleChildBirthDate).format('DD/MM/YYYY');
      }
      if (patientData.femaleChildBirthDate){
        patientData.femaleChildBirthDate = moment(patientData.femaleChildBirthDate).format('DD/MM/YYYY');
      }
      if (patientData.lmp){
        patientData.lmp = moment(patientData.lmp).format('DD/MM/YYYY');
      }

      if (patientData.state){
        angular.forEach(vm.statesArr,function(obj){
          if (obj.state_code === patientData.state){
            patientData.state = obj.state_name ;
          }
        });
      }
      if (patientData.city) {
        angular.forEach(vm.citiesArr, function(obj) {
          if (obj.city_code === patientData.city) {
            patientData.city = obj.city_name;
          }
        })
      }
      console.log("typeof patientData.pref_time_call ", typeof patientData.pref_time_call);
      if (typeof patientData.pref_time_call === 'object') {
        patientData.pref_time_call =  (patientData.pref_time_call).getHours()+":"+ (patientData.pref_time_call).getMinutes();
      }
      console.log(patientData);
      /*if(vm.patientDetail.unique_id) {
        locationService.updatePatient(patientData)
          .then(function (res) {

          }, function (err) {

          });
      }*/
    };

    vm.strToInt = function (val) {
      if (val) {
        return parseInt(val, 10);
      } else {
        return 0;
      }
    };

    vm.viewTemplate = "<span data-toggle='tootltip' title='Open' ng-click='grid.appScope.patDetail.fnOpenPatientModal(row,$event)' style='color: blue' class='fa fa-lg fa-eye'></span>";
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
          field: 'full_name',
          minWidth: 130
        },
        {
          name: 'Phone',
          headerCellClass: 'text-center',
          enableSorting: true,
          field: 'phone_number',
          width: 200
        },
        {
          name: 'Age',
          headerCellClass: 'text-center',
          field: 'age',
          width: 50
        },
        {
          name: 'City',
          headerCellClass: 'text-center',
          field: 'city',
          width: 100
        },
        {
          name: 'State',
          headerCellClass: 'text-center',
          field: 'state',
          width: 150
        },
        {
          name: 'Hospital',
          headerCellClass: 'text-center',
          field: 'name',
          width: 280
        },
        {
          name: 'Action',
          headerCellClass: 'text-center',
          cellTemplate: vm.viewTemplate,
          width: 70,
          enableFiltering: false,
          cellClass: 'text-center'
        }

      ],
      onRegisterApi: function (gridApi) {
      }

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


    vm.initPatients = function () {
      vm.getStates();
      vm.getAllPatient();
    };
  });
