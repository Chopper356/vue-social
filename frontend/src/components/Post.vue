<template>
	<div class="post-component" v-if="post.user">
		<img class="avatar" :src="post.user.avatar">

		<div class="content">
			<div class="header">
				<router-link :to="/profile/ + post.user._id" class="user">{{ post.user.name }}</router-link>
				<router-link :to="'/posts/' + post._id" class="time">{{ post.date_create | moment("DD.MM.YYYY — HH:mm") }}</router-link>

				<i class="far fa-ellipsis-h" @click="options = !options"></i>

				<div class="options" v-if="options">
					
					<template v-if="is_creator">
						<div class="text" @click="replaceTextareaContent();">
							<i class="fal fa-pencil-alt bg-change"></i> Edit
						</div>

						<div class="text" @click="deletePost(post._id)"><i class="fal fa-trash-alt"></i> Delete</div>
					</template>

					<div class="text"><router-link :to="'/posts/' + post._id"><i class="far fa-share-square"></i> Share</router-link></div>
				</div>
			</div>

			<div class="message" v-if="!edit" v-html="post.content"></div>
			<textarea v-else-if="is_creator" v-model="post.content"></textarea>
			<img v-for="(img, index) of post.images" @click="$store.state.image_opened = img.large" class="img-content" :class="{'empty-text': post.content == ''}" :key="index" :src="img.medium">
			
			<div class="footer" v-if="footer" :class="{'edit': edit}">
				<div class="left" v-if="!edit">
					<i class="far fa-heart" :class="{'fas': liked}" @click="addLike(post);"></i>
					<span @click="showLikes(post._id)">
						{{ post.likes.length }}<span class="text">Likes</span>
					</span>

					<template v-if="comments">
						<i class="far fa-comment" @click="showComments(post)"></i> 
						<span @click="showComments(post)">
							{{ post.comments || 0 }} <span class="text right-text">Reply</span>
						</span>
					</template>
				</div>

				<div class="right">
					<!-- <div class="share" v-if="!edit"><i class="fa fa-link"></i> Share</div> -->
					
					<template v-if="edit">
						<button @click="cancelEdit(), edit = false" class="cancel">Cancel</button>
						<button @click="editPost(post._id);" class="save"><i class="fa fa-save"></i> Save</button>
					</template>
				</div>

				<transition name="likes">
					<div class="users-liked" v-if="show_likes && likes.length" :class="{'show-users': show_likes}">
						<i class="far fa-times" @click="show_likes = !show_likes"></i>
						<div class="user-liked" v-for="(user, index) of likes" :key="index">
							<img :src="user.avatar">
							<router-link :to="/profile/ + user._id">{{ user.name }}</router-link>
						</div>
					</div>
				</transition>
			</div>
		</div>
	</div>	
</template>

<script>
import Utils from '../utils';

export default {
	props: {
		post: Object,
		footer: {
			type: Boolean,
			default: true
		},
		comments: {
			type: Boolean,
			default: true
		}
	},

	data: () => ({
		liked: false,
		show_likes: false,
		options: false,
		edit: false,
		editText: null,
		likes: []
	}),

	created() {
		this.likesCheck();	
	},

	computed: {
		is_creator() {
			return this.post.user._id == this.$store.state.user._id;
		}
	},

	methods: {
		deletePost(id) {
			if (confirm("Delete this post?")) {
				this.axios.post(`/posts/${id}/delete`).then(({data}) => {
					if (data.success) {
						this.$emit("delete-post", id);
						this.options = false;
					}
				});
			}
		},

		replaceTextareaContent() {
			this.edit = !this.edit; 
			this.options = false;
			this.post.content = Utils.replaceToN(this.post.content);
		},

		cancelEdit() {
			this.post.content = this.editText;
			this.options = false;
		},

		editPost(id) {
			this.axios.post(`/post/${id}/edit`, {text: this.post.content}).then(({data}) => {
				if (data.success) {
					this.edit = false;
					this.post.content = data.content;
					console.log("Post changed!")
				}
			});
		},

		likesCheck() {
			if (this.$store.state.is_auth) {
				for(let user of this.post.likes) {
					if (user._id == this.$store.state.user._id) {
						this.liked = true;
						break;
					}
					else {
						this.liked = false;
					}
				}
			}
		},

		showLikes(id) {
			this.axios.get(`/posts/${id}/likes`).then(({data}) => {
				if (data.success) {
					this.show_likes = !this.show_likes
					this.likes = data.post[0].likes;
				}
			})
		},

		showComments(post) {
			this.$store.state.post_opened = post;
		},

		addLike(post) {
			this.axios.post("/posts/like", {id: post._id, liked: !this.liked}).then(({data}) => {
				if (data.success) {
					this.liked = !this.liked;

					if (this.liked) {
						this.post.likes.push(this.$store.state.user);
					}
					else {
						let index = this.post.likes.indexOf(this.$store.state.user._id);
						this.post.likes.splice(index, 1);
					}
				}
			})
		}
	}
}
</script>

