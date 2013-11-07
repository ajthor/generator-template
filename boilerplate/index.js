'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var GeneratorBase = require('../generator-base.js');

var _ = require('lodash');

var Generator = module.exports = function Generator(args, options, config) {
	GeneratorBase.apply(this, arguments);

};

util.inherits(Generator, GeneratorBase);

Generator.prototype.setDirectories = function setDirectories() {
	// Set default directory structure.
	this.dir = {
		app:            "app",
		appviews:       "app/views",
		approutes:      "app/routes",
		// Public directories.
		public:         "public",
		images:         "public/img",
		styles:         "public/styles",
		scripts:        "public/scripts",
		vendor:         "public/scripts/vendor",
		publicviews:    "public/views",
		// Other directories.
		config:         "config",
		test:           "test",
		specs:          "test/specs",
		build:          "build",
	};
	// Set 'development' directories.
	this.dev = {
		templates:      path.join(this.sourceRoot(), '../../templates')
	};
	// These options will be available in any generator inheriting from generator-base.
	// Just use this.directories or this.dev
};

Generator.prototype.makeDirectories = function makeDirectories() {
	// Cycle through object, creating directories as specified.
	_.each(this.dir, function (dir) {
		this.mkdir(dir);
	}, this);
};

Generator.prototype.saveConfiguration = function saveConfiguration() {
	this.config.set("dir", this.dir);
	this.config.set("dev", this.dev);

	this.config.forceSave();
};

Generator.prototype.copyBoilerplateFiles = function copyBoilerplateFiles() {
	this.directory(this.dev.templates + 'boilerplate', this.destinationRoot());
};


