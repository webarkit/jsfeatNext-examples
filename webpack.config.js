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
    return [
        {
            name: "box_blur",
            devtool,
            entry: "./src/box_blur.ts",
            output: {
                path: path.resolve(__dirname, "dist"),
                filename: "box_blur.bundle.js",
            },
            resolve: {
                extensions: [".tsx", ".ts", ".js"],
            },
            module,
        },
        {
            name: "equalize_hist",
            devtool,
            entry: "./src/equalize_hist.ts",
            output: {
                path: path.resolve(__dirname, "dist"),
                filename: "equalize_hist.bundle.js",
            },
            resolve: {
                extensions: [".tsx", ".ts", ".js"],
            },
            module,
        },
        {
            name: "gaussian_blur",
            devtool,
            entry: "./src/gaussian_blur.ts",
            output: {
                path: path.resolve(__dirname, "dist"),
                filename: "gaussian_blur.bundle.js",
            },
            resolve: {
                extensions: [".tsx", ".ts", ".js"],
            },
            module,
        },
        {
            name: "sobel",
            devtool,
            entry: "./src/sobel.ts",
            output: {
                path: path.resolve(__dirname, "dist"),
                filename: "sobel.bundle.js",
            },
            resolve: {
                extensions: [".tsx", ".ts", ".js"],
            },
            module,
        },
        {
            name: "warp perspective",
            devtool,
            entry: "./src/warp_perspective.ts",
            output: {
                path: path.resolve(__dirname, "dist"),
                filename: "warp_perspective.bundle.js",
            },
            resolve: {
                extensions: [".tsx", ".ts", ".js"],
            },
            module,
        }
    ]
};