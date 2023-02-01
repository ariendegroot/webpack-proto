
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const sitemap = require('./sitemap.config');

let config = {
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.html$/,
				include: path.join(__dirname, '/'),
				use: {
					loader: 'html-loader',
					options: {
						interpolate: true
					}
				}
			},
			{
				test: /\.(svg|gif|ico|png|jpe?g)$/,
				use: {
					loader: 'file-loader',
					options: {
						name: '[name].[ext]',
						//publicPath: 'assets/'
						publicPath: '/'
					}
				}
			},
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							importLoaders: 2,
							sourceMap: true
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							plugins: () => [
								require('autoprefixer')({
									browsers: ['> 1%', 'last 2 versions']
								})
							],
							sourceMap: true,
							minify: true
						}
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true
						}
					}
				]
			}
		]
	},
	plugins: [
		new HtmlWebPackPlugin({
			template: './src/index.html',
			filename: './index.html'
		}),
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[id].css'
		})
	]
};

for (let i = 0; i < sitemap.files.length; i++) {
	const file = sitemap.files[i];
	config.plugins.push(
		new HtmlWebPackPlugin({
			template: file.templatePath,
			path: path.join(__dirname, 'dist'),
			filename: file.filename
		})
	);
}

module.exports = config;
