# First Steps
## [>] create project folder
## [>] npm init (-y for quick setup)
## [>] git init, then touch .gitignore
## [>] ignore node_modules, bundle.js, bundle.map.js, etc
# React
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
## [>] Set up main express app
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

# Back to React (Webpack, Babel)
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