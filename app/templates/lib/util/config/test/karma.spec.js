describe('configuration utilities', function() {
	var karma;

	it('should load', function() {
		karma = require('../karma.js');
		expect(karma).not.toBeUndefined();
	});
});