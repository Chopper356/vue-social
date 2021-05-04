const Post = require("../models/post");
const Comment = require("../models/comment");
const imgbbUploader = require("imgbb-uploader");
const config = require('../config/dev.json');
const sharp = require('sharp');

module.exports = {
	async create(req, res) {
		try {
			let content = req.body.text.replace(/\n{2,}/gi, "<br><br>");
				content = content.replace(/\n/, "<br>");

			let create_post = {
				user: req.user,
				content
			}

			if (req.files.image) {
				let buffer_base64 = req.files.image.data.toString("base64");
				let options = {
					apiKey: config.imgbb_api,
					base64string: buffer_base64
				}

				let image = await imgbbUploader(options);

				console.log(image)

				create_post.images = image.image.url;
			}

			await Post.create(create_post);
			res.send({success: true});
		}
		catch(err) {
			console.log(err, req.body, req.user)
			res.send({success: false, error: "Post create error!"});
		}
	},

	async getAll(req, res) {
		try {
			let posts = await Post.find({}).populate("user").populate("likes", "name avatar _id").lean();
			for(let post of posts) {
				post.comments = await Comment.countDocuments({post: post._id});
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