'use strict';

(function() {
	// Quests Controller Spec
	describe('Quests Controller Tests', function() {
		// Initialize global variables
		var QuestsController,
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

			// Initialize the Quests controller.
			QuestsController = $controller('QuestsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Quest object fetched from XHR', inject(function(Quests) {
			// Create sample Quest using the Quests service
			var sampleQuest = new Quests({
				name: 'New Quest'
			});

			// Create a sample Quests array that includes the new Quest
			var sampleQuests = [sampleQuest];

			// Set GET response
			$httpBackend.expectGET('quests').respond(sampleQuests);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.quests).toEqualData(sampleQuests);
		}));

		it('$scope.findOne() should create an array with one Quest object fetched from XHR using a questId URL parameter', inject(function(Quests) {
			// Define a sample Quest object
			var sampleQuest = new Quests({
				name: 'New Quest'
			});

			// Set the URL parameter
			$stateParams.questId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/quests\/([0-9a-fA-F]{24})$/).respond(sampleQuest);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.quest).toEqualData(sampleQuest);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Quests) {
			// Create a sample Quest object
			var sampleQuestPostData = new Quests({
				name: 'New Quest'
			});

			// Create a sample Quest response
			var sampleQuestResponse = new Quests({
				_id: '525cf20451979dea2c000001',
				name: 'New Quest'
			});

			// Fixture mock form input values
			scope.name = 'New Quest';

			// Set POST response
			$httpBackend.expectPOST('quests', sampleQuestPostData).respond(sampleQuestResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Quest was created
			expect($location.path()).toBe('/quests/' + sampleQuestResponse._id);
		}));

		it('$scope.update() should update a valid Quest', inject(function(Quests) {
			// Define a sample Quest put data
			var sampleQuestPutData = new Quests({
				_id: '525cf20451979dea2c000001',
				name: 'New Quest'
			});

			// Mock Quest in scope
			scope.quest = sampleQuestPutData;

			// Set PUT response
			$httpBackend.expectPUT(/quests\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/quests/' + sampleQuestPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid questId and remove the Quest from the scope', inject(function(Quests) {
			// Create new Quest object
			var sampleQuest = new Quests({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Quests array and include the Quest
			scope.quests = [sampleQuest];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/quests\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleQuest);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.quests.length).toBe(0);
		}));
	});
}());
