'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var proxy = process.env.http_proxy || process.env.HTTP_PROXY || process.env.https_proxy || process.env.HTTPS_PROXY || null;
var githubOptions = {
  version: '3.0.0'
};

if (proxy) {
  githubOptions.proxy = {};
  githubOptions.proxy.host = url.parse(proxy).hostname;
  githubOptions.proxy.port = url.parse(proxy).port;
}

var GitHubApi = require('github');
var github = new GitHubApi(githubOptions);

var extractGeneratorName = function (_, appname) {
  var slugged = _.slugify(appname),
    match = slugged.match(/^generator-(.+)/);

  if (match && match.length === 2) {
    return match[1].toLowerCase();
  }

  return slugged;
};

var githubUserInfo = function (name, cb) {
  github.user.getFrom({
    user: name
  }, function (err, res) {
    if (err) {
      throw err;
    }
    cb(JSON.parse(JSON.stringify(res)));
  });
};

var TemplateGenerator = module.exports = function TemplateGenerator(args, options, config) {
	yeoman.generators.Base.apply(this, arguments);

	this.on('end', function () {
		this.installDependencies({ skipInstall: options['skip-install'] });
	});

	this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(TemplateGenerator, yeoman.generators.Base);

TemplateGenerator.prototype.askFor = function askFor() {
	var cb = this.async();
	var generatorName = extractGeneratorName(this._, this.appname);

	var prompts = [{
		name: 'githubUser',
		message: 'Would you mind telling me your username on GitHub?',
		default: 'someuser'
	}, {
		name: 'generatorName',
		message: 'What\'s the base name of your generator?',
		default: generatorName
	}];

	this.prompt(prompts, function (props) {
		this.githubUser = props.githubUser;
    
		this.generatorName = props.generatorName;
		this.appname = 'generator-' + this.generatorName;

		cb();
	}.bind(this));
};


TemplateGenerator.prototype.userInfo = function userInfo() {
	var done = this.async();

	githubUserInfo(this.githubUser, function (res) {
		/*jshint camelcase:false */
		this.realname = res.name;
		this.email = res.email;
		this.githubUrl = res.html_url;
		done();
	}.bind(this));
};

TemplateGenerator.prototype.copyProjectFiles = function copyProjectFiles() {
	this.template('LICENSE');
	this.template('_package.json', 'package.json');

	this.template('README.md');

	this.copy('gitignore', '.gitignore');
};

TemplateGenerator.prototype.makeDirectories = function makeDirectories() {
	this.mkdir('app');
	this.mkdir('boilerplate');
	this.mkdir('common');
	this.mkdir('lib');
	this.mkdir('lib/util');
	this.mkdir('templates');
	this.mkdir('templates/boilerplate');
	this.mkdir('templates/common');
};

TemplateGenerator.prototype.copyBaseGenerators = function copyBaseGenerators() {
	this.template('app/index.js');
	this.template('boilerplate/index.js');
	this.template('common/index.js');
};

TemplateGenerator.prototype.copyLibraryDirectory = function copyLibraryDirectory() {
	this.copy('lib/generator-main.js');
	this.copy('lib/util/config.js');
	this.copy('lib/util/express.js');
	this.copy('lib/util/module.js');
	this.copy('lib/util/requirejs.js');
};

TemplateGenerator.prototype.copyTemplatesDirectory = function copyTemplatesDirectory() {
	this.copy('templates/boilerplate/public/404.html');
	this.copy('templates/boilerplate/public/robots.txt');
	this.copy('templates/boilerplate/public/favicon.ico');
	this.copy('templates/boilerplate/public/styles/main.css');

	this.copy('templates/common/Gruntfile.js');
	this.copy('templates/common/index.html');
};
