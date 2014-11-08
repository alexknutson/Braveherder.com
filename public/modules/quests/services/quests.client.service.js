'use strict';

//Quests service used to communicate Quests REST endpoints
angular.module('quests').factory('Quests', ['$resource',
	function($resource) {
		return $resource('quests/:questId', { questId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
