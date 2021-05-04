<template>
	<div class="wrapper">
		<div class="user-info">
			<div class="info">
				<div class="left-block">
					<div class="avatar"><img :src="profile.avatar"></div>
				</div>

				<div class="right-block">
					<div class="top">
						<div class="name">{{ profile.name }}</div>
						<div class="status">#{{ profile.status }}</div>
						<div class="controlls">
							<i v-if="!is_friend && profile._id != $store.state.user._id" class="fas fa-user-plus bg-add" @click="friendAdd"></i>
							<i v-else-if="profile._id != $store.state.user._id" class="fas fa-user-minus bg-delete" @click="friendAdd"></i>
							<i v-if="profile._id != $store.state.user._id" class="fas fa-paper-plane bg-msg"></i>
							<router-link :to="'/profile/edit/' + $store.state.user._id"><i v-if="profile._id == $store.state.user._id" class="fas fa-pencil-alt bg-change"></i></router-link>
						</div>
					</div>

					<div class="about">{{ profile.about_me }}</div>
				</div>
			</div>

		</div>

		<div class="posts-page">
			<div class="title">Posts:</div>

			<div class="post-component">
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
</template>

<script>
export default {
	data: () => ({
		is_friend: false,
		profile: {}
	}),
	mounted() {
		let user_id = this.$route.params.id;
		this.axios.get(`/profile/${user_id}`).then(({data}) => {
			if (data.success) {
				this.profile = data.user;
				
				if (data.user._id != user_id) {
					this.$router.push({ path: `/profile/${data.user._id}` });
				}
			}
		})
	},

	methods: {
		friendAdd() {
			this.axios.post("/profile/friendadd", {id: this.profile._id, add: !this.is_friend}).then(({data}) => {
				if (data.success) {
					this.is_friend = !this.is_friend;
				}
			})
		},
	},

	watch: {
		$route(to, from) {
			if (to.params.id != from.params.id) {
				this.$store.dispatch('openProfile', this.$route.params.id);
			}
		},
		"$store.state.profile"(newVal) {
			if (newVal) {
				if (this.$store.state.is_auth) {
					for(let user of this.profile.friends) {
						(user == this.$store.state.user._id) ? this.is_friend = true: this.is_friend = false;
					}
				}
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
			display: block;
		}

		.info {
			display: flex;
		}

		.left-block {
			margin-right: 20px;

			.activity {
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

				.status {
					flex: 1;
					margin-left: 20px;
					position: relative;
					top: 3px;
					font-size: 15px;
					color: #2980b9;
				}

				.controlls {
					color: white;

					a {
						color: white;
					}

					i {
						padding: 10px;
						border-radius: 5px;
						margin-left: 10px;
						font-size: 14px;
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
	}
</style>