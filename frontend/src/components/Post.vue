<template>
	<div class="post-component">
		<img class="avatar" :src="post.user.avatar">

		<div class="content">
			<div class="header">
				<div class="user">{{ post.user.name }}</div>
				<div class="time">{{ post.date_create | moment("DD.MM.YYYY — HH:mm") }}</div>

				<i class="far fa-ellipsis-h"></i>
			</div>

			<div class="message" v-html="post.content"></div>
			<img v-if="post.images" class="img-content" :src="post.images">

			<div class="footer">
				<i class="far fa-heart" :class="{'fas': liked}" @click="addLike(post);"></i><span @click="show_users = !show_users">{{ post.likes.length }} <span class="text">Likes</span></span>

				<i class="far fa-comment" @click="showComments(post)"></i> <span @click="showComments(post)">{{ post.comments || 0 }} <span class="text">Reply</span></span>

				<div class="users-liked" :class="{'show-users': show_users}">
					<i class="far fa-times" @click="show_users = !show_users"></i>
					<div class="user-liked" v-for="(user, index) of post.likes" :key="index">
						<img :src="user.avatar">
						<router-link :to="/profile/ + user._id">{{ user.name }}</router-link>
					</div>
				</div>
			</div>
		</div>
	</div>	
</template>

<script>
export default {
	props: ["post"],

	data: () => ({
		liked: false,
		show_users: false
	}),

	created() {
		if (this.$store.state.is_auth) {
			for(let user of this.post.likes) {
				(user._id == this.$store.state.user._id) ? this.liked = true : this.liked = false;
			}
		}
	},

	methods: {
		showComments(post) {
			this.$store.state.post_opened = post;
		},
		addLike(post) {
			this.axios.post("/post/like", {id: post._id, liked: !this.liked}).then(({data}) => {
				if (data.success) {
					this.liked = !this.liked;

					this.$emit("liked", this.liked);
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
			align-items: center;
			justify-content: space-between;
			padding: 0;

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
		}

		.message {
			margin-bottom: 10px;
			font-size: 18px;

			a {
				font-weight: 700;
			}
		}

		.footer {
			position: relative;
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

			span {
				margin-left: 5px;
				user-select: none;
				cursor: pointer;

				.text {
					font-size: 14px;
					margin-left: 0px;
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
				transition: all 0.5s;
				max-height: 0px;
				overflow: hidden;
				position: absolute;
				top: -50px;
				left: 35px;
				z-index: 90;

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
					right: 10px;
					top: 10px;
				}

				&.show-users {
					max-height: 250px;
					overflow: auto;
					padding: 20px 0px;
					border: 1px solid rgba(0, 0, 0, 0.1);
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