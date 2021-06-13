<template>
	<div class="wrapper post-page">
		<Post v-if="post" :post="post" :comments="false"></Post>

		<div class="title">Comments:</div>

		<div class="page-comments">
			<Comments :popup="false"></Comments>
		</div>
	</div>
</template>

<script>
import Post from "../components/Post";
import Comments from "../components/Comments";

export default {
	components: {Post, Comments},
	data: () => ({
		post: null
	}),
	mounted() {
		this.axios.get(`/posts/${this.$route.params.id}`).then(({data}) => {
			if (data.success) {
				this.post = data.post;
				this.$store.state.post_opened = this.post;
			}
		})
	},
	beforeDestroy() {
		this.$store.state.post_opened = null;
		console.log(2)
	}
}
</script>

<style lang="scss">
	.post-page {
		.title {
			color: #2c3e50;
			font-size: 30px;
			font-weight: 600;
			margin: 40px 0px;
			text-align: center;
		}

		.page-comments {
			display: flex;
			justify-content: center;
		}
	}
</style>