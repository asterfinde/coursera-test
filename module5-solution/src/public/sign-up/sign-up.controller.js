(function () {
"use strict";

angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['UserService'];
function SignUpController(UserService) {
  var $ctrl = this;
    
  $ctrl.user = {};
  $ctrl.dish = {};
  $ctrl.dishError = false;
  $ctrl.userLoggedIn = UserService.isUserLoggedIn();
  $ctrl.success =false;


  $ctrl.registerUser = function(){
    $ctrl.userLoggedIn = true;
    UserService.registerUser($ctrl.user);
  }
  
  $ctrl.submit = function(signupForm){
      
      signupForm.$setUntouched();    
      $ctrl.dishError = false;
      $ctrl.success =false;
      
      if ($ctrl.user.favorite_shortname){
      $ctrl.dish = UserService.getDishByShortname($ctrl.user.favorite_shortname).then(function(result){
      $ctrl.user.favorite = result;
      $ctrl.registerUser();
      $ctrl.success =true;
      })
      .catch(function(err) {
      $ctrl.dishError = true;
       })
      } 
      else {      
      $ctrl.registerUser();
      $ctrl.success =true;
      }
  };
    
}

})();
