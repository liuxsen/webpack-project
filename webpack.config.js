var path = require('path');
module.exports = {
	entry: './entry.js',
	output: {
		path: path.resolve(__dirname,'dist'),
		publicPath: '/dist',
		filename: 'bundle.js'
	},
	module:{
		loaders: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015']
				}
			},
			{
				test: /\.css$/,
				loader: "style!css"
			}
		]
	}
}