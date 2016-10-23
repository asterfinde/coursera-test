(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemsController', ItemsController);


ItemsController.$inject = ['MenuDataService', 'categoryItems'];
function ItemsController(MenuDataService, categoryItems) {
  var items = this;
  items.categoryItems = categoryItems.menuItems;
  items.categoryName = categoryItems.name;
}

})();
