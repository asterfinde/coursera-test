(function () {
"use strict";

angular.module('common')
.service('UserService', UserService);


UserService.$inject = ['$http', 'ApiPath'];
function UserService($http, ApiPath) {
  var service = this;

  service.user = {};
  service.userLoggedIn = false;
    
  service.getDishByShortname = function(shortname){
      return $http.get(ApiPath + "/menu_items/"+ shortname.toUpperCase() + '.json').then(function (response) {
      return response.data;
    });
  }
  
  service.registerUser = function(user){
    service.user = user;
    service.userLoggedIn = true;
  }
  
  service.isUserLoggedIn = function(){
    return service.userLoggedIn;
  }
  
  service.getUserDetails = function(){
    if (service.isUserLoggedIn)
    {
      return service.user;
    } 
  }  
}



})();
