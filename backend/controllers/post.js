const Post = require("../models/post");
const Comment = require("../models/comment");
const imgbbUploader = require("imgbb-uploader");
const config = require('../config/dev.json');
const sharp = require('sharp');
const htmlspecialchars = require('htmlspecialchars');

module.exports = {
	async create(req, res) {
		try {
			let content = htmlspecialchars(req.body.text);
				content = content.replace(/\n{2,}/gi, "<br><br>");
				content = content.replace(/\n/gi, "<br>");

			let create_post = {
				user: req.user,
				content
			}

			if (req.files) {
				let buffer_base64 = req.files.image.data.toString("base64");
				let options = {
					apiKey: config.imgbb_api,
					base64string: buffer_base64
				}

				let image = await imgbbUploader(options);

				create_post.images = [{
					large:  image.image.url,
					medium: image.medium.url
				}];
			}

			await Post.create(create_post);
			res.send({success: true});
		}
		catch(err) {
			console.log(err)
			res.send({success: false, error: "Post create error!"});
		}
	},

	async delete(req, res) {
		try {
			await Post.findOneAndRemove({_id: req.params.id});

			res.send({success: true});
		}
		catch(err) {
			console.log(err)
			res.send({success: false, error: "Post create error!"});
		}
	},

	async edit(req, res) {
		try {
			let content = req.body.text.replace(/\n{2,}/gi, "<br><br>");
				content = content.replace(/\n/gi, "<br>");

			await Post.updateOne({_id: req.params.id}, {content});

			res.send({success: true, content});
		}
		catch(err) {
			console.log(err)
			res.send({success: false, error: "Post create error!"});
		}
	},

	async getAll(req, res) {
		try {
			let posts = await Post.find({}).populate("user").limit(10).populate("likes", "name avatar _id").sort({date_create: -1}).lean();
			for(let post of posts) {
				post.comments = await Comment.countDocuments({post: post._id});
			}

			res.send({success: true, posts});
		}
		catch(err) {
			res.send({success: false, error: "Post loading error!"});
		}
	},

	async getPostsByPage(req, res) {
		try {
			let skip_num = (req.params.page - 1) * 10;
			let user_id = req.params.id;
			let find = (user_id != "all") ? {user: user_id} : {};
			let posts = await Post.find(find).populate("user").skip(skip_num).limit(10).populate("likes", "name avatar _id").sort({date_create: -1}).lean();

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

	// async getUserPosts(req, res) {
	// 	try {
	// 		if (!req.params.id) return res.send({success: false, error: "Post loading error!"});

	// 		let posts = await Post.find({user: req.params.id}).limit(10).populate("user").populate("likes", "name avatar _id").sort({date_create: -1}).lean();
	// 		for(let post of posts) {
	// 			post.comments = await Comment.countDocuments({post: post._id});
	// 		}

	// 		res.send({success: true, posts});
	// 	}
	// 	catch(err) {
	// 		res.send({success: false, error: "Post loading error!"});
	// 	}
	// },

	async getPostPage(req, res) {
		try {
			if (!req.params.id) return res.send({success: false, error: "Post loading error!"});

			let post = await Post.findOne({_id: req.params.id}).populate("user").populate("likes", "name avatar _id").sort({date_create: -1}).lean();
			post.comments = await Comment.countDocuments({post: post._id});

			res.send({success: true, post});
		}
		catch(err) {
			res.send({success: false, error: "Post loading error!"});
		}
	},

	async like(req, res) {
		try {
			if (req.body.liked) {
				await Post.updateOne({_id: req.body.id}, {
					$addToSet: {likes: req.user}
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
			res.send({success: false, error: "Like added error!"});
		}
	},
	
	async showLikes(req, res) {
		try {
			let post = await Post.find({_id: req.params.id}).populate("likes", "name avatar _id").lean();
			res.send({success: true, post});
		}
		catch(err) {
			res.send({success: false, error: "Show likes error!"});
		}
	}
}