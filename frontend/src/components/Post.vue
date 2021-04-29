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

			<div class="footer">
				<i class="far fa-heart"></i> <span>568</span>
				<!-- <i class="fas fa-heart"></i> -->

				<i class="far fa-comment" @click="showComments(post)"></i> <span>{{ post.comments || 0 }}</span>
			</div>
		</div>
	</div>	
</template>

<script>
export default {
	props: ["post"],

	methods: {
		showComments(post) {
			this.$store.state.post_opened = post;
		}
	}
}
</script>

<style lang="scss">
	.post-component {
		width: 800px;
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
			opacity: 0.5;
			transition: all 0.5s;
			i {
				margin-left: 30px;

				&:first-child {
					margin-left: 0px;
				}
			}

			&:hover {
				opacity: 1;
			}
		}
	}
</style>