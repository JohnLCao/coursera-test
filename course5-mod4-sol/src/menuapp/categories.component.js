(function(){
	'use strict';

	angular.module('MenuApp')
	.component('categories', {
		templateUrl: 'templates/categories.html',
		controller: 'MenuAppCategoriesController as cat',
		bindings: {
			allCategories: '<'
		}
	});

})(); //IIFE
