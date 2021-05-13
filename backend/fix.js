const database = require('./database');
const Post = require('./models/post');

const start = async () => {
	let posts = await Post.find({}).lean();
	
	for(let post of posts) {
		if (post.images) {
			for(let img of post.images) {
				if (typeof(img) == "string") {
					let images = [{
						large: img,
						medium: img
					}];

					await Post.updateOne({_id: post._id}, {images});
				}
			}
		}
	}
}

start();