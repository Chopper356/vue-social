const User = require('../models/user');

module.exports = {
	async getAllUsers(req, res) {
		let users = await User.find({}, {password: 0});
		res.send({success: true, users});
	}
}