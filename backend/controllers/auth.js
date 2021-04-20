const User = require('../models/user');

module.exports = {
	async signUp(req, res) {
		try {
			let user = req.body;

			let findUser = await User.findOne({email: user.email})

			if (!findUser) {
				await User.create(user);
				res.send({success: true});
			} 
			else {
				res.send({success: false, error: "This user already exists!"});
			}
		}
		catch(error) {
			res.send({success: false, error: "Server error!"});
		}
	},
	signIn(req, res) {
		res.send("Signin")
	}
}