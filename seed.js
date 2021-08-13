const db = require('./server/db/db');
const User = require('./server/db/User');

const seed = async () => {
	try {
		await db.sync();
		await User.create({ name: 'Chukwudi' });
	} catch (err) {
		console.log('error occured in seed file');
	}
};
seed()
	.then(() => console.log('tables have been created'))
	.catch(() => console.log('could not create relations'));
