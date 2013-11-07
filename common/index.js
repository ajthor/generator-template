'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var GeneratorBase = require('../generator-base.js');

var cheerio = require('cheerio');
var _ = require('lodash');

var Generator = module.exports = function Generator(args, options, config) {
	GeneratorBase.apply(this, arguments);

};

util.inherits(Generator, GeneratorBase);

Generator.prototype.setBowerFiles = function setBowerFiles() {
	var bowerConfig = JSON.parse(this.readFileAsString(path.join(this.dev.templates, 'common/_bower.json')));

	bowerConfig.dependencies = {
		"jquery": "~1.9.1"
	};

	bowerConfig.resolutions = {
	};

	this.pushToConfig("scripts", "jquery", path.join(this.dir.vendor, "/jquery/jquery.js"));

	_.each(this.components, function (component) {
		bowerConfig.dependencies[component] = "*";
	});

	this.setConfigFile('.bowerrc', {
		directory: this.dir.vendor
	});

	this.setConfigFile('bower.json', bowerConfig);
};

Generator.prototype.setPackageFiles = function setPackageFiles() {
	var packageConfig = JSON.parse(this.readFileAsString(path.join(this.dev.templates, 'common/_package.json')));

	packageConfig.dependencies = {
		"grunt": "*",
		"grunt-cli": "*"
	};

	packageConfig.devDependencies = {
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

	this.setConfigFile('package.json', packageConfig);
};

Generator.prototype.setGeneralConfig = function setGeneralConfig() {
	this.setConfigFile(path.join(this.dir.config, 'config.js'), {
		PORT: 3000,
		dir: this.dir,
		dev: this.dev,
		// components: this.components
	}, "module");
};

Generator.prototype.copyGruntfile = function copyGruntfile() {
	this.template(path.join(this.dev.templates, 'common/Gruntfile.js'), 'Gruntfile.js');
};

Generator.prototype.writeIndexFile = function writeIndexFile() {
	if(this.options['dont-add']===true) return;

	this.indexFile = this.readFileAsString(path.join(this.dev.templates, 'common/index.html'));
	this.indexFile = this.engine(this.indexFile, this);

	var scripts = _.toArray(this.config.get("scripts"));

	this.indexFile = this.wireScriptsToFile(this.indexFile, scripts);

	this.write(path.join(this.dir.public, 'index.html'), this.indexFile);
};




