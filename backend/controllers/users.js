const User = require('../models/user');

module.exports = {
	async show(req, res) {
		let users = await User.find({}, "name avatar _id about_me user_status");
		res.send({success: true, users});
	}
}