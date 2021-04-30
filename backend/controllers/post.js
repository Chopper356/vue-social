const Post = require("../models/post");
const Comment = require("../models/comment");

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
			let posts = await Post.find({}).populate("user").lean();
			
			for(let post of posts) {
				post.comments = await Comment.countDocuments({post: post._id});
				// post.likes = post.likes.length;
			}

			res.send({success: true, posts});
		}
		catch(err) {
			console.log(err)
			res.send({success: false, error: "Post loading error!"});
		}
	},
	async like(req, res) {
		try {
			if (req.body.liked) {
				await Post.updateOne({_id: req.body.id}, {
					$push: {likes: req.user}
				})
			}
			else {
				await Post.updateOne({_id: req.body.id}, {
					$pull: {likes: req.user}
				})
			}

			res.send({success: true});
		}
		catch(err) {
			console.log(err)
			res.send({success: false, error: "Like added error!"});
		}
	}
}