var path    = require('path');
var helpers = require('yeoman-generator').test;

describe('common generator', function() {
	
	var generator;

	it('can be required without throwing', function() {
		expect(function() {
			generator = require('../index.js');
		}).not.toThrow();
	});
	
	it('should load', function() {
		generator = require('../index.js');
		expect(generator).not.toBeUndefined();
	});

});