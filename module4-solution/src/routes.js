(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // Set up UI states 
  $stateProvider
    // State 'home': Will not need a controller, just a template
    .state('home', {
      url         : '/',
      templateUrl : 'src/menuapp/templates/home.template.html'
    })

    // State 'Categories': The categories state can have a controller as well as a resolve
    //                     The controller can then expose the retrieved categories object such 
    //                     that it can be simply passed into the categories component
    .state('categories', {
      url          : '/categories',
      templateUrl  : 'src/menuapp/templates/main-categories.template.html',
      controller   : 'CategoriesController as categories',
      resolve      : {
                        menuCategories : ['MenuDataService', function (MenuDataService) {
                          return MenuDataService.getAllCategories();
                        }]
                      }
    })

    // State 'items': Can have the same type of setup as the categories state
    //                (menu Items for the Category selected)
    .state('items', {
      url          : '/items/{category}',
      templateUrl  : 'src/menuapp/templates/main-items.template.html',
      controller   : "ItemsController as menuItems",
      resolve      : {
                        categoryItems: ['MenuDataService', '$stateParams', function (MenuDataService, $stateParams) {
                          return MenuDataService.getItemsForCategory($stateParams.category);
                        }]
                      }
    });
}

})();
