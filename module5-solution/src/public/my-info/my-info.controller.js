(function () {
"use strict";

angular.module('public')
.controller('MyInfoController', MyInfoController);

MyInfoController.$inject = ['UserService','ApiPath'];
function MyInfoController(UserService,ApiPath) {
  
  var $ctrl = this;  
    
  $ctrl.user={};
  $ctrl.basePath = ApiPath;      
    
  $ctrl.userLoggedIn = UserService.isUserLoggedIn();
    
  // get user details
  if ($ctrl.userLoggedIn){  
    $ctrl.user = UserService.getUserDetails();
  }    
    
}

})();
