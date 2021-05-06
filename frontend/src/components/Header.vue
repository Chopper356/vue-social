<template>
	<div class="header">
		<div class="wrapper">
			<router-link to="/" class="logo">TypeCode</router-link>
		
			<div class="menu">
				<router-link to="/">Home</router-link>
				<router-link to="/users">Users</router-link>
			</div>

			<div class="profile">
				<template v-if="$store.state.is_auth">
					<div class="user">
						<router-link to="/create" class="create"><i class="fas fa-plus"></i> <span>Create post</span></router-link>
						<router-link tag="img" :to="/profile/ + $store.state.user._id" :src="$store.state.user.avatar"></router-link>
						<router-link :to="/profile/ + $store.state.user._id" class="name">{{ $store.state.user.name }}</router-link>
					</div>

					<button @click="signOut">Sign out</button>
				</template>
				<button class="signin" v-else @click="signIn">Sign in</button>
			</div>
		</div>
	</div>
</template>

<script>
import http from '../http';

export default {
	data: () => ({
		name: "",
	}),

	created() {
		
	},

	methods: {
		signOut() {
			http.signOut();
		},
		signIn() {
			this.$router.push({ path: '/auth' });
		}
	}
}
</script>

<style lang="scss">
	#app > .header {
		padding: 15px 10px;
		box-shadow: 0px 0px 30px rgba(75, 102, 121, 0.2);
		color: #333;
		background-color: white;
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		margin-bottom: 70px;
		position: sticky;
		top: 0px;
		z-index: 499;
		
		.wrapper {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.logo {
				font-size: 32px;
				color: #2980b9;
				font-weight: 700;
				// transition: 0.5s;

				// &:hover {
				// 	filter: drop-shadow(0px 5px 15px #297fb9c9);
				// }
			}

			.menu {
				flex: 1;
				margin-left: 50px;

				a {
					margin-left: 30px;
					font-size: 20px;
					transition: all 0.5s;
					cursor: pointer;
					color: #333;

					&:hover {
						color: #2980b9;
					}
				}
			}

			.profile {
				display: flex;
				align-items: center;
				justify-content: space-between;

				.user {
					display: flex;
					align-items: center;
					justify-content: space-between;

					img {
						width: 45px;
						height: 45px;
						border-radius: 5px;
						margin-right: 15px;
						transition: all 0.5s;
						cursor: pointer;
						object-fit: cover;

						&:hover {
							transform: scale(1.1);
						}
					}

					.name {
						font-size: 18px;
						margin-right: 25px;
						font-weight: 600;
						cursor: pointer;
					}

					.create {
						padding: 5px 10px;
						background-color: #27ae60;
						color: white;
						margin-right: 25px;
						display: flex;
						align-items: center;
						border-radius: 5px;
						cursor: pointer;

						span {
							max-width: 0px;
							display: inline-block;
							overflow: hidden;
							white-space: nowrap;
							transition: all 0.5s;
						}

						&:hover span {
							max-width: 100px;
							margin-left: 10px;
						}
						
					}
				}

				button {
					background-color: #e74c3c;
					border: 1px solid rgba(0, 0, 0, 0.3);
					border-radius: 5px;
					color: white;
					padding: 5px 10px;
					cursor: pointer;
					outline: none;
					transition: all 0.5s;

					&:hover {
						box-shadow: 0px 5px 15px rgba(201, 69, 55, 0.4);
					}
				}

				.signin {
					background-color: #2ecc71;

					&:hover {
						box-shadow: 0px 5px 15px rgba(46, 204, 113, 0.4);
					}
				}
			}
		}
	}
</style>