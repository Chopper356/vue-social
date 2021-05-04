const User = require('../models/user');
const imgbbUploader = require("imgbb-uploader");
const config = require('../config/dev.json');
const sharp = require('sharp');

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
			let user = await User.findOne({_id: req.params.id}, {password: 0});
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

			let user = req.body;
			let about_me = req.body.about_me.replace(/\n{2,}/gi, "<br><br>");
				about_me = about_me.replace(/\n/, "<br>");
			
			let set = {
				name: user.name,
				status: user.status,
				about_me
			}

			if (req.files) {
				let buffer_base64 = req.files.avatar.data.toString("base64");
				let options = {
					apiKey: config.imgbb_api,
					base64string: buffer_base64
				}

				let avatar = await imgbbUploader(options);

				set.avatar = avatar.image.url;
			}

			await User.updateOne({_id: req.params.id}, {
				$set: set
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
					$addToSet: {friends: req.body.id}
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