(function () {
'use strict';

angular.module('MenuApp')
.component('menuItems', {
  templateUrl: 'src/menuapp/templates/items.template.html',
  bindings: {
    items: '<',
    name: '<',
  }
});

})();
