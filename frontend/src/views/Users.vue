<template>
	<div class="wrapper">
		<input v-model="search" class="search" type="text" placeholder="Input user name">

		<div class="users">
			<div class="user" v-for="(user, index) of filteredUsers" :key="index">
				<router-link :to="/profile/ + user._id" class="content">
					<img :src="user.avatar" alt="">

					<div class="info">
						<div class="name" :title="user.name">{{ user.name }}</div>
						<div class="status" v-if="user.status">#{{ user.status }}</div>
						<div class="about" v-else>The user's mood is still unknown <i class="fad fa-user-secret"></i></div>
					</div>
				</router-link>

				<div class="bottom">
					<template v-if="$store.state.user._id != user._id">
						<i v-if="!user.is_friend" class="fas fa-user-plus bg-add" @click="friendAdd(user)"></i>
						<i v-else class="fas fa-user-minus bg-delete" @click="friendAdd(user)"></i>
						<!-- <i class="fas fa-paper-plane bg-msg"></i> -->
					</template>
					<div v-else class="you">It's you!</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data: () => ({
		users: [],
		search: ""
	}),

	created() {
		this.axios.get("/users").then(({data}) => {
			if (data.success) {
				data.users.forEach(u => u.is_friend = false);
				this.users = data.users;
				this.checkFriends();
			}
		})

	},

	computed: {
		filteredUsers() {
			if (this.search) {
				return this.users.filter(item => item.name.indexOf(this.search) !== -1);
			}
			else {
				return this.users;
			}
		}
	},

	methods: {
		checkFriends() {
			if (this.$store.state.is_auth && this.users) {
				for(let user of this.users) {
					(this.$store.state.user.friends.includes(user._id)) ? user.is_friend = true : user.is_friend = false;
				}
			}
		},

		friendAdd(user) {
			this.axios.post("/profile/friendadd", {id: user._id, add: !user.is_friend}).then(({data}) => {
				if (data.success) {
					user.is_friend = !user.is_friend;

					if (user.is_friend) {
						this.$store.state.user.friends.push(user._id);
					}
					else {
						let idx = this.$store.state.user.friends.indexOf(user._id);
						this.$store.state.user.friends.splice(idx, 1);
					}
				}
			})
		}
	}
}
</script>

<style lang="scss">
	.search {
		outline: none;
		border: 1px solid rgba(0, 0, 0, 0.1);
		padding: 10px;
		font-size: 18px;
		color: #2c3e50;
		box-shadow: 0px 10px 50px rgba(44, 62, 80, 0.2);
		border-radius: 5px;
		width: 400px;
		transition: all 0.5s;
		display: block;
		margin: auto;

		&:focus {
			transform: scale(1.05);
		}
	}

	.users {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		.user {
			width: 350px;
			background-color: white;
			padding: 20px;
			box-shadow: 0px 10px 50px rgba(51, 152, 219, 0.2);
			border: 1px solid rgba(0, 0, 0, 0.1);
			border-radius: 10px;
			margin: auto;
			margin-top: 30px;
			transition: all 0.5s;

			&:hover {
				transform: scale(1.1);
			}

			img {
				height: 75px;
				width: 75px;
				object-fit: cover;
				border-radius: 5px;
				margin-right: 20px;
			}

			.info {
				flex-shrink: 0;
				text-overflow: ellipsis;
				overflow: hidden;
				max-width: 69%;

				.name {
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
				}
			}

			.content {
				display: flex;

				.name {
					font-size: 22px;
					color: #535858;
					font-weight: 600;
					margin-right: 10px;
					// max-width: 100px;
					// text-overflow: ellipsis;
					// overflow: hidden;
					// white-space: nowrap;
					// display: block;

					
				}

				.activity {
					color: #535858;
					font-weight: 600;
					font-size: 18px;
				}

				.online {
					color: #239c55;
				}

				.about {
					font-size: 14px;
					color: #5a5a5a;
					position: relative;
					display: -webkit-box;
					-webkit-line-clamp: 3;
					-webkit-box-orient: vertical;
					overflow: hidden;
					text-overflow: ellipsis;

					i {
						font-size: 18px;
					}
				}
			}

			.bottom {
				color: white;
				display: flex;
				align-items: center;
				justify-content: flex-end;
				padding-top: 20px;

				i {
					padding: 10px;
					font-size: 14px;
					border-radius: 5px;
					margin-left: 10px;
					cursor: pointer;
					transition: all 0.5s;

					&:hover {
						transform: scale(1.2);
					}
				}

				.you {
					font-size: 18px;
					color: #535858;
					opacity: 0.6;
					padding: 5px 0px;
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
	}
</style>