module.exports = {
  entry: "./src/index.js",
  output: {
    path: "dist",
    filename: "build.js",
    library: "fasten-core",
    libraryTarget: "umd"
  },
  externals: [
    {"superagent": "superagent"}
  ],
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
