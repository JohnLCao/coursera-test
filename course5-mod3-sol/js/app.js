//app.js
(function(){
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', foundItemsDirective);

NarrowItDownController.$inject = ['MenuSearchService']
function NarrowItDownController(MenuSearchService){
	var nid = this;
	nid.found = [];
	nid.nothing = false;

	nid.findFood = function(){
		var promise = MenuSearchService.getMatchedMenuItems(nid.searchWord);
		promise.then(function(result){
			nid.found = result;
			nid.nothing = nid.found.length ? false : true;
		});
	};

	nid.onRemove = function(index){
		nid.found.splice(index, 1);
	};
};

MenuSearchService.$inject = ['$http']
function MenuSearchService($http){
	var service = this;
	var site_url = 'https://davids-restaurant.herokuapp.com/menu_items.json';

	service.getMatchedMenuItems = function(searchTerm){
		var promise = $http({
			url: site_url	
		})
		.then(function(response){
			var foundItems = response.data.menu_items;
			var matchedItems = searchMatch(searchTerm, foundItems);
			return matchedItems;
		})
		.catch(function(error){
			console.log('Something went wrong!');
			console.log(error);
		});

		return promise;
	};

	function searchMatch(search, items){
		var result = [];
		var dishName = '';

		if(search){ 
			for(var i = 0; i < items.length; i++) {
				dishName = items[i].name.toLowerCase();
				if(dishName.indexOf(search)!== -1){
					result.push(items[i]);
				}
			}
		}

		return result;
	};
};

function foundItemsDirective(){
	var ddo = {
		restrict: 'E',
		templateUrl: '../snippets/matchedFood.html',
		transclude: true,
		scope: {
			foundFoodItems: '<',
			onRemove: '&'
		}
	};

	return ddo;
};

})(); //IIFE