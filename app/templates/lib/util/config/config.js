var fs = require('fs');
var _ = require('lodash');
var storage = require('../storage/storage');

var loadKarmaConfig = exports.loadKarmaConfig = function loadKarmaConfig(path) {
	if(!path) path = './karma.conf.js';
	var config, result, module = require(path);

	config = {};
	config.set = function(obj) {
		result = {};
		result = _.assign(result, obj);
	};

	module(config);

	return result;
};

var saveKarmaConfig = exports.saveKarmaConfig = function saveKarmaConfig(path, config, options) {
	options || (options = {});
	if(!path) path = './karma.conf.js';
	config = JSON.stringify(config, null, 4);

	config = "module.exports = function(config) {\nconfig.set(" + config + ");\n};";
	
	if (options.sync) {
		fs.writeFileSync(path, config);
	} else {
		fs.writeFile(path, config);
	}
};