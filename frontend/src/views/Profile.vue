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
						<div v-if="profile.status" class="status">#{{ profile.status }}</div>
						<div class="controlls">
							<template v-if="profile._id != $store.state.user._id">
								<i v-if="!profile.is_friend" class="fas fa-user-plus bg-add" @click="friendAdd(profile)"></i>
								<i v-else class="fas fa-user-minus bg-delete" @click="friendAdd(profile)"></i>
								<!-- <i class="fas fa-paper-plane bg-msg"></i> -->
							</template>
							<router-link :to="'/profile/edit/' + $store.state.user._id"><i v-if="profile._id == $store.state.user._id" class="fas fa-pencil-alt bg-change"></i></router-link>
						</div>
					</div>

					<div class="about" v-html="profile.about_me"></div>
				</div>
			</div>

		</div>

		<div class="profile-title">Posts:</div>

		<Posts v-if="posts.length" :userid="$route.params.id"></Posts>

		<div v-else class="empty-posts">This user has not yet published any posts.</div>

	</div>	
</template>

<script>
import Posts from "../components/Posts";

export default {
	components: {Posts},
	data: () => ({
		is_friend: false,
		profile: {},
		posts: []
	}),
	mounted() {
		this.routeProfile();
	},

	methods: {
		routeProfile() {
			let user_id = this.$route.params.id;
			this.axios.get(`/profile/${user_id}`).then(({data}) => {
				if (data.success) {
					data.user.is_friend = false;
					this.profile = data.user;
					this.posts = data.posts;
					this.checkFriends();
					
					if (data.user._id != user_id) {
						this.$router.push({ path: `/profile/${data.user._id}` });
					}
				}
			})
		},

		checkFriends() {
			let user = this.$store.state.user;

			if (user.friends.includes(this.profile._id)) {
				this.profile.is_friend = true;
			}
			else {
				this.profile.is_friend = false;
			}
		},

		friendAdd(user) {
			this.axios.post("/profile/friendadd", {id: this.profile._id, add: !this.profile.is_friend}).then(({data}) => {
				if (data.success) {
					this.profile.is_friend = !this.profile.is_friend;
					console.log(this.profile.is_friend)

					if (user.is_friend) {
						this.$store.state.user.friends.push(user._id);
					}
					else {
						let idx = this.$store.state.user.friends.indexOf(user._id);
						this.$store.state.user.friends.splice(idx, 1);
					}
				}
			})
		},
	},

	watch: {
		$route(to, from) {
			if (to.params.id != from.params.id) {
				this.routeProfile();
			}
		}
	}
}
</script>

<style lang="scss">
	.profile-title {
		color: #2c3e50;
		font-size: 30px;
		font-weight: 600;
		margin: 40px 0px;
		text-align: center;
	}

	.empty-posts {
		text-align: center;
		padding: 20px;
		background-color: white;
		border-radius: 10px;
		border: 1px solid rgba(0, 0, 0, 0.1);
		box-shadow: 0px 10px 50px rgba(51, 152, 219, 0.2);
		width: 800px;
		margin: auto;
		font-size: 18px;
		color: #7a7a7a;
	}

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