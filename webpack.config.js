require("jsx-loader");
module.exports = {
    entry: "./app.js",
    output: {
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {loader: 'jsx-loader?harmony'}
        ]
    }
};
