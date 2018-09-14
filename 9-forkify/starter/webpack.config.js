/* One object that we put all our config settings in 

4 core concepts in webpack: 
Entry point: file it will start looking for dependencies 
which it should bundle together.  One or more entry files
output: tell webpack where to sae the bundle file 
loaders 
plugins 

Production mode and development mode can be set. 
- dev mode makes it faster - doesn't compress code 
- production should be used for final product. 
*/

const path = require('path'); // built in node module

module.exports = {
    entry: './src/js/index.js',
    output: {
        path: path.resolve(__dirname, 'dist/js'),  //must be absolute path (need a built in node package)
        filename: 'bundle.js'
    },
    mode: development
};