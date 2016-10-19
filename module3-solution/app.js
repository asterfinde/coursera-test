(function () {
  'use strict';

  /* ----------------- Declarations ------------------ */
  angular.module('NarrowItDownApp', [])
    // declare controller
    .controller('NarrowItDownController', NarrowItDownController)

    // *singleton* approach with the '.service' declaration
    .service('MenuSearchService', MenuSearchService)

    // directive to display menu the items list
    .directive('foundItems', FoundItemsDirective)

    // define a constant to access the REST endpoint
    .constant('urlBase', "https://davids-restaurant.herokuapp.com/menu_items.json");


  /* ----------------------- Controllers -------------------- */
  // main controller: 'NarrowItDownController'
  // inject the service 'MenuSearchService' into 'NarrowItDownController', protected from minification
  NarrowItDownController.$inject = ['MenuSearchService'];

  // define controller 'NarrowItDownController'
  function NarrowItDownController(MenuSearchService) {
    var narrowItDown = this;
    narrowItDown.searchTerm = "";   // define the param to search from textbox
    narrowItDown.found = null;      // array to store processed menu items

    // receive and handle filter items (promise) from service 'MenuSearchService'
    narrowItDown.getMatchedMenuItems = function () {
      MenuSearchService.getMatchedMenuItems(narrowItDown.searchTerm)
        .then(function(foundItems) {
            narrowItDown.found = foundItems;
          })
        .catch(function(error) {
            narrowItDown.found = [];
        })
    };

    // remove an menu item from the processed list
    narrowItDown.removeItem = function (index) {
      narrowItDown.found.splice(index, 1);
    };

    // return True or False on depends if 'narrowItDown.found' array have elements:
    // no items are found or the user deletes them all
    // used with part 'link: FoundItemsDirectiveLink' on DDO 'FoundItemsDirective' to show error message
    narrowItDown.nothingFound = function () {
      if (narrowItDown.found !== null) {
        return (narrowItDown.found.length === 0);
      };
      return false;
    };
  };


  /* ----------------------- Services ----------------------- */
  // inject '$http' and '$q'(for promise) into service 'MenuSearchService'
  MenuSearchService.$inject = ['$http', '$q', 'urlBase'];

  // define service: 'MenuSearchService'
  function MenuSearchService($http, $q, urlBase) {
    var service = this;
    //var items = [];

    // // gets all the menu items using '$http' service and '$q' for promise
    service.getMatchedMenuItems = function (searchTerm) {
      var foundItems = []         // array to save processed items
      var deferred = $q.defer();  // this object will contain the promise

      // generate an error(rejection) for search box is empty
      if (searchTerm === "") {
        deferred.reject(foundItems);
      } else {
          var searchTermLowerCase = searchTerm.toLowerCase();
      };

      // call HTTP asynchronously
      var promise = $http({
        method: "GET",
        url: urlBase
      })

      promise.then(function (response) {
        // retrieve menu_items array from 'result.data'
        var menu_items = response.data.menu_items

        // loop through 'menu_items' and pick out the ones whose description matches the 'searchTerm'
        for (var i = 0; i < menu_items.length; i++) {
          if (menu_items[i].description.toLowerCase().indexOf(searchTermLowerCase) !== -1){
            foundItems.push(menu_items[i]);
          };
        };

        // return a reference to the caller resolving  the promise.
        deferred.resolve(foundItems);
      })
      .catch(function (error) {
        deferred.reject(foundItems);
      })
      
      // return the promise object
      return deferred.promise;
    };
   };


  /* ------------------- Directives (DDO) ------------------- */
  // For the found items component
  function FoundItemsDirective() {
    var ddo = {
                templateUrl: 'foundItems.html',
                scope: {
                  found: '<',
                  onRemove: '&'
                },
                controller: NarrowItDownController,
                controllerAs: 'narrowItDown',
                bindToController: true,
                link: FoundItemsDirectiveLink
              };

    return ddo;
  };

  // set a watcher over 'narrowItDown.nothingFound()' function on 'NarrowItDownController'
  // controller to realize if exists some change and show error message
  function FoundItemsDirectiveLink(scope, element, attrs, controller) {
    scope.$watch('narrowItDown.nothingFound()', function (newValue, oldValue) {
      if (newValue === true) {
        displayMessageError();
      } else {
        hideMessageError();
      };
    });

    // using JQuery to display or hide error message
    function displayMessageError() {
      var errorElement = element.find("div.error");
      errorElement.show();
    };

    function hideMessageError() {
      var errorElement = element.find("div.error");
      errorElement.hide();
    };
  };

})();
