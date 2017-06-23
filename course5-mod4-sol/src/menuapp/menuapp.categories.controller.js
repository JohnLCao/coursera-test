(function(){
	'use strict';

	angular.module('MenuApp')
	.controller('MenuAppCategoriesController', MenuAppCategoriesController);

	MenuAppCategoriesController.$inject = ['$timeout','$scope','categories_data'];
	function MenuAppCategoriesController($timeout, $scope, categories_data){
		var cat = this;
		var selectedIndex = -1;
		var data_ready = false;

		cat.items = categories_data;


		cat.onClick = function(index){
			$timeout(function(){
				selectedIndex = index;
			}, 100);
		};

		cat.isClicked = function(index){
			return data_ready && (selectedIndex === index);
		};

		cat.$onInit = function(){
			$scope.$on('data_ready',
		   	function(event, toState, toParams, fromState, fromParams){
		     	data_ready = true;
		   	});

			$scope.$on('data_changing',
		   	function(event, toState, toParams, fromState, fromParams){
		     	data_ready = false;
		   	});


			console.log("cat.$onInit fired!");
		}

		cat.$onDestroy = function(){
			// $scope destroys itself
			console.log("cat.$onDestroy fired!");
		}

	};

})(); //IIFE
