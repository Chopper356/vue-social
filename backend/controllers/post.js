const Post = require("../models/post");

module.exports = {
	async create(req, res) {
		try {
			let content = req.body.text.replace(/\n{2,}/gi, "<br><br>");
				content = content.replace(/\n/, "<br>");

			await Post.create({
				user: req.user,
				content
			});
			res.send({success: true});
		}
		catch(err) {
			res.send({success: false, error: "Post create error!"});
		}
	},

	async getAll(req, res) {
		try {
			let posts = await Post.find({}).populate("user");
			res.send({success: true, posts});
		}
		catch(err) {
			console.log(err)
			res.send({success: false, error: "Post loading error!"});
		}
	}
}