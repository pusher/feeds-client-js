import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";

export default {
  entry: "src/pusher-feeds.js",
  format: "umd",
  moduleName: "PusherFeeds",
  plugins: [
    resolve(),
    commonjs(),
    babel(),
  ],
  dest: "target/pusher-feeds-client.js",
  sourceMap: "true"
};
