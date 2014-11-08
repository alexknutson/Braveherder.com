'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var quests = require('../../app/controllers/quests');

	// Quests Routes
	app.route('/quests')
		.get(quests.list)
		.post(users.requiresLogin, quests.create);

	app.route('/quests/:questId')
		.get(quests.read)
		.put(users.requiresLogin, quests.hasAuthorization, quests.update)
		.delete(users.requiresLogin, quests.hasAuthorization, quests.delete);

	// Finish by binding the Quest middleware
	app.param('questId', quests.questByID);
};
