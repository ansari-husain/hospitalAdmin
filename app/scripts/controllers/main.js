'use strict';

/**
 * @ngdoc function
 * @name hospitaladminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the hospitaladminApp
 */
angular.module('hospitaladminApp')
  .controller('MainCtrl', function (Auth, $location) {
    var vm = this;

   vm.isAdmin = Auth.isAdmin ;
   vm.isLoggedIn = Auth.isLoggedIn;
   vm.currentUser = Auth.getCurrentUser;

    vm.fnCheckStatus = function(elem){
    var clickedLi = $(elem).parent();
      clickedLi.addClass('active');

      var allItems = $('.navbar-nav').find('li');
      $.each(allItems,function(item, val){
        if(!($(val)[0].innerHTML === clickedLi[0].innerHTML) ){
          $(val).removeClass('active');
        }
      });
    };

    function fnCheckActiveTab(){
      var activeTab = $location.$$path.slice(1);
      var allItems = $('.navbar-nav').find('li');
      $.each(allItems,function(item,val){
        if($(val)[0].innerHTML.indexOf(activeTab) > 0){
          $(val).addClass('active');
        }
      });
    }
    vm.fnLogout = function(){
      Auth.logout();
      $location.path('/login');
    };
    fnCheckActiveTab();
  });
