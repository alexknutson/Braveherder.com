'use strict';

// Quests controller
angular.module('quests').controller('QuestsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Quests',
	function($scope, $stateParams, $location, Authentication, Quests ) {
		$scope.authentication = Authentication;

		// Create new Quest
		$scope.create = function() {
			// Create new Quest object
			var quest = new Quests ({
				name: this.name
			});

			// Redirect after save
			quest.$save(function(response) {
				$location.path('quests/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Quest
		$scope.remove = function( quest ) {
			if ( quest ) { quest.$remove();

				for (var i in $scope.quests ) {
					if ($scope.quests [i] === quest ) {
						$scope.quests.splice(i, 1);
					}
				}
			} else {
				$scope.quest.$remove(function() {
					$location.path('quests');
				});
			}
		};

		// Update existing Quest
		$scope.update = function() {
			var quest = $scope.quest ;

			quest.$update(function() {
				$location.path('quests/' + quest._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Quests
		$scope.find = function() {
			$scope.quests = Quests.query();
		};

		// Find existing Quest
		$scope.findOne = function() {
			$scope.quest = Quests.get({
				questId: $stateParams.questId
			});
		};
		$scope.questTypeOrder = ['First', 'Fire', 'Water', 'Earth', 'Thunder', 'Light', 'Dark', 'Final', 'Bonus'];

    	$scope.filterByType = function(quest) {
			var qlist = [];
			
			if (quest.world == 'Mistral') {
				$scope.questTypeOrder.forEach(function(index){
					//console.log(index);
					if (index == quest.type) {
						qlist.push(quest);	
					}
//					if ($scope.questTypeOrder[index].indexOf(quest.type) !== -1) {
//						qlist.push(quest);	
//					}
					//console.log(qlist);
	
				});
			//console.log(qlist);
			return qlist;
        	//return ($scope.questTypeOrder[0].indexOf(quest.type) !== -1);
			}
    	};
		$scope.orderByType = function(quests) {
			console.log(quests);
			
			return quests[0];
		}
		
	}
]);
