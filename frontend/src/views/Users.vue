<template>
	<div class="wrapper">
		<input @input="search" v-model="text" class="search" type="text" placeholder="Input user name">

		<div class="users">
			<div class="user" v-for="(user, index) of new_users" :key="index">
				<router-link :to="/profile/ + user._id" class="content">
					<img src="https://avatars.githubusercontent.com/u/12010456?v=4" alt="">

					<div class="info">
						<div class="top">
							<span class="name">{{ user.name }}</span>
							<span class="status" :class="{'online': user.user_status}">{{ user.user_status ? "Online" : "Offline" }}</span>
						</div>
						<div class="about">{{ user.about_me }}</div>
					</div>
				</router-link>

				<div class="bottom">
					<i class="fas fa-user-plus bg-add"></i>
					<i class="fas fa-user-minus bg-delete"></i>
					<i class="fas fa-paper-plane bg-msg"></i>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data: () => ({
		new_users: [],
		old_users: [],
		text: null
	}),

	created() {
		this.axios.get("/users").then(({data}) => {
			if (data.success) {
				this.new_users = data.users;
				this.old_users = data.users;
			}
		})
	},

	methods: {
		search() {
			this.new_users = this.old_users;
			this.new_users = this.new_users.filter(item => item.name.indexOf(this.text) !== -1);
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

			.content {
				display: flex;

				.name {
					font-size: 24px;
					color: #535858;
					font-weight: 600;
					margin-right: 10px;
				}

				.status {
					color: #535858;
					font-weight: 600;
					font-size: 18px;
				}

				.online {
					color: #239c55;
				}

				.about {
					font-size: 14px;
					color: #626666;
					position: relative;
					display: -webkit-box;
					-webkit-line-clamp: 3;
					-webkit-box-orient: vertical;
					overflow: hidden;
					text-overflow: ellipsis;
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