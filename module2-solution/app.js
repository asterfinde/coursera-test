(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
  // declare controllers
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)

  // *singleton* approach with the '.service' declaration
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

// inject the service into 'ToBuyController' and protected from minification
ToBuyController.$inject = ['ShoppingListCheckOffService'];

// define controller 'ToBuyController'
function ToBuyController(ShoppingListCheckOffService) {
  var toBuyList = this;

  toBuyList.items = ShoppingListCheckOffService.getItemsToBuy();

  toBuyList.buyItem = function (itemIndex) {
    ShoppingListCheckOffService.buyItem(itemIndex);
  };
}

// inject the service into 'AlreadyBoughtController' and protected from minification
AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

// define controller 'AlreadyBoughtController'
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var boughtList = this;

  boughtList.items = ShoppingListCheckOffService.getItemsBought();
}

// define service: 'ShoppingListCheckOffService'
function ShoppingListCheckOffService() {
  var service = this;

  // Initial list of shopping items
  var buyItems = [
                    { name: "Pizza-Cheese", quantity: 2  },
                    { name: "Milk",         quantity: 4  },
                    { name: "Cookies",      quantity: 10 },
                    { name: "Juice orange", quantity: 5  },
                    { name: "Pepto Bismol", quantity: 1  }
                ];

  var boughtItems = [];
              
  service.buyItem = function (itemIndex) {
    var item = {};
    console.log(itemIndex);
    if (buyItems.length > 0) {
      item = buyItems[itemIndex];
      buyItems.splice(itemIndex, 1);
      boughtItems.push(item);
    }
  };

  service.getItemsToBuy = function () {
    return buyItems;
  };

  service.getItemsBought = function () {
    return boughtItems;
  };  
}

})();
