const Comment = require("../models/comment");

module.exports = {
	async create(req, res) {
		try {
			let content = req.body.text.replace(/\n{2,}/gi, "<br><br>");
				content = content.replace(/\n/, "<br>");

			let comment = await Comment.create({
				user: req.user,
				post: req.body.post_id,
				content
			});
			await comment.populate("user", "avatar name _id").execPopulate();

			res.send({success: true, comment});
		}
		catch(err) {
			res.send({success: false, error: "Comment create error!"});
		}
	},
	async getCommentsForPost(req, res) {
		try {
			let comments = await Comment.find({post: req.params.post}).populate("user", "avatar name _id").sort({date_create: -1});
			res.send({success: true, comments});
		}
		catch(err) {
			console.log(err)
			res.send({success: false, error: "Comments loading error!"});
		}
	}
}