var fs = require('fs');
var _ = require('lodash');

describe('storage', function() {

	var storage;

	beforeEach(function() {
		storage = require('../storage.js');
	});

	it('should be defined', function() {
		expect(storage).toBeDefined();
	});

	it('should be instantiable', function() {
		expect(new storage()).toBeDefined();
	});

	describe('storage.prototype', function() {

		it('should have a store property', function() {
			expect(storage.prototype.store).toBeDefined();
		});

		it('should have a storage property', function() {
			expect(storage.prototype.storage).toBeDefined();
		});

		it('should have a get function', function() {
			expect(storage.prototype.get).toBeDefined();
		});
		
		it('should have a set function', function() {
			expect(storage.prototype.set).toBeDefined();
		});

	});

	describe('storage.__proto__', function() {

		it('should be defined', function() {
			expect(storage.__proto__).toBeDefined();
		});

		it('should have a load function', function() {
			expect(storage.__proto__.load).toBeDefined();
		});

		it('should have a save function', function() {
			expect(storage.__proto__.save).toBeDefined();
		});

	});

});

describe('storage constructor', function() {

	var storage;

	beforeEach(function() {
		storage = require('../storage.js');
	});

	it('should be instantiable', function() {
		expect(new storage()).toBeDefined();
	});

	it('should return a value', function() {
		var something = new storage();
		expect(something).toBeDefined();
	});

	it('should return an instance of storage', function() {
		var something = new storage();
		expect(something instanceof storage).toBe(true);
	});

	it('should return an instance of storage without the new keyword', function() {
		var something = storage();
		expect(something instanceof storage).toBe(true);
	});

	describe('instance without new keyword', function() {

		var instance;

		beforeEach(function() {
			instance = storage();
		});

		// it('should be the same as an instance with the new keyword', function() {
		// 	expect(instance).toEqual(new storage());
		// });

		// it('should extend the data object if passed an object', function() {
		// 	var obj = {name: 'Bert'};
		// 	instance = storage(obj);

		// 	expect(instance.get('name')).toBe('Bert');
		// 	expect(instance.data['name']).toBe('Bert');
		// });

		it('should throw if passed a function', function() {
			expect(function() {instance = storage(function() {});}).toThrow();
		});

	});

});

describe('storage instance', function() {

	var instance;

	beforeEach(function() {
		var storage = require('../storage.js');
		instance = new storage();
	});

	it('should be defined', function() {
		expect(instance).toBeDefined();
	});

	// it('should have a load function', function() {
	// 	expect(instance.load).toBeDefined();
	// });

	// describe('load function', function() {

	// 	it('should return a value', function() {
	// 		expect(instance.load()).not.toBeUndefined();
	// 	});

	// 	it('should return an instance of storage', function() {
	// 		expect(instance.load() instanceof storage).toBe(true);
	// 	});

	// });

	// it('should have a save function', function() {
	// 	expect(instance.save).toBeDefined();
	// });

	it('should have a store property', function() {
		expect(instance.store).toBeDefined();
	});

	it('should have a get function', function() {
		expect(instance.get).toBeDefined();
	});

	describe('get function', function() {

		it('should return a value', function() {
			expect(instance.get()).not.toBeUndefined();
		});

		// it('should return a value from the data object', function() {
		// 	instance.set('something', 3);
		// 	expect(instance.data.something).toBe(3);
		// 	var result = instance.get('something');
		// 	expect(result).toBe(3);
		// });

		// it('should return a value from the data object if an object is passed', function() {
		// 	instance.set('something', {name: 'Bert'});
		// 	expect(instance.data.something).toEqual({name: 'Bert'});
		// 	var result = instance.get({name: 'Bert'});
		// 	expect(result).toEqual({name: 'Bert'});
		// });

		// it('should return null if nothing is found', function() {
		// 	instance.set('something', 3);
		// 	var result = instance.get('else');
		// 	expect(result).toBe(null);
		// });

		it('should return the whole store object if a null argument is passed', function() {
			expect(instance.get(null) === instance.store).toBe(true);
		});

	});

	it('should have a set function', function() {
		expect(instance.get).toBeDefined();
	});

	describe('set function', function() {

		it('should throw if selector argument is null', function() {
			expect(function () {instance.set(null);}).toThrow();
		});

		it('should throw if a function is passed as an argument', function() {
			var func = function() {};
			expect(function () {instance.set(func);}).toThrow();
		});

		// it('should extend the data property if an object is passed', function() {
		// 	var obj = {'something': true};
		// 	var data = instance.data;

		// 	instance.set(obj);

		// 	expect(instance.data === _.extend(data, obj)).toBe(true);
		// });

		// it('should add a property if a string is passed', function() {
		// 	var arg = 'something';
		// 	instance.set(arg, true);

		// 	expect(instance.data.something).toBe(true);
		// });

		// it('should throw if a string is passed but value is falsey', function() {
		// 	var arg = 'something';
		// 	expect(function () {instance.set(arg, false);}).toThrow();
		// });

	});

});

describe('practical tests', function() {

	var storage;
	var instance;
	var kconfig;
	var fileName = './default.js';

	beforeEach(function() {
		storage = require('../storage.js');
		instance = new storage();

		fs.writeFileSync(fileName, "module.exports = {\"good\": \"something\"};");
	});

	it('should load a file', function() {
		instance = storage.load(fileName);
		expect(instance).toBeDefined();

		var result = instance.get('good');
		expect(result).toBe('something');
	});

	it('should save a file', function() {
		instance.set('randomValue', 34);
		expect(instance.get('randomValue')).toBe(34);

		var obj = storage.load(fileName);
		expect(obj.get('randomValue')).toBeDefined();
		expect(obj.get('randomValue')).toBe(34);

		storage.save(fileName, obj);
	});

	// it('should load a kconfig file', function() {
	// 	kconfig = storage.loadKarmaConfig();
	// 	expect(kconfig).not.toBeUndefined();
	// });

	// it('should save a kconfig file', function() {
	// 	storage.saveKarmaConfig(null, kconfig);
	// });

});

