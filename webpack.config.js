const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	entry: "./src/scripts/main.js",
	output: {
		path: path.resolve(__dirname, "_site/src/scripts"),
		filename: "main.js",
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "../styles/main.css",
		}),
	],
	module: {
		rules: [
			{
				test: /\.css$/,
				exclude: /node_modules/,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader",
					"postcss-loader",
				],
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				use: {
					loader: "file-loader",
				},
			},
		],
	},
};
