'use strict';
var util = require('util');
var path = require('path');
var GeneratorMain = require('../lib/generator-main.js');

var _ = require('lodash');

var Generator = module.exports = function Generator(args, options, config) {
	GeneratorMain.apply(this, arguments);

};

util.inherits(Generator, GeneratorMain);

Generator.prototype.setBowerFiles = function setBowerFiles() {
	var bowerrc = {};
	var bowerJSON = {};

	bowerJSON.dependencies = {
	};

	bowerJSON.resolutions = {
	};

	if(this.components) {
		_.each(this.components, function (component) {
			bowerJSON.dependencies[component] = "*";
		});
	}

	bowerrc = {
		directory: this.dir.vendor
	};

	this.write('.bowerrc', JSON.stringify(bowerrc));
	this.write('bower.json', JSON.stringify(bowerJSON));
};

Generator.prototype.setPackageFiles = function setPackageFiles() {
	var packageJSON = {};

	packageJSON.dependencies = {
		"grunt": "*",
		"grunt-cli": "*"
	};

	packageJSON.devDependencies = {
		"grunt-karma": "*",
		"karma": "*",
		"karma-jasmine": "*",
		"time-grunt": "*",
		"load-grunt-tasks": "*",
		"grunt-contrib-watch": "*",
		"grunt-contrib-clean": "*",
		"grunt-contrib-jshint": "*",
		"grunt-nodemon": "*",
		"grunt-concurrent": "*"
	};

	this.write('package.json', JSON.stringify(packageJSON));
};

Generator.prototype.setGeneralConfig = function setGeneralConfig() {
	var configFile = {
		name: this.name,
		version: this.version,

		PORT: 3000,
		
		dir: this.dir,
		dev: this.dev,
		
		components: this.components
	};

	this.write('config/config.json', JSON.stringify(configFile));
};

Generator.prototype.copyGruntfile = function copyGruntfile() {
	this.template(path.join(this.dev.templates, 'common/Gruntfile.js'), 'Gruntfile.js');
};




