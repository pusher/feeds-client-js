module.exports = {
  entry: {
    main: './src/feeds.ts',
  },
  output: {
    filename: "target/pusher-feeds.js",
    libraryTarget: "umd",
    library: "PusherFeeds"
  },
  resolve: {
    // extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
        rules: [
        {
            test: /\.tsx?$/,
            loader: 'ts-loader?' + JSON.stringify({ logInfoToStdOut: true }),
            exclude: /node_modules/,
        }
    ]
    }
};