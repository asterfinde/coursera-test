(function () {
'use strict';

angular.module('LunchCheck', [])
	.controller('LunchCheckController', LunchCheckController);

	LunchCheckController.$inject = ['$scope'];
	function LunchCheckController($scope, $filter) {
	  $scope.name = "Yaakov";

	  $scope.upper = function () {
	    var upCase = $filter('uppercase');
	    $scope.name = upCase($scope.name);
	  };
	}
})();
