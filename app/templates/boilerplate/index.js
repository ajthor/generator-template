'use strict';
var util = require('util');
var path = require('path');
var GeneratorMain = require('./lib/generator-main.js');

var _ = require('lodash');

var Generator = module.exports = function Generator(args, options, config) {
	GeneratorMain.apply(this, arguments);

};

util.inherits(Generator, GeneratorMain);

Generator.prototype.setDirectories = function setDirectories() {
	// Set default directory structure.
	this.dir = {
		// Public directories.
		// NOTE: If you want to rename the variables, be sure to modify: 
		// the 3 generators, generator-base, and the templates.
		public:         "public",
		// Other directories.
		config:         "config",
		test:           "test",
		build:          "build",
	};

	this.dir = _.extend(this.dir, {
		images:         path.join(this.dir.public, "/images"),
		styles:         path.join(this.dir.public, "/styles"),
		scripts:        path.join(this.dir.public, "/scripts"),
		vendor:         path.join(this.dir.public, "/scripts/vendor"),
		views:          path.join(this.dir.public, "/views"),
	});
	// Set 'development' directories.
	this.dev = {
		templates:      path.join(this.sourceRoot(), '../../templates'),
		boilerplate:    path.join(this.sourceRoot(), '../../templates/boilerplate'),
		common:         path.join(this.sourceRoot(), '../../templates/common')
	};
	// These options will be available in any generator inheriting from base generator.
	// Just use this.dir or this.dev
};

Generator.prototype.makeDirectories = function makeDirectories() {
	// Cycle through object, creating directories as specified.
	_.each(this.dir, function (dir) {
		this.mkdir(dir);
	}, this);
};

Generator.prototype.saveConfiguration = function saveConfiguration() {
	// Save configuration to file.
	this.config.set("dir", this.dir);
	this.config.set("dev", this.dev);
	// Force save so that it can be used in the next generator.
	this.config.forceSave();
};

Generator.prototype.copyBoilerplateFiles = function copyBoilerplateFiles() {
	// Copy entire boilerplate template folder to the destination directory.
	this.directory(this.dev.boilerplate, this.destinationRoot());
};


