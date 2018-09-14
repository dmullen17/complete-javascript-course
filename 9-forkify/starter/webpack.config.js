/* One object that we put all our config settings in 

4 core concepts in webpack: 
Entry point: file it will start looking for dependencies 
which it should bundle together.  One or more entry files
output: tell webpack where to sae the bundle file 
loaders 
plugins: complex processing of input files 

Production mode and development mode can be set. 
- dev mode makes it faster - doesn't compress code 
- production should be used for final product. 

Provides us with a development server.  
We need to install it first 
npm install webpack-dev-ser --save-dev
we need to configure it with the devServer object 
src folder is only for development - it then gets bundled into the distribution (dist) folder 

Package.json script comments 
  "scripts": {
    "dev": "webpack --mode development", //builds the dev version (doesn't compress files)
    "build": "webpack --mode production", //builds production version (compressed)
    "start": "weback-dev-server --mode developement --open" //script that runs in background and reloads the webpage whenever we make a change

Plugin: html webpack plugin: 
first install with npm install html-webpack-plugin --save-dev
Require it with: const HtmlWebpackPlugin = require('html-webpack-plugin');

Babel setup: 
babel-core, babel-preset-env, babel-loader

Loaders: allow us to load files and convert them 
- babel-loader

Polyfilling: 
Promises are not present in ES5 - we use polyfilling to generate these 
babel-polyfill - code that needs to go in final bundle so we use --save
babel changed its package names to being with @ and use / instead of - 
updated these in the code 

*/

const path = require('path'); // built in node module
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ['@babel/polyfill', './src/js/index.js'], // add polyfill to entry points
    output: {
        path: path.resolve(__dirname, 'dist'),  //must be absolute path (need a built in node package)
        filename: 'js/bundle.js'
    },
    devServer: {
        contentBase: './dist', //specify folder which webpack should ship files                  
    },
    plugins: [
        new HtmlWebpackPlugin({
            // copy our src index.html to the dist index.html file
            filename: 'index.html',
            template: './src/index.html'
        })
    ],
    // babel-loader, finds and converts all JS files 
    // also needs a babel config file (usually called .babelrc)
    module: {
        rules: [
            {
                test: /\.js$/, // regex for all js files
                exclude: /node_modules/, // exclude this folder of JS files
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
};