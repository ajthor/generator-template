var _ = require('lodash');

var Storage = module.exports = function(name) {
	if(!(this instanceof Storage)) return new Storage(name);

	if(_.isFunction(name)) 
		throw new Error('Value for argument \'name\' in constructor must not be a function.');
	if(_.isObject(name)) {
		this.set(name);
	}

	if(_.isString(name)) this.name = name;
	else {
		this.name = _.uniqueId('storage');
	}
};

Storage.__proto__ = require('./static.js');

Storage.prototype.get = function get(selector) {
	if(!selector) return this.store;

	if(this.store[selector]) 
		return this.store[selector];

	var result;

	if(result = _.find(this.store, selector)) {
		return result;
	}

	return null;
};

Storage.prototype.set = function set(selector, value) {
	if(!selector) throw new Error('Value for argument \'selector\' in set function must be a truthy value.');
	if(_.isFunction(selector)) throw new Error('Value for argument \'selector\' in set function cannot be a function.');
	
	if(_.isObject(selector)) {
		this.store = _.assign(this.store, selector);
	}
	else if(_.isString(selector)) {
		if(!value) 
			throw new Error('Value for argument \'value\' in set function should be truthy.');
		else this.store[selector] = value;
	}
	else {
		throw new Error('Value for argument \'selector\' in set function can only be an object or string.');
	}
};

Storage.prototype.storage = '[Object Storage]';
Storage.prototype.module = false;

Storage.prototype.store = {};

