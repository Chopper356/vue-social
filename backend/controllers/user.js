const User = require('../models/user');

module.exports = {
	async getUserProfile(req, res) {
		try {
			let user = await User.findOne({_id: req.user}, "name avatar");
			res.send({success: true, user});
		}
		catch(error) {
			res.send({success: false, error: "Database error!"});
		}
	}
}