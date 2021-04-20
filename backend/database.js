const mongoose = require('mongoose');
const config = require('config');

mongoose.connect(config.mongo, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true
}).then(() => {
	console.log("MongoDB connected!")
});