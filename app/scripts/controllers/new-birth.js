/**
 * Created by LENOVO on 3/18/2017.
 */
angular.module('hospitaladminApp')
  .controller('BirthRegisterCtrl', function (Auth, DataService, locationService) {
    var vm = this;
    vm.currentUser = Auth.getCurrentUser();
    vm.isAdmin = Auth.isAdmin();
    vm.isEditMode = false;

    vm.diseases = [
      'Normal','Neural tube defect','Down\'s syndrome','Cleft lip/cleft palate','Club foot','Development dysplasia of hip',
      'Congenital cataract','Congenital heart disease','Ratinopathy of prematurity'
    ];
    vm.mopArray = ['Natural','LSCS','Vacuum','MTP','D&C'];

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
    };

    vm.timeChanged = function(){
      console.log(typeof vm.patientData.time)
    };

    vm.getNewBirth = function(){
      DataService.getNewBirthRegister().then(function(res){
        vm.newBirthData = res.data;
        vm.gridOptions.data = vm.newBirthData;
      },function(err){

      })
    };

    vm.getNewBirth();

    vm.fnEditNewBirth = function(row,event){
    vm.patientData = angular.copy(row.entity);
      vm.getPatientData(vm.patientData.p_id);

      if (vm.patientData.date && typeof vm.patientData.date === 'string' ){
        vm.patientData.dob = moment(vm.patientData.date,'DD/MM/YYYY').toDate();
      }
      if (vm.patientData.time){
        if (vm.patientData.time.indexOf(':') > -1 ){
          var hh = vm.patientData.time.split(':')[0];
          var mm = vm.patientData.time.split(':')[1];

          if (!(hh.indexOf('0') > -1)){
            hh = hh < 10 ? '0' + hh : hh;
          }
          vm.patientData.time = hh + ':' + mm  ;
        }
      }
      vm.isEditMode = true;
    };

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
            if (res.data && res.data.length > 0 && !(res.data.indexOf("null") > -1)){
              console.log(res, res.data, res.data.indexOf("null"));
              vm.citiesArr = res.data;
            } else {
              vm.citiesArr = [];
            }
            console.log('vm.citiesArr ',vm.citiesArr);
            if (vm.patient.city) {
              angular.forEach(vm.citiesArr, function (obj) {
                if (obj.city_name === vm.patient.city) {
                  vm.patient.city = obj.city_code;
                }
              });
            }

          }, function (err) {

          });
      }
    };

    vm.getPatientData = function(pid){
      locationService.getPatient(pid)
        .then(function(res){
          vm.patientData.patient = res.data[0];
          vm.patient  = vm.patientData.patient;
          vm.getStates();

          if (vm.patient.state){
            angular.forEach(vm.statesArr,function(obj){
              if (obj.state_name === vm.patient.state){
                vm.patient.state = obj.state_code;
                vm.getCities(obj.state_code);
              }
            });
          }

        },function(err){

        });
    };

    vm.No = '<span>{{grid.renderContainers.body.visibleRowCache.indexOf(row) + 1}}</span>';
    vm.action = '<span class="fa fa-lg fa-eye mouseHoverPointer primary-color" title="Edit" ng-click="grid.appScope.birthReg.fnEditNewBirth(row,$event)"></span>' ;

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
          name: 'Patient Id',
          headerCellClass: 'text-center',
          cellClass: 'text-uppercase',
          enableSorting: true,
          field: 'p_id',
          minWidth: 100
        },
        {
        name: 'Birth Type',
        headerCellClass:'text-center',
        enableSorting:true,
        field:'birth_type',
        minWidth:100
        },
        {
          name: 'Mode of Delivery',
          headerCellClass:'text-center',
          enableSorting:true,
          field:'mode_of_delivery',
          minWidth:100
        },
        {
          name: 'Gender',
          headerCellClass:'text-center',
          enableSorting:true,
          field:'gender',
          minWidth:100
        },
        {
          name:'Action',
          headerCellClass:'text-center',
          cellClass: 'text-center',
          maxWidth:100,
          cellTemplate:vm.action
        }


      ],
      onRegisterApi: function (gridApi) {
      }

    };

  });
