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
    default: Date.now
  },
    user: {
      type: Schema.ObjectId,
    ref: 'User'
    },
    'ID': {
      type: Number,
    },
    'Name': {
      type: String,
      trim: true,
      default: '',
    },
    'Series': {
      type: String,
    },
    'Rarity': {
      type: Number,
    },
    'Leader Skill': {
      type: String,
    },
    'BB Skill': {
      type: String,
    },
    'SBB Skill': {
      type: String,
    },
    'BB Type': {
      type: String,
    },
    'SBB Type': {
      type: String,
    },
    'Cost': {
      type: Number,
    },
    'Max LVL': {
      type: Number,
    },
    'Element': {
      type: String,
    },
    'Hits': {
      type: Number,
    },
    'BB Hits': {
      type: Number,
    },
    'SBB Hits': {
      type: String,
    },
    'BB Fill': {
      type: Number,
    },
    'SBB Fill': {
      type: String,
    },
    'Evo Zel': {
      type: String,
    },
    'Acquire': {
      type: String,
    },
    'Gender': {
      type: String,
    },
    'BFPRO Notes': {
      type: String,
    },
    'Batch': {
      type: String,
    },
    'Type Pref': {
      type: String,
    },
    'Evo 1': {
      type: String,
    },
    'Evo 2': {
      type: String,
    }, 
    'Evo 3': {
      type: String,
    },
    'Evo 4': {
      type: String,
    },
    'Evo 5': {
      type: String,
    },
    'Weighted Stats(Lord)': {
      type: Number,
    },
    'HP Lord': {
      type: Number,
    },
    'ATK Lord': {
      type: Number,
    },
    'DEF Lord': {
      type: Number,
    },
    'REC Lord': {
      type: Number,
    },
    'HP Anima': {
      type: Number,
    },
    'ATK Anima': {
      type: Number,
    },
    'DEF Anima': {
      type: Number,
    },
    'REC Anima': {
      type: Number,
    },
    'HP Breaker': {
      type: Number,
    },
    'ATK Breaker': {
      type: Number,
    },
    'DEF Breaker': {
      type: Number,
    },
    'REC Breaker': {
      type: Number,
    },
    'HP Guardian': {
      type: Number,
    },
    'ATK Guardian': {
      type: Number,
    },
    'DEF Guardian': {
      type: Number,
    },
    'REC Guardian': {
      type: Number,
    },
    'HP Oracle': {
      type: Number,
    },
    'ATK Oracle': {
      type: Number,
    },
    'DEF Oracle': {
      type: Number,
    },
    'REC Oracle': {
      type: Number,
    },
    'Video': {
      type: String,
    },
    'Icon': {
      type: String,
    },
    'Image': {
      type: String,
    }
});

mongoose.model('Unit', UnitSchema);
