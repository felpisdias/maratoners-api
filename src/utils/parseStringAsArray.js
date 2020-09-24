module.exports = function parseStringAsArray(arrayAsString) {
	const string = arrayAsString.toLowerCase();
	return string.split(',').map(v => v.trim());
};
