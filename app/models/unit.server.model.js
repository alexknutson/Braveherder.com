'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Unit Schema
 */
var UnitSchema = new Schema({
	//name: {
	//type: String,
	//default: '',
	//required: 'Please fill Unit name',
	//trim: true
	//},
	created: {
		type: Date,
		default: Date.now,
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	name: {
		type: String,
		default: '',
		required: 'Please provide the exact character name. Example: Terminator Lilith',
	},
	character_id: {
		type: Number,
		reqired: 'The official Character ID. Example: 559',
	},
	rarity: {
		type: Number,
		required: 'How many stars is it? Example: 6',
	},
	series: {
		type: String,
	},
	leader_skill: {
		type: String,
	},
	bb_skill: {
		type: String,
	},
	sbb_skill: {
		type: String,
	},
	bb_type: {
		type: String,
	},
	sbb_type: {
		type: String,
	},
	cost: {
		type: Number,
	},
	max_lvl: {
		type: Number,
	},
	element: {
		type: String,
	},
	hits: {
		type: Number,
	},
	bb_hits: {
		type: Number,
	},
	sbb_hits: {
		type: Number,
	},
	bb_fill: {
		type: Number,
	},
	sbb_fill: {
		type: Number,
	},
	evo_zel: {
		type: String,
	},
	acquire: {
		type: String,
	},
	gender: {
		type: String,
	},
	bfpro_notes: {
		type: String,
	},
	batch: {
		type: String,
	},
	type_pref: {
		type: String,
	},
	evo_1: {
		type: String,
	},
	evo_2: {
		type: String,
	}, 
	evo_3: {
		type: String,
	},
	evo_4: {
		type: String,
	},
	evo_5: {
		type: String,
	},
	weighted_stats_lord: {
		type: Number,
	},
	hp_lord: {
		type: Number,
	},
	atk_lord: {
		type: Number,
	},
	def_lord: {
		type: Number,
	},
	rec_lord: {
		type: Number,
	},
	hp_anima: {
		type: Number,
	},
	atk_anima: {
		type: Number,
	},
	def_anima: {
		type: Number,
	},
	rec_anima: {
		type: Number,
	},
	hp_breaker: {
		type: Number,
	},
	atk_breaker: {
		type: Number,
	},
	def_breaker: {
		type: Number,
	},
	rec_breaker: {
		type: Number,
	},
	hp_guardian: {
		type: Number,
	},
	atk_guardian: {
		type: Number,
	},
	def_guardian: {
		type: Number,
	},
	rec_guardian: {
		type: Number,
	},
	hp_oracle: {
		type: Number,
	},
	atk_oracle: {
		type: Number,
	},
	def_oracle: {
		type: Number,
	},
	rec_oracle: {
		type: Number,
	},
	video: {
		type: String,
	},
	icon: {
		type: String,
	},
	image: {
		type: String,
	}
});

mongoose.model('Unit', UnitSchema);
