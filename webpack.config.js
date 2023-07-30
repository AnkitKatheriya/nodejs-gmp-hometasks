import * as path from 'path';
module.exports = {
	entry: './src/server.ts',
	mode: "production",
	target: "node",
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
		],
	},
	devtool: "inline-source-map",
	resolve: {
		extensions: [".tsx", ".ts", ".js"],
		alias: {
			"pg-native": "noop2",
		}
	},
	output: {
		path: path.resolve(__dirname, "dist"),
	},
};