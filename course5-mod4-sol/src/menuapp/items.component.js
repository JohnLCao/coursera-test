(function(){
	'use strict';

	angular.module('MenuApp')
	.component('items', {
		templateUrl: '',
		controller: 'MenuAppItemsController as ite',
		bindings: {
			categoryItems: '<'
		}
	})

})(); //IIFE
