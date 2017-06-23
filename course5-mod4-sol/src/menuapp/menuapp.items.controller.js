(function(){
	'use strict';

	angular.module('MenuApp')
	.controller('MenuAppItemsController', MenuAppItemsController);

	MenuAppItemsController.$inject = ['$rootScope','items_data']
	function MenuAppItemsController($rootScope, items_data){
		var ite = this;
		var cancellers = [];
		ite.items = items_data;


		ite.$onInit = function(){
			var cancel1 = $rootScope.$on('$stateChangeSuccess',
			   	function(event, toState, toParams, fromState, fromParams){
			     	$rootScope.$broadcast('data_ready', {});
			     	console.log("data_ready fired!");
			    });
			cancellers.push(cancel1);

			var cancel2 = $rootScope.$on('$stateChangeStart',
			   	function(event, toState, toParams, fromState, fromParams, options){
			     	$rootScope.$broadcast('data_changing', {});
			     	console.log("data_changing fired!")
			    });
			cancellers.push(cancel2);

			console.log("ite.$onInit fired!");
		};

		ite.$onDestroy = function(){
			cancellers.forEach(function(canceller){
				canceller();
			});

			console.log("ite.$onDestroy fired!");
		}
	};

})(); //IIFE