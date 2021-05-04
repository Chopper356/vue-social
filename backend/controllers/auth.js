const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');

module.exports = {
	async signUp(req, res) {
		try {
			let user = req.body;

			let find_user = await User.findOne({email: user.email});
			let saltRounds = 8;

			if (!find_user) {
				user.password = await bcrypt.hash(user.password, saltRounds);
				let new_user = await User.create(user);
				let token = jwt.sign({ id: new_user._id }, config.jwt);
				res.send({success: true, token});
			} 
			else {
				res.send({success: false, error: "This user already exists!"});
			}
		}
		catch(error) {
			res.send({success: false, error: "Server error!"});
		}
	},

	async signIn(req, res) {
		try {
			let user = req.body;
			let findUser = await User.findOne({email: user.email});
			
			if (!findUser) {
				return res.send({success: false, error: "Incorrect email"});
			}

			let passmatch = await bcrypt.compare(user.password, findUser.password);

			if (!passmatch) {
				return res.send({success: false, error: "Incorrect password"});
			} 
			
			let token = jwt.sign({ id: findUser._id }, config.jwt);
			res.send({success: true, token});
		}
		catch(error) {
			res.send({success: false, error: "Server error!"});
		}
	}
}