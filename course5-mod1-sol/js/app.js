(function(){

'use strict';

angular.module('LunchCheck', [])
	   .controller('__LunchCheckController__', LunchCheckController);

LunchCheckController.$inject = ['$scope'];

function LunchCheckController($scope){
	$scope.foodlist = "";
	$scope.message = "";

	$scope.checkIt = function(){
		var itemList = $scope.foodlist.split(',');
		$scope.message = (itemList.length > 3) ? 'Too Much!' : 'Enjoy!';
	};
};

})(); //IIFE