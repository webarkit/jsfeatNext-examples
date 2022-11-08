const path = require('path');
module.exports = (env, argv) => {
    let devtool = false;
    if (argv.mode === "development") {
        devtool = "inline-source-map";
    }
    console.log(`${argv.mode} build`);
    const module = {
        rules: [{
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
        }, ],
    };
    return [{
            name: "gaussian_blur",
            devtool,
            entry: "./src/gaussian_blur.ts",
            output: {
                //path: path.resolve('dist'),
                path: path.resolve(__dirname, "dist"),
                filename: "gaussian_blur.bundle.js",
            },
            resolve: {
                extensions: [".tsx", ".ts", ".js"],
            },
            module,
        }
    ]
};