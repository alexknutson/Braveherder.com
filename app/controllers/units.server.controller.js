'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Unit = mongoose.model('Unit'),
	_ = require('lodash');

/**
 * Create a Unit
 */
exports.create = function(req, res) {
	var unit = new Unit(req.body);
	unit.user = req.user;

	unit.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(unit);
		}
	});
};

/**
 * Show the current Unit
 */
exports.read = function(req, res) {
	res.jsonp(req.unit);
};

/**
 * Update a Unit
 */
exports.update = function(req, res) {
	var unit = req.unit ;

	unit = _.extend(unit , req.body);

	unit.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(unit);
		}
	});
};

/**
 * Delete an Unit
 */
exports.delete = function(req, res) {
	var unit = req.unit ;

	unit.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(unit);
		}
	});
};

/**
 * List of Units
 */
exports.list = function(req, res) { Unit.find().sort('-created').populate('user', 'displayName').exec(function(err, units) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(units);
		}
	});
};

/**
 * Unit middleware
 */
exports.unitByID = function(req, res, next, id) { Unit.findById(id).populate('user', 'displayName').exec(function(err, unit) {
		if (err) return next(err);
		if (! unit) return next(new Error('Failed to load Unit ' + id));
		req.unit = unit ;
		next();
	});
};

/**
 * Unit authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.unit.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};