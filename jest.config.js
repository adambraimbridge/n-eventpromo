module.exports = {
	transform: {
		'\\.html$': 'jest-handlebars'
	},
	coveragePathIgnorePatterns: ['/node_modules/', '/bower_components/'],
	testEnvironment: 'node',
	testURL: 'http://localhost/'
};
