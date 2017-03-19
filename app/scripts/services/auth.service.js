'use strict';

angular.module('hospitaladminApp')
  .factory('Auth', function ($cookies, cookieName, $q, $http, base_url1) {

    var currentUser = {};
    if ($cookies.get(cookieName)) {
      currentUser = JSON.parse($cookies.get(cookieName));
    }
    return {

      login:function(user){
        var defer = $q.defer();
        //$http.get(base_url1+'adminLoginVerification&username='+user.username+'&password='+user.password)
          $http.post(base_url1+'adminLoginVerification',user)
          .then(function(res){
            if(res.data.userName){
              currentUser = res.data.userName[0];
              $cookies.put(cookieName,JSON.stringify(res.data.userName[0]) );
            }
            defer.resolve(res)
          },function(err){
            console.log('Auth Service ',err)
            defer.resolve(err);
          });
        return defer.promise;
      },

      getCurrentUser: function(){
        return currentUser;
      },

      isLoggedIn: function(){
        return currentUser.hasOwnProperty('name');
      },

      logout:function(){
        $cookies.remove(cookieName);
        currentUser = {};
      },

      isAdmin: function(){
        return currentUser.username === 'Admin';
      },

      isLoggedInAsync: function(cb){
        if(currentUser.hasOwnProperty('username')){
            cb(true);
        }else{
          cb(false)
        }
      }
    }

  });
