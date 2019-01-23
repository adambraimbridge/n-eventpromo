const babelJest = require('babel-jest');

module.exports = babelJest.createTransformer({
	presets: [
		[
			'@babel/preset-env',
			{
				targets: {
					node: 6
				}
			}
		],
		[
			'@babel/preset-react',
			{
				'pragma': 'xEngine.h'
			}
		]
	]
});
