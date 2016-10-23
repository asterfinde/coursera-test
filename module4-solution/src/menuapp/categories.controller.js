(function () {
'use strict';

angular.module('MenuApp')
.controller('CategoriesController', CategoriesController);

CategoriesController.$inject = ['MenuDataService', 'menuCategories'];
function CategoriesController(MenuDataService, menuCategories) {
  var categories = this;
  categories.items = menuCategories;
}

})();
