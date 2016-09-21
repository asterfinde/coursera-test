(function () {
'use strict';

angular.module('LunchCheck', [])
	.controller('LunchCheckController', LunchCheckController);

	LunchCheckController.$inject = ['$scope'];

	function LunchCheckController($scope) {
		$scope.checkIfTooMuch = function() {
			var strings = [];
			$scope.message = '';
			
			if ( $scope.inputString !== "" ) {
				strings = $scope.inputString.split(',');

				if (strings.length >= 1 && strings.length <= 3) {
					$scope.message = "Enjoy!";
				} else if (strings.length > 3) {
				    $scope.message = "Too much!";
				}
			}	
		}
	}
})();
