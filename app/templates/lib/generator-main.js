'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var _ = require('lodash');

var Generator = module.exports = function Generator() {
	yeoman.generators.Base.apply(this, arguments);

	// Options and attributes which will be available in all generators which inherit this one.
	this.argument('name', { type: String, required: false });

	this.option("dont-ask");
	this.option("skip-add");

	// Set these values as attributes of generators. 
	// These will be available to all generators that inherit this one.
	this.dir = this.config.get('dir');
	this.dev = this.config.get('dev');

	this.components = this.config.get('components') || {};
	
};

util.inherits(Generator, yeoman.generators.Base);

_.assign(Generator.prototype, require('./util/config/karma'));
_.assign(Generator.prototype, require('./util/storage/storage'));



