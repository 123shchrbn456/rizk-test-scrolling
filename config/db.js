const mongoose = require('mongoose');
const config = require('config');
const db = config.get('MONGO_URI');

const connectDB = async () => {
	try {
		await mongoose.connect(db, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true
		});

		console.log('mongoDB connected');
	} catch (error) {
		console.error(err.message);
		process.exit(1); /* выход с ошибкой */
	}
};

module.exports = connectDB;
