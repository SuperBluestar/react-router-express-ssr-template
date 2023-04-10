// this is needed, because we need to enable our server to handle JSX etc.
// Basicaly this is what react-scripts does for us in the frontend automatically
require("ignore-styles");

// Babel register: https://babeljs.io/docs/en/babel-register
// Babel presets: https://babeljs.io/docs/en/presets
require("@babel/register")({
    presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"],
    extensions: [".jsx", ".js", ".tsx", ".ts"]
})

require("./entry.server");
