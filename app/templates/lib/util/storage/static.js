var fs = require('fs');
var _ = require('lodash');
var Storage = require('./storage.js');

var load = exports.load = function load(path, options) {
	options || (options = {});
	var storage, file, content = {};

	if(!path) path = defaultPath;

	storage = new Storage();

	try {
		if(_.isString(path)) {
			// Try to load the file.
			try {
				if(options.sync) {
					file = fs.readFileSync(path, {encoding: 'utf8'});
				} else {
					file = fs.readFile(path, {encoding: 'utf8'});
				}

				content = JSON.parse(file);
				storage.module = false;
			} catch (e) {
				// Not a JSON file. Try finding the object hidden inside.
				console.log("WARNING: Not a JSON file.");

				try {
					content = require(path);
					if(_.isFunction(content)) throw new Error('Module is incorrectly formatted. Make sure module exports a JS object.');
					storage.module = true;
				} catch (e) {
					// Not anything. Something went wrong.
					console.error("Parsing file returned an error:", e);
				}

			}
		// If you passed an object instead of a filename, extend it to the data.
		} else if (_.isObject(path)) {
			content = _.assign(content, path);
		}
	} catch (e) {
		console.log(e);
	}

	storage.set(content);
	storage.path = path;

	return storage;
};

var save = exports.save = function save(path, storage, cb, options) {
	options || (options = {});
	var output;

	if(_.isObject(path)) {
		storage = path;
		if(storage.path) path = storage.path;
		else path = defaultPath;
	}
	if(!storage) throw new Error('Value for arguments in save function cannot be null.');
	if(!path && !storage.path) throw new Error('Value for path in save function must be defined.');

	if(!(storage instanceof Storage)) throw new Error('Value for argument \'storage\' in save function must be an instance of Storage.');

	// Write file.
	if(cb && _.isFunction(cb)) {
		output = cb(storage);
		if(!output) throw new Error('Return value of callback in save function cannot be falsey.');
	} else {
		output = JSON.stringify(storage.store, null, 4);
		if((storage.module === true) || (options.module === true)) {
			output = "module.exports = " + output + ";";
		}
	}
	if (options.sync) {
		fs.writeFileSync(path, output);
	} else {
		fs.writeFile(path, output);
	}
	// Set this.path to new path.
	this.path = path;
};

var defaultPath = exports.path = "./default.json";

