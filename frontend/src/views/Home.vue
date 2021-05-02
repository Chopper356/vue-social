<template>
	<div class="wrapper posts-page">
		<Comments @created="addComment" v-show="$store.state.post_opened"></Comments>
		<Post @liked="liked(post, $event)" v-for="(post, index) of posts" :key="index" :post="post"></Post>
	</div>
</template>

<script>
import Comments from '../components/Comments.vue';
import Post from '../components/Post';
export default {
	components: {Comments, Post},

	data: () => ({
		posts: []
	}),

	created() {
		this.$store.state.post_opened = null;
		this.axios.get("/post/all").then(({data}) => {
			if (data.success) {
				this.posts = data.posts;
			}
		})
	},

	methods: {
		liked(post, liked) {
			console.log(post)
			if (liked) {
				post.likes.push(this.$store.state.user);
			}
			else {
				let index = post.likes.indexOf(this.$store.state.user._id);
				post.likes.splice(index, 1);
			}
		},

		addComment() {
			for(let post of this.posts) {
				if (post._id == this.$store.state.post_opened._id) {
					post.comments += 1;
				}
			}
		}
	}
}
</script>

<style lang="scss">
	.show-comments {
		display: flex;
		opacity: 1;
	}

	.posts-page {
		& > .title {
			color: #2c3e50;
			font-size: 30px;
			text-align: center;
			margin: 30px 0px;
			font-weight: 600;
		}
	}
</style>