//app.js
(function(){

'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService)

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService){
	var buy = this;
		
	buy.addItem = function(){
		ShoppingListCheckOffService.addItem(buy.newItemName, buy.newItemAmount);
	}

	buy.items = ShoppingListCheckOffService.getItemsToBuy();
	buy.buyItem = ShoppingListCheckOffService.buyItem;
};


AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService){
	var bought = this;
	bought.items = ShoppingListCheckOffService.getItemsAlreadyBought();
};

// service
function ShoppingListCheckOffService(){
	var service = this;
	var toBuyItems = [
		{name: 'mint mentos', quantity: 1},
		{name: 'coke mentos', quantity: 2},
		{name: 'fruit mentos', quantity: 3},
		{name: 'brocolli mentos', quantity: 4},
		{name: 'steak mentos', quantity: 5}
	];
	var boughtItems = [];

	service.getItemsToBuy = function(){
		return toBuyItems;
	};

	service.getItemsAlreadyBought = function(){
		return boughtItems;
	};

	service.addItem = function(itemName, itemAmount){
		if (itemName !== undefined && itemAmount !== undefined){
			toBuyItems.push({
				name: itemName,
				quantity: itemAmount
			});
		}
	}

	service.buyItem = function(index){
		boughtItems.push(toBuyItems.splice(index, 1)[0]);
	};
};


})(); //IIFE