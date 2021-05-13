<template>
	<div class="bg-comments" @click.self="$store.state.post_opened = null">
		<div class="comments">
			<div class="top">
				<div class="title">Comments</div>
				<i class="far fa-times" @click="$store.state.post_opened = null"></i>
			</div>

			<div v-if="comments.length" class="list">
				<div class="comment" v-for="(comment, index) of comments" :key="index">
					<div class="top-comment">
						<router-link :to="/profile/ + comment.user._id"><img :src="comment.user.avatar"></router-link>
						<div class="activity"></div>
						<router-link :to="/profile/ + comment.user._id" class="name">{{ comment.user.name }}</router-link>
						<div class="date">{{ comment.date_create | moment("DD.MM.YYYY — HH:mm") }}</div>
					</div>
					<div class="content-comment">{{ comment.content }}</div>
				</div>
			</div>

			<div v-else class="empty">No comments yet<span>Be the first! 😀</span></div>

			<div class="input-comment">
				<router-link :to="/profile/ + $store.state.user._id" tag="img" :src="$store.state.user.avatar" alt=""></router-link>
				<form @submit.prevent="sendComment()">
					<input type="text" placeholder="Input your comment" maxlength="512" v-model="text" required>
					<button type="submit">Send</button>
				</form>
			</div>

		</div>
	</div>
</template>

<script>
export default {
	data: () => ({
		text: "",
		comments: []
	}),

	computed: {
		post_id() {
			return this.$store.state.post_opened._id;
		}
	},

	methods: {
		getComments() {
			this.axios.get(`/comment/${this.post_id}`).then(({data}) => {
				if (data.success) {
					this.comments = data.comments;
				}
			})
		},

		sendComment() {
			this.axios.post("/comment/create", {text: this.text, post_id: this.$store.state.post_opened._id}).then(({data}) => {
				if (data.success) {
					this.comments.push(data.comment);
					this.$emit("created");

					this.text = "";
				}
			})
		}
	},

	watch: {
		"$store.state.post_opened"(newVal) {
			if (newVal) {
				this.getComments();
			}
		}
	}
}
</script>

<style lang="scss">
	.bg-comments {
			position: fixed;
			top: 0px;
			left: 0px;
			width: 100%;
			height: 100vh;
			background-color: rgba(0, 0, 0, 0.5);
			display: flex;
			align-items: center;
			justify-content: center;
			z-index: 500;
			overflow: hidden;
			transition: all 0.5s;


		.list {
			max-height: 70vh;
			overflow: auto;
		
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
		}

		.empty {
			color: rgba(0, 0, 0, 0.5);
			text-align: center;
			font-weight: 600;
			font-size: 20px;

			span {
				display: block;
				color: #2c3e50;
			}
		}

		.comments {
			background-color: white;
			padding: 25px;
			border-radius: 10px;
			border: 1pc solid 1px rgba(0, 0, 0, 0.1);
			width: 800px;
			overflow: hidden;

			.top {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 25px;

				.title {
					font-size: 30px;
					font-weight: 600;
					color: #2c3e50;
				}

				i {
					font-size: 26px;
					font-weight: 400;
					transition: all 0.5s;
					cursor: pointer;
					opacity: 0.3;

					&:hover {
						opacity: 0.7;
						transform: scale(1.2);
					}
				}
			}

			img {
				height: 30px;
				width: 30px;
				object-fit: cover;
				border-radius: 5px;
			}

			.comment {
				border-bottom: 1px solid rgba(0, 0, 0, 0.1);
				margin-bottom: 10px;
				padding-bottom: 10px;

				&:last-child {
					border-bottom: none;
				}

				.top-comment {
					display: flex;
					align-items: center;
					position: relative;

					.name {
						color: #535858;
						font-size: 20px;
						font-weight: 600;
						margin-left: 12px;
					}

					.date {
						color: #34495e;
						font-size: 14px;
						margin-left: 10px;
						opacity: 0.7;
					}

					.activity {
						background-color: #27ae60;
						border: 1px solid white;
						width: 10px;
						height: 10px;
						border-radius: 50%;
						position: absolute;
						top: 20px;
						left: 24px;
					}

				}
				

				.content-comment {
					margin-top: 5px;
					color: #333;
				}
			}

			.input-comment {
				display: flex;
				align-items: center;
				background-color: #f5f5f5;
				margin: -25px -25px;
				padding: 25px 25px;
				margin-top: 25px;
				position: relative;
				z-index: 200;

				img {
					margin-right: 10px;
					cursor: pointer;
					height: 40px;
					width: 40px;
				}

				form {
					width: 100%;
					display: flex;
					align-items: center;
				}

				input {
					width: 100%;
					margin-right: 20px;
					outline: none;
					border: none;
					border: 1px solid rgba(0, 0, 0, 0.1);
					border-radius: 5px;
					padding: 10px 5px;
					font-size: 16px;
					color: #535858;

					&::placeholder {
						color: #888888;
					} 

				}
				button {
					background-color: #2ecc71;
					border: 1px solid rgba(0, 0, 0, 0.3);
					border-radius: 5px;
					color: white;
					padding: 10px 15px;
					cursor: pointer;
					outline: none;
					transition: all 0.5s;

					&:hover {
						transform: scale(1.1);
					}
				}
			}
		}
	}
</style>