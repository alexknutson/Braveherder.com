'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', '$location', 'Menus', '$http', '$rootScope',
	function($scope, Authentication, $location, Menus, $http, $rootScope) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});
		
		// Redirect to unit page when search form submitted
		$scope.searchUnitSubmit = function(unitSearched) {
			$location.path('/units/' + encodeURI(unitSearched._id));
		};
		
		$http.get('/units').success(function(data){
			$rootScope.allUnits = data;
		});
		
	}
]);
