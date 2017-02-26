module.exports = {
  entry: "./app/main.js",
  output: {
    path: __dirname + "./build",
    filename: "bundle.js"
  },
  resolve: {
    extensions: [" ", ".js", ".jsx"]
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        query: {
          presets: ["es2015", "react", "stage-0"]
        }
      }
    ]
  },
  devServer: {
    port: 3000,
    contentBase: "./build",
    inline: true
  }
}
