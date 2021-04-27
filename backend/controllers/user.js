const User = require('../models/user');

module.exports = {
	async getUserProfile(req, res) {
		try {
			let user = await User.findOne({_id: req.user}, "name avatar _id");
			res.send({success: true, user});
		}
		catch(error) {
			res.send({success: false, error: "Database error!"});
		}
	},

	async getOpenProfile(req, res) {
		try {
			let user = await User.findOne({_id: req.params.id}, "name avatar _id about_me user_status");
			res.send({success: true, user});
		}
		catch(error) {
			res.send({success: false, error: "Database error!"});
		}
	}
}