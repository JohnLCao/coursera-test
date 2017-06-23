(function(){
	'use strict';

	angular.module('MenuApp')
	.config(RoutesConfig);

	RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
	function RoutesConfig($stateProvider, $urlRouterProvider){
		$urlRouterProvider.otherwise('/categories');

		$stateProvider
		.state('categories', {
			url: '/categories',
			templateUrl: 'src/menuapp/templates/categories.html',
			controller: 'MenuAppCategoriesController as cat',
			resolve: {
				categories_data: ['MenuDataService', function(MenuDataService){
					return MenuDataService.getAllCategories();
				}]
			}
		})
		.state('categories.items', {
			url: '/{category_sn}',
			templateUrl: 'src/menuapp/templates/category_items.html',
			controller: 'MenuAppItemsController as ite',
			resolve: {
				items_data: ['$stateParams', 'MenuDataService', 
							function($stateParams, MenuDataService){
								return MenuDataService.getItemsForCategory($stateParams.category_sn);
							}]
			}
		})
	};

})(); //IIFE