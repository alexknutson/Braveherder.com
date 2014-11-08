'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Quest = mongoose.model('Quest'),
	_ = require('lodash');

/**
 * Create a Quest
 */
exports.create = function(req, res) {
	var quest = new Quest(req.body);
	quest.user = req.user;

	quest.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(quest);
		}
	});
};

/**
 * Show the current Quest
 */
exports.read = function(req, res) {
	res.jsonp(req.quest);
};

/**
 * Update a Quest
 */
exports.update = function(req, res) {
	var quest = req.quest ;

	quest = _.extend(quest , req.body);

	quest.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(quest);
		}
	});
};

/**
 * Delete an Quest
 */
exports.delete = function(req, res) {
	var quest = req.quest ;

	quest.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(quest);
		}
	});
};

/**
 * List of Quests
 */
exports.list = function(req, res) { Quest.find().sort('-created').populate('user', 'displayName').exec(function(err, quests) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(quests);
		}
	});
};

/**
 * Quest middleware
 */
exports.questByID = function(req, res, next, id) { Quest.findById(id).populate('user', 'displayName').exec(function(err, quest) {
		if (err) return next(err);
		if (! quest) return next(new Error('Failed to load Quest ' + id));
		req.quest = quest ;
		next();
	});
};

/**
 * Quest authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.quest.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
