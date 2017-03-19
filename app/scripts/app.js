'use strict';

/**
 * @ngdoc overview
 * @name hospitaladminApp
 * @description
 * # hospitaladminApp
 *
 * Main module of the application.
 */
angular
  .module('hospitaladminApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'ui.grid',
    'ui.grid.pagination'
  ])
  .constant('base_url','http://www.jaliyaninfotech.com/hospital/hospital_service.php?')
  .constant('base_url1','http://www.jaliyaninfotech.com/hospital/hospital_service1.php?')
  .constant('base_url2','http://www.jaliyaninfotech.com/hospital/hospital_service2.php?')
  .constant('cookieName','hospitalAdmin')
  .config(function ($urlRouterProvider,$locationProvider,$stateProvider) {
    $urlRouterProvider.otherwise('/login');

    $stateProvider
      .state('main',{
        url:'/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main',
        authenticate:false,
        abstract:true
      })
      .state('main.login',{
        url:'login',
        templateUrl: 'login.html',
        controller: 'LoginCtrl',
        authenticate:false,
        controllerAs: 'login'
      })
      .state('main.doctors',{
        url:'doctor',
        templateUrl: 'views/doctor.html',
        controller: 'DoctorCtrl',
        controllerAs: 'doctor',
        authenticate:true
      })
      .state('main.hospital-profile',{
        url:'hospital-profile',
        templateUrl: 'views/hospital-profile.html',
        controller: 'HospitalProfileCtrl',
        controllerAs: 'hosPro',
        authenticate:true
      })
      .state('main.new-birth',{
        url:'new-birth',
        templateUrl: 'views/new-birth.html',
        controller: 'BirthRegisterCtrl',
        controllerAs: 'birthReg',
        authenticate:true
      })
      .state('main.add-hospital',{
        url:'addHospital',
        templateUrl: 'views/add-hospital.html',
        controller: 'AddHospitalCtrl',
        controllerAs: 'addHos',
        authenticate:true
      })
      .state('main.update-location',{
        url:'update-location',
        templateUrl: 'views/update-location.html',
        controller: 'UpdateLocationCtrl',
        controllerAs: 'updateLocation',
        authenticate:true
      })
      .state('main.patient-data',{
        url:'patient-data',
        templateUrl: 'views/patient-detail.html',
        controller: 'PatientDetailCtrl',
        controllerAs: 'patDetail',
        authenticate:true
      });
    //$locationProvider.html5Mode({
    //  enabled:true,
    //  requireBase:false
    //});
    //$routeProvider
    //  .when('/', {
    //    templateUrl: 'views/main.html',
    //    controller: 'MainCtrl',
    //    controllerAs: 'main'
    //  })
    //  .when('/about', {
    //    templateUrl: 'views/about.html',
    //    controller: 'AboutCtrl',
    //    controllerAs: 'about'
    //  });

  })
  .run(function ($rootScope, $location, Auth, $state) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, next) {
      Auth.isLoggedInAsync(function (loggedIn) {
        if (next.authenticate && !loggedIn) {
          $state.go('main.login');
          event.preventDefault();
        }
        if (!next.authenticate && loggedIn) {
          $state.go('main.patient-data');
        }
      });
    });
  });
