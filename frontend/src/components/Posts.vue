<template>
	<div class="wrapper posts-page">
		<transition name="showcomments">
			<Comments @created="addComment" v-show="$store.state.post_opened"></Comments>
		</transition>
		<Post @delete-post="deletePost" v-for="(post, index) of posts" :key="index" :post="post"></Post>
	</div>
</template>

<script>
import Comments from '../components/Comments.vue';
import Post from '../components/Post';
export default {
	components: {Comments, Post},
	props: ["userid"],

	data: () => ({
		posts: []
	}),

	mounted() {
		this.$store.state.post_opened = null;
		this.axios.get(`/post/${this.userid ? this.userid : "all"}`).then(({data}) => {
			if (data.success) {
				this.posts = data.posts;
			}
		})
	},

	methods: {
		addComment() {
			for(let post of this.posts) {
				if (post._id == this.$store.state.post_opened._id) {
					post.comments += 1;
				}
			}
		},
		deletePost(id) {
			let idx = this.posts.findIndex(post => post._id == id);
			this.posts.splice(idx, 1);
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

	.showcomments-enter-active, .showcomments-leave-active {
		transition: opacity .25s;
	}
	.showcomments-enter, .showcomments-leave-to {
		opacity: 0;
	}
</style>