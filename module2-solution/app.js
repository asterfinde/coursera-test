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

  // initial list of items to buy
  var buyItems = [
                    { name: "Pizza-Cheese", quantity: 2  },
                    { name: "Milk",         quantity: 4  },
                    { name: "Cookies",      quantity: 10 },
                    { name: "Juice orange", quantity: 6  },
                    { name: "Pepto Bismol", quantity: 1  }
                ];

  // list to bought Items
  var boughtItems = [];
  
  // call from 'ng-click' in every button of list to buy
  service.buyItem = function (itemIndex) {
    var item = {};

    // only if exits items to buy
    if (buyItems.length > 0) {
      // read the item (name, qty) to local variable according to index argument
      item = buyItems[itemIndex];
      // remove item from buyItems list
      buyItems.splice(itemIndex, 1);
      // insert item into boughtItems list
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
