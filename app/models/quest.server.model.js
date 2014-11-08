'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Quest Schema
 */
var QuestSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Quest name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Quest', QuestSchema);
