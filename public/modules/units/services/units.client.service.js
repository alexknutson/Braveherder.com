'use strict';

//Units service used to communicate Units REST endpoints
angular.module('units').factory('Units', ['$resource',
	function($resource) {
		return $resource('units/:unitId', { unitId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);