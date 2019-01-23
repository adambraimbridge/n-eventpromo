exports.client = {
	exclude: 'node_modules/**',
	presets: [
		[
			'@babel/preset-env',
			{
				targets: {
					ie: '11'
				},
				exclude: ['transform-regenerator', 'transform-async-to-generator']
			}
		],
		[
			'@babel/preset-react',
			{
				pragma: 'xEngine.h'
			}
		]
	],
	plugins: [
		[
			'module:fast-async',
			{
				compiler: {
					noRuntime: true
				}
			}
		]
	]
};

exports.server = {
	exclude: 'node_modules/**',
	presets: [
		[
			'@babel/preset-env',
			{
				targets: {
					node: 8
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
};
