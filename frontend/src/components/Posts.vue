<template>
	<div class="wrapper posts-page">
		<transition name="showcomments">
			<Comments @created="addComment" v-show="$store.state.post_opened"></Comments>
		</transition>
		<Post @delete-post="deletePost" v-for="post of posts" :key="post._id" :post="post"></Post>

		<div v-if="userid && !posts.length" class="empty-posts">This user has not yet published any posts.</div>

		<div v-if="end" class="end">No more posts</div>

		<div v-if="loading" class="loader">
			<div class="text">
				Loading...
			</div>
		</div>
	</div>
</template>

<script>
import Comments from '../components/Comments.vue';
import Post from '../components/Post';
export default {
	components: {Comments, Post},
	props: ["userid"],

	data: () => ({
		loading: false,
		end: false,
		page: 1,
		posts: [],
	}),

	mounted() {
		this.$store.state.post_opened = null;
		console.log(1)
		this.loadPage();


		window.addEventListener('scroll', () => {
			if (!this.end) {
				if((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight && !this.loading) {
					// console.log(this.posts.length)
					this.loadMore();
				}
			}
		});
	},

	methods: {
		loadMore() {
			this.loading = true;
			this.page++;

			this.loadPage();
		},

		loadPage() {
			this.axios.get(`/posts/${this.userid ? this.userid : "all"}/${this.page}`).then(({data}) => {
				if (data.success) {
					this.loading = false;
					if (!data.posts.length) {
						this.end = true;
						// console.log(this.page)
						return;
					}

					for (let post of data.posts) {
						this.posts.push(post);
					}
				}
			})
		},

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

	.loader {
		margin: auto;
		text-align: center;
		padding: 10px 15px;

		img {
			height: 50px;
		}

		.text {
			font-size: 20px;
			font-weight: 600;
			color: rgba(0, 0, 0, 0.6);
			animation: load 0.5s infinite alternate;
		}
	}

	@keyframes load {
		from {
			opacity: 0.2;
		}

		to {
			opacity: 1;
		}
	}

	.end {
		margin: auto;
		text-align: center;
		font-size: 24px;
		color: #2c3e50;
		opacity: 0.3;
		padding-top: 20px;
	}
</style>