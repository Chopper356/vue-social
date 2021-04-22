const mongoose = require('mongoose');
const User = require('./user');

const PostSchema = new mongoose.Schema({
	user: {
		type: mongoose.Types.ObjectId,
		required: true,
		ref: "user"
	},
	content: {
		type: String,
		required: true
	},
	date_create: {
		type: Date,
		default: new Date()
	},
	likes: [{
		type: mongoose.Types.ObjectId,
	}]
}, {
	versionKey: false
});

module.exports = mongoose.model('post', PostSchema);