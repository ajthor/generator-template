var express = module.exports;

express.rootDir = function (dir) {
	if(dir) this._rootDir = path.relative(__dirname, dir);
	return this._rootDir;
};