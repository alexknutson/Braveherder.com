'use strict';

// Units controller
angular.module('units').controller('UnitsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Units',
    function($scope, $stateParams, $location, Authentication, Units ) {
      $scope.authentication = Authentication;

      // Create new Unit
      $scope.create = function() {
        // Create new Unit object
        var unit = new Units ({
          name: this.name,

        });
        console.log(unit);

        // Redirect after save
        unit.$save(function(response) {
          $location.path('units/' + response._id);

          // Clear form fields
          $scope.name = '';
        }, function(errorResponse) {
          $scope.error = errorResponse.data.message;
        });
      };

      // Remove existing Unit
      $scope.remove = function( unit ) {
        if ( unit ) { unit.$remove();

          for (var i in $scope.units ) {
            if ($scope.units [i] === unit ) {
              $scope.units.splice(i, 1);
            }
          }
        } else {
          $scope.unit.$remove(function() {
            $location.path('units');
          });
        }
      };

      // Update existing Unit
      $scope.update = function() {
        var unit = $scope.unit ;

        unit.$update(function() {
          $location.path('units/' + unit._id);
        }, function(errorResponse) {
          $scope.error = errorResponse.data.message;
        });
      };

      // Find a list of Units
      $scope.find = function(type) {
        $scope.units = Units.query();
        // Returns Units Data
        //console.log($scope.units);

      };

      // Find existing Unit
      $scope.findOne = function() {
        $scope.unit = Units.get({ 
          unitId: $stateParams.unitId
        });
      };
    }
]);
