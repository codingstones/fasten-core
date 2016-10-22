var nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: "./src/index.js",
  output: {
    path: "dist",
    filename: "build.js",
    library: "fasten-core",
    libraryTarget: "umd"
  },
  externals: [nodeExternals()],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
};
