const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
	post: {
		type: mongoose.Types.ObjectId,
		required: true,
		ref: "post"
	},
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
	}
}, {
	versionKey: false
});

module.exports = mongoose.model('comment', CommentSchema);