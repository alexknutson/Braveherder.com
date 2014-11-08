'use strict';

//Setting up route
angular.module('quests').config(['$stateProvider',
	function($stateProvider) {
		// Quests state routing
		$stateProvider.
		state('listQuests', {
			url: '/quests',
			templateUrl: 'modules/quests/views/list-quests.client.view.html'
		}).
		state('createQuest', {
			url: '/quests/create',
			templateUrl: 'modules/quests/views/create-quest.client.view.html'
		}).
		state('viewQuest', {
			url: '/quests/:questId',
			templateUrl: 'modules/quests/views/view-quest.client.view.html'
		}).
		state('editQuest', {
			url: '/quests/:questId/edit',
			templateUrl: 'modules/quests/views/edit-quest.client.view.html'
		});
	}
]);
