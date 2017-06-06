import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";

export default {
  entry: "src/feed.js",
  format: "umd",
  moduleName: "PusherFeeds",
  plugins: [
    resolve(),
    commonjs({
      namedExports: {
        'node_modules/pusher-platform-js/target/pusher-platform.js': [ "App" ]
      }
    }),
    babel(),
  ],
  dest: "target/pusher-feeds-client.js"
};
