const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	avatar: {
		type: String,
		default: "https://avatars.githubusercontent.com/u/12010456?v=4"
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	date_create: {
		type: Date,
		default: new Date()
	}
}, {
	versionKey: false
});

module.exports = mongoose.model('user', UserSchema);