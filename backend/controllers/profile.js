const User = require('../models/user');

module.exports = {
	async getUserProfile(req, res) {
		try {
			let user = await User.findOne({_id: req.user}, {password: 0});
			res.send({success: true, user});
		}
		catch(error) {
			res.send({success: false, error: "Database error!"});
		}
	},

	async getOpenProfile(req, res) {
		try {
			let user = await User.findOne({_id: req.params.id}, "name avatar _id about_me user_status friends");
			res.send({success: true, user});
		}
		catch(error) {
			res.send({success: false, error: "Database error!"});
		}
	},

	async editProfile(req, res) {
		try {
			if (req.user != req.params.id) {
				return res.send({success: false, error: "Access denied!"});
			}

			let user = req.body.user;
			await User.updateOne({_id: req.params.id}, {
				$set: {
					name: user.name,
					about_me: user.about_me,
					status: user.status
				}
			});
			
			res.send({success: true});
		}
		catch(error) {
			res.send({success: false, error: "Database error!"});
		}
	},
	
	async friendAdd(req, res) {
		try {
			if (req.body.add) {
				await User.updateOne({_id: req.user}, {
					$push: {friends: req.body.id}
				});
			}
			else {
				await User.updateOne({_id: req.user}, {
					$pull: {friends: req.body.id}
				});
			}
			res.send({success: true});
		}
		catch(error) {
			res.send({success: false, error: "Database error!"});
		}
	}
}