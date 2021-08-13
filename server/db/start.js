// The following is in the `start.js` file

// say our sequelize instance is create in 'db.js'
const db = require('./db.js');
const app = require('../../app');
const PORT = process.env.PORT || 8080;

db.sync() // sync our database
	.then(function () {
		app.listen(PORT, () => console.log(`server: listening on port ${PORT}`)); // then start listening with our express server once we have synced
	});