'use strict';

//Setting up route
angular.module('units').config(['$stateProvider',
	function($stateProvider) {
		// Units state routing
		$stateProvider.
		state('listUnits', {
			url: '/units',
			templateUrl: 'modules/units/views/list-units.client.view.html'
		}).
		state('createUnit', {
			url: '/units/create',
			templateUrl: 'modules/units/views/create-unit.client.view.html'
		}).
		state('viewUnit', {
			url: '/units/:unitId',
			templateUrl: 'modules/units/views/view-unit.client.view.html'
		}).
		state('editUnit', {
			url: '/units/:unitId/edit',
			templateUrl: 'modules/units/views/edit-unit.client.view.html'
		});
	}
]);