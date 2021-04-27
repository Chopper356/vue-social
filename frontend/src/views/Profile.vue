<template>
	<div class="wrapper">
		<div class="user-info">
			<div class="info">
				<div class="left-block">
					<div class="avatar"><img :src="$store.state.profile.avatar"></div>
					<div class="status" :class="{'online': $store.state.profile.user_status}">{{ $store.state.profile.user_status ? "Online" : "Offline" }}</div>
				</div>

				<div class="right-block">
					<div class="top">
						<div class="name">{{ $store.state.profile.name }}</div>
						<div class="controlls">
							<i class="fas fa-user-plus bg-add"></i>
							<i class="fas fa-user-minus bg-delete"></i>
							<i class="fas fa-paper-plane bg-msg"></i>
							<i class="fas fa-pencil-alt bg-change"></i>
						</div>
					</div>

					<div class="about">{{ $store.state.profile.about_me }}</div>
				</div>
			</div>

			<div class="users-comments">
				<div class="title">Comments:</div>

				<div class="comment">
					<img class="avatar" src="https://avatars.githubusercontent.com/u/12010456?v=4">

					<div class="content">
						<div class="header">
							<router-link to="/profile/608207ef2089182fd82c65b2" class="user">Chrom</router-link>
							<div class="time">10ч</div>

							<i class="far fa-ellipsis-h"></i>
						</div>

						<div class="message">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa officiis quasi quia at tempore, expedita quo mollitia facilis assumenda, placeat excepturi. Dolorem, voluptatibus laborum impedit sunt tenetur eius et eveniet.</div>

						<div class="footer">
							<i class="far fa-heart"></i> <span>568</span>
							<!-- <i class="fas fa-heart"></i> -->

							<i class="far fa-comment"></i> <span>34</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>	
</template>

<script>
export default {
	data: () => ({
	}),
	created() {
		console.log("qweqweqwe")
		this.$store.dispatch('openProfile', this.$route.params.id);
	},

	watch: {
		$route(to, from) {
			if (to.params.id != from.params.id) {
				this.$store.dispatch('openProfile', this.$route.params.id);
			}
		}
	}
}
</script>

<style lang="scss">
	.user-info {
		width: 800px;
		margin: auto;
		background-color: white;
		border-radius: 10px;
		padding: 20px;
		border: 1px solid rgba(0, 0, 0, 0.1);
		box-shadow: 0px 10px 50px rgba(51, 152, 219, 0.2);

		img {
			height: 120px;
			width: 120px;
			object-fit: cover;
			border-radius: 5px;
		}

		.info {
			display: flex;
		}

		.left-block {
			margin-right: 20px;

			.status {
				color: #535858;
				font-weight: 600;
				font-size: 18px;
			}

			.online {
				color: #239c55;
			}
		}

		.right-block {
			width: 100%;
			.top {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.name {
					font-size: 24px;
					color: #535858;
					font-weight: 600;
				}

				.controlls {
					color: white;

					i {
						padding: 5px;
						border-radius: 5px;
						margin-left: 10px;
						cursor: pointer;
						transition: all 0.5s;

						&:hover {
							transform: scale(1.2);
						}
					}

					.bg-msg {
						background-color: #3498db;
						
						&:hover {
							box-shadow: 0px 5px 20px rgba(52, 152, 219, 0.3);
						}
					}
					.bg-add {
						background-color: #27ae60;
						
						&:hover {
							box-shadow: 0px 5px 20px rgba(39, 174, 96, 0.3);
						}
					}
					.bg-delete {
						background-color: #e74c3c;
						
						&:hover {
							box-shadow: 0px 5px 20px rgba(231, 76, 60, 0.3);
						}
					}
					.bg-change {
						background-color: #2c3e50;
						
						&:hover {
							box-shadow: 0px 5px 20px rgba(44, 62, 80, 0.3);
						}
					}
				}
			}

			.about {
				font-size: 18px;
				margin-top: 10px;
			}
		}

		.users-comments {
			width: 100%;
			margin-top: 40px;
			opacity: 0.5;
			transition: all 0.5s;

			&:hover {
				opacity: 1;
			}

			.title {
				font-size: 26px;
				color: #2c3e50;
				text-align: center;
				font-weight: 600;
			}

			.comment {
				display: flex;
				justify-content: space-between;
				align-items: flex-start;
				margin-bottom: 25px;
				margin-top: 20px;

				i {
					cursor: pointer;
					font-size: 18px;
				}

				.content {
					flex: 1;
				}

				.avatar {
					width: 60px;
					height: 60px;
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
						font-size: 18px;
					}
				}

				.message {
					margin-bottom: 10px;
					font-size: 16px;

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
		}
	}
</style>