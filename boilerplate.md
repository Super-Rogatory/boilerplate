# **First Steps**
## [>] create project folder
## [>] npm init (-y for quick setup)
## [>] git init, then touch .gitignore
## [>] ignore node_modules, bundle.js, bundle.map.js, etc
# **React**
## [>] create index.html, include html, head (with meta and script tags), body (with a div tag and id)
```
<!DOCTYPE html>
<html>

<head>
    <!-- MDN recommends placing this right after your <head> tag -->
    <!-- "as some browsers restart the parsing of an HTML document if the declared charset is different from what they had anticipated" -->
    <meta charset='utf-8'>

    <!-- Our js bundle will be in 'bundle.js' (if that is the name we choose to give it) -->
    <!-- This tag will make mobile browsers scale to device width -->
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- The 'defer' attribute will ensure that our script is only ran after the DOM has loaded in -->
    <script src='./bundle.js' defer></script>

    <!-- Give the app a name -->
    <title>Boilerplate</title>
</head>

<body>
    <!-- We can create a reference to our React app with a div whose id is equivalent is the one referenced by document.getElementById('id selector') -->
    <div id="app"></div>
</body>

</html>
```
# **Set up main express app**
```
const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');

// logger middleware
app.use(morgan('dev'));
// serving up static files, static middleware
app.use(express.static(path.join(__dirname, '/public')));
// body parsing middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// mounting on /api
app.use('/api', require('./server/index'));

// our server should send its index.html for any requests that don't match one of our API routes.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
})

app.use((err, req, res, next) => {
    res.status(err.status || 500).send(err.message || 'Internal server error');
})
const PORT = 8080;
app.listen(PORT, () => console.log(`server: listening on port ${PORT}`));
```
## [>] Set up routers in server file, with the index.js as a place to collect all of the routers.

# **Back to React (Webpack, Babel)**
## [>] `npm install --save-dev webpack webpack-cli @babel/core babel-loader @babel/preset-react`
## [>] `npm install react react-dom react-router-dom`
## Decide on an entry file location for webpack.
<hr />

## [>] Create Webpack Configuration File
```
module.exports = {
	entry: ['./client/index.js'],
	output: {
		path: __dirname,
		filename: './public/bundle.js',
	},
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					presets: ['@babel/preset-react'],
				},
			},
		],
	},
	mode: 'development',
};
```
## [>] Create .babelrc file -> then write a basic REACTDOM.render in our entry file in the client folder.
```
{
	"presets": ["@babel/preset-react", "@babel/preset-env"]
}
-------------------------------------------------------------------------------------------------------------------------------------------------------------
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
	<div>Hello, world!</div>,
	document.getElementById('app') // make sure this is the same as the id of the div in your index.html
);

```

## [>] Update package.json, app is refering to the main express app
```
  "scripts": {
    "start": "node app",
    "start-dev": "webpack -w & nodemon app"
  },
```

# **Redux**
## [>] Setup Redux Boilerplate
- store is going to be a folder that contains the actions (action creators, action types), the effects (thunk creators), the reducers (root reducer and sub reducers that control a slice of state), and the store (createStore with particular arguments).

# **CSS | Webpack**
## [>] Webpack can not only build JavaScript files, it can build you css files into a single css file. This means you can write you css, import it as if it were a JS module and webpack will take care of the rest.
## [>] `npm install --save-dev style-loader css-loader`
## [>] Update the webpack config file to handle .css. Notice howw the presets for .jsx change, and how we will now use the style-loader/css-loader combos for anything matching the .css extension
```
module.exports = {
	entry: ['./client/index.js'],
	output: {
		path: __dirname,
		filename: './public/bundle.js',
	},
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel-loader',
				options: {
					presets: ['@babel/preset-react'],
				},
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
		],
	},
	mode: 'development',
};
```
## Now, we need to create an entry point for our css styles. I called mine 'index.css'.
## **NOTE:** You can now import './index.css' into a JavaScript file - webpack will then include it in the build path. However, because we've told webpack to build any files ending with .css using the style-related loaders. It will transform our css files into a file that it loads directly onto the DOM from our bundle.js.

# Side Note: Environment Variables
## [>] `npm install dotenv`
## [>] `require('dotenv').config(path/to/env/file)`
## [>] Dotenv loads environment variables from a .env file into process.env.

# Sequelize