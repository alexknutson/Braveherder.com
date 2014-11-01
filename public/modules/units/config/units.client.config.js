'use strict';

// Configuring the Articles module
angular.module('units').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Units', 'units', 'dropdown', '/units(/create)?');
		Menus.addSubMenuItem('topbar', 'units', 'List Units', 'units');
		Menus.addSubMenuItem('topbar', 'units', 'New Unit', 'units/create');
	}
]);
