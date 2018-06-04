import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import { uglify } from "rollup-plugin-uglify";

export default {
  entry: "src/feeds.js",
  format: "umd",
  moduleName: "Feeds",
  plugins: [
    resolve(),
    commonjs(),
    babel(),
    uglify()
  ],
  dest: "target/pusher-feeds-client.js",
  sourceMap: "true"
};