<style lang="scss">
	.post-component {
		width: 700px;
		margin: auto;
		padding: 25px;
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		flex-wrap: wrap;
		background-color: white;
		box-shadow: 0px 10px 50px rgba(51, 152, 219, 0.2);
		border-radius: 10px;
		margin-bottom: 25px;
		border: 1px solid rgba(0, 0, 0, 0.1);

		i {
			cursor: pointer;
			font-size: 18px;
		}

		.content {
			flex: 1;
		}

		.img-content {
			max-height: 250px;
			max-width: 250px;
			border-radius: 5px;
			margin-bottom: 10px;
			cursor: pointer;
		}

		.empty-text {
			max-width: 100%;
			max-height: 400px;
		}

		.avatar {
			width: 75px;
			height: 75px;
			object-fit: cover;
			border-radius: 5px;
			margin-right: 20px;
		}

		.header {
			box-shadow: none;
			display: flex;
			align-items: baseline;
			justify-content: space-between;
			padding: 0;
			position: relative;

			.time {
				flex: 1;
				margin-left: 20px;
				color: rgba(0, 0, 0, 0.5);
				font-weight: 600;
			}

			.user {
				font-weight: 600;
				color: #535858;
				font-size: 24px;
			}

			.options {
				position: absolute;
				right: 20px;
				top: 15px;
				background-color: white;
				border: 1px solid rgba(0, 0, 0, 0.1);
				box-shadow: 0px 10px 50px rgba(51, 152, 219, 0.2);
				border-radius: 10px 0px 10px 10px;
				z-index: 20;

				.text {
					padding: 8px 15px;
					font-size: 15	px;
					font-weight: 600;
					cursor: pointer;
					transition: all 0.25s;

					&:hover {
						background-color: rgba(0, 0, 0, 0.05);
					}

					i {
						min-width: 25px;
					}
				}
			}
		}

		.message {
			margin-bottom: 10px;
			font-size: 18px;
			word-break: break-word;

			a {
				font-weight: 700;
			}
		}

		textarea {
			max-width: 100%;
			min-width: 100%;
			max-height: 200px;
			min-height: 200px;
			outline: none;
			resize: none;
			border: 1px solid rgba(0, 0, 0, 0.12);
			border-radius: 5px;
			padding: 10px;
			font-size: 20px;
			margin: 7px 0px;
		}

		.footer {
			display: flex;
			justify-content: space-between;
			align-items: center;
			position: relative;
			z-index: 15;
			i {
				opacity: 0.5;
				transition: all 0.5s;
				margin-left: 30px;

				&:first-child {
					margin-left: 0px;
				}
				&:hover {
					opacity: 1;
				}
				&.fas {
					opacity: 1;
					color: #e74c3c;
				}
			}

			&.edit {
				display: block;
			}

			.right {
				display: flex;
				align-items: center;
				justify-content: flex-end;
				font-size: 14px;

				.share {
					cursor: pointer;
					transition: all 0.5s;

					&:hover {
						i {
							opacity: 1;
						}
					}
				}

				button {
					padding: 5px 10px;
					background-color: #3498db;
					color: white;
					border: 1px solid rgba(0, 0, 0, 0.3);
					border-radius: 5px;
					outline: none;
					cursor: pointer;
					font-size: 18px;
					transition: all 0.5s;

					&:hover {
						box-shadow: 0px 10px 30px rgba(51, 152, 219, 0.3);
					}

					i {
						margin-right: 5px;
						opacity: 1;
					}
				}

				.cancel {
					background-color: #e74c3c;
					margin-right: 10px;

					&:hover {
						box-shadow: 0px 10px 30px rgba(231, 76, 60, 0.3);
					}
				}
			}

			span {
				margin-left: 5px;
				user-select: none;
				cursor: pointer;

				.text {
					font-size: 14px;
				}
				.right-text {
					margin-left: 5px;
				}
			}

			.likes-enter-active {
				animation: show-users 0.25s;
			}
			.likes-leave-active {
				animation: show-users 0.25s reverse;
			}

			@keyframes show-users {
				0% {
					opacity: 0;
					transform: scale(0.6);
				}
				100% {
					opacity: 1;
					transform: scale(1);
				}
			}

			.users-liked {
				width: fit-content;
				min-width: 200px;
				max-width: 300px;
				padding: 0px 0px;
				border-radius: 10px;
				background-color: white;
				box-shadow: 0px 10px 50px rgba(51, 152, 219, 0.2);
				border: 1px solid rgba(0, 0, 0, 0.1);
				overflow: hidden;
				position: absolute;
				max-height: 300px;
				top: -50px;
				left: 35px;
				z-index: 90;
				padding: 10px 0px;

				&::-webkit-scrollbar-track {
					border-radius: 10px;
					background-color: #F5F5F5;
				}
				&::-webkit-scrollbar {
					width: 6px;
					background-color: #F5F5F5;
				}
				&::-webkit-scrollbar-thumb {
					border-radius: 10px;
					background-color: rgb(156, 156, 156);
				}

				i {
					position: absolute;
					left: 90%;
					top: 10px;
				}

				&.show-users {
					overflow: auto;
				}

				.user-liked {
					display: flex;
					align-items: center;
					transition: all 0.5s;
					cursor: pointer;
					padding: 10px 20px;

					img {
						margin-right: 20px;
						height: 30px;
						width: 30px;
						border-radius: 5px;
						object-fit: cover;
					}

					&:hover {
						background-color: rgba(0, 0, 0, 0.027);
					}
				}
			}

		}
	}
</style>