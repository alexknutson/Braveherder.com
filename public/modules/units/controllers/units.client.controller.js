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
																   character_id: this.character_id,
																   rarity: this.rarity,
																   series: this.series,
																   leader_skill: this.leader_skill,
																   bb_skill: this.bb_skill,
																   sbb_skill: this.sbb_skill,
																   bb_type: this.bb_type,
																   sbb_type: this.sbb_type,
																   cost: this.cost,
																   max_lvl: this.max_lvl,
																   element: this.element,
																   hits: this.hits,
																   bb_hits: this.bb_hits,
																   sbb_hits: this.sbb_hits,
																   bb_fill: this.bb_fill,
																   sbb_fill: this.sbb_fill,
																   evo_zel: this.evo_zel,
																   acquire: this.acquire,
																   gender: this.gender,
																   bfpro_notes: this.bfpro_notes,
																   batch: this.batch,
																   type_pref: this.type_pref,
																   evo_1: this.evo_1,
																   evo_2: this.evo_2,
																   evo_3: this.evo_3,
																   evo_4: this.evo_4,
																   evo_5: this.evo_5,
																   weighted_stats_lord: this.weighted_stats_lord,
																   hp_lord: this.hp_lord,
																   atk_lord: this.atk_lord,
																   def_lord: this.def_lord,
																   rec_lord: this.rec_lord,
																   hp_anima: this.hp_anima,
																   atk_anima: this.atk_anima,
																   def_anima: this.def_anima,
																   rec_anima: this.rec_anima,
																   hp_breaker: this.hp_breaker,
																   atk_breaker: this.atk_breaker,
																   def_breaker: this.def_breaker,
																   rec_breaker: this.rec_breaker,
																   hp_guardian: this.hp_guardian,
																   atk_guardian: this.atk_guardian,
																   def_guardian: this.def_guardian,
																   rec_guardian: this.rec_guardian,
																   hp_oracle: this.hp_oracle,
																   atk_oracle: this.atk_oracle,
																   def_oracle: this.def_oracle,
																   rec_oracle: this.rec_oracle,
																   video: this.video,
																   icon: this.icon,
																   image: this.image,
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
														   $scope.find = function() {
															   $scope.units = Units.query();
															   // Returns Units Data
															   console.log($scope.units);
														   };

														   // Find existing Unit
														   $scope.findOne = function() {
															   $scope.unit = Units.get({ 
																   unitId: $stateParams.unitId
															   });
														   };
														   $scope.updateUnitSearchUrl = function() {
															   console.log('ran url update');

														   };

														   // Rarity Star Iterator
														   $scope.getTimes=function(n){
															   return new Array(n);
														   };
														   // Helper to organize evo list
														   $scope.getEvoList=function(unit){
															   var evo_list = [];
															   evo_list.push(unit.evo_1);
															   evo_list.push(unit.evo_2);
															   evo_list.push(unit.evo_3);
															   evo_list.push(unit.evo_4);
															   evo_list.push(unit.evo_5);
															   $scope.updateUnitSearchUrl();
															   return evo_list;
														   };



													   }
													  ]);
