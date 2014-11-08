'use strict';

// Configuring the Articles module
angular.module('quests').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Quests', 'quests', 'dropdown', '/quests(/create)?');
		Menus.addSubMenuItem('topbar', 'quests', 'List Quests', 'quests');
		Menus.addSubMenuItem('topbar', 'quests', 'New Quest', 'quests/create');
	}
]);
