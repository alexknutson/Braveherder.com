'use strict';

(function() {
	// Units Controller Spec
	describe('Units Controller Tests', function() {
		// Initialize global variables
		var UnitsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Units controller.
			UnitsController = $controller('UnitsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Unit object fetched from XHR', inject(function(Units) {
			// Create sample Unit using the Units service
			var sampleUnit = new Units({
				name: 'New Unit'
			});

			// Create a sample Units array that includes the new Unit
			var sampleUnits = [sampleUnit];

			// Set GET response
			$httpBackend.expectGET('units').respond(sampleUnits);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.units).toEqualData(sampleUnits);
		}));

		it('$scope.findOne() should create an array with one Unit object fetched from XHR using a unitId URL parameter', inject(function(Units) {
			// Define a sample Unit object
			var sampleUnit = new Units({
				name: 'New Unit'
			});

			// Set the URL parameter
			$stateParams.unitId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/units\/([0-9a-fA-F]{24})$/).respond(sampleUnit);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.unit).toEqualData(sampleUnit);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Units) {
			// Create a sample Unit object
			var sampleUnitPostData = new Units({
				name: 'New Unit'
			});

			// Create a sample Unit response
			var sampleUnitResponse = new Units({
				_id: '525cf20451979dea2c000001',
				name: 'New Unit'
			});

			// Fixture mock form input values
			scope.name = 'New Unit';

			// Set POST response
			$httpBackend.expectPOST('units', sampleUnitPostData).respond(sampleUnitResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Unit was created
			expect($location.path()).toBe('/units/' + sampleUnitResponse._id);
		}));

		it('$scope.update() should update a valid Unit', inject(function(Units) {
			// Define a sample Unit put data
			var sampleUnitPutData = new Units({
				_id: '525cf20451979dea2c000001',
				name: 'New Unit'
			});

			// Mock Unit in scope
			scope.unit = sampleUnitPutData;

			// Set PUT response
			$httpBackend.expectPUT(/units\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/units/' + sampleUnitPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid unitId and remove the Unit from the scope', inject(function(Units) {
			// Create new Unit object
			var sampleUnit = new Units({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Units array and include the Unit
			scope.units = [sampleUnit];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/units\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleUnit);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.units.length).toBe(0);
		}));
	});
}());