'use strict';

// Configuring the Articles module
angular.module('photos').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('photos', 'photos', 'photos', 'dropdown', '/photos(/create)?');
		Menus.addSubMenuItem('photos', 'photos', 'List Photos', 'photos');
		Menus.addSubMenuItem('photos', 'photos', 'New Photo', 'photos/create');
	}
]);