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
	},
	about_me: {
		type: String,
		default: "Unfortunately, there is nothing here yet :("
	},
	friends: [{
		type: mongoose.Types.ObjectId,
		ref: "user"
	}],
	online: {
		type: Boolean,
		default: false
	},
	status: {
		type: String,
	}
}, {
	versionKey: false
});

module.exports = mongoose.model('user', UserSchema);