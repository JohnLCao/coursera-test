(function(){
	'use strict';

	angular.module('data')
	.service('MenuDataService', MenuDataService)
	.constant('BaseUrl', 'https://davids-restaurant.herokuapp.com')

	MenuDataService.$inject = ['$http', 'BaseUrl'];

	function MenuDataService($http, BaseUrl){
		var service = this;

		service.getAllCategories = function(){
			var promise = $http({
				url: (BaseUrl + '/categories.json')
			})
			.then(function(response){
				return response.data;
			})
			.catch(function(error){
				console.log('Something went wrong!');
				console.log(error);
			})

			return promise;
		};

		service.getItemsForCategory = function(categoryShortName){
			var promise = $http({
				url:(BaseUrl + '/menu_items.json'),
				params:{
					"category": categoryShortName
				}
			})
			.then(function(response){
				return response.data.menu_items;
				console.log('I fetched data for' + categoryShortName);
			})
			.catch(function(error){
				console.log('Something went wrong!');
				console.log(error);
			})

			return promise;
		}
	};

})(); //IIFE