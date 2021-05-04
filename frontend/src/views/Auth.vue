<template>
	<div class="auth-page">

		<form class="auth" :class="{hide: mode == 'signin'}" @submit.prevent="signUp">
			<div class="auth-header">
				<a class="swap" @click="mode = 'signin'">Sign In</a>
				<div class="title">Create Account</div>
				<div class="text">or use your email for registration:</div>
			</div>

			<input type="text" v-model="user.name" placeholder="Name">
			<input type="email" v-model="user.email" placeholder="Email">
			<input type="password" v-model="user.password" placeholder="Password">
			<input type="password" v-model="user.password2" placeholder="Repeat your password">

			<button type="submit" :disabled="loading">{{ loading ? "Processing" : "Sign in" }}</button>

			<div class="error" v-if="errorMsg">{{ errorMsg }}</div>
		</form>
		
		<form class="auth signin" :class="{hide: mode == 'signup'}" @submit.prevent="signIn">
			<div class="auth-header">
				<a class="swap" @click="mode = 'signup'">Sign Up</a>
				<div class="title">Sign In</div>
				<div class="text">or use your email for registration:</div>
			</div>

			<input type="email" v-model="user.email" placeholder="Email">
			<input type="password" v-model="user.password" placeholder="Password">

			<button type="submit" :disabled="loading">{{ loading ? "Processing" : "Sign in" }}</button>

			<div class="error" v-if="errorMsg">{{ errorMsg }}</div>
		</form>
	</div>
</template>

<script>
import http from '../http';

export default {
	name: "Auth",
	data: () => ({
		user: {
			name: "",
			email: "",
			password: "",
			password2: ""
		},
		errorMsg: "",
		mode: "signin",
		loading: false
	}),

	created() {
		if (this.$store.state.is_auth) {
			this.$router.push({ path: '/' });
		}
	},

	methods: {
		signUp() {
			if (this.user.password == this.user.password2) {
				this.loading = true;
				this.error = null;
				this.axios.post("/auth/signup", this.user).then(({data}) => {
					if (!data.success) {
						this.errorMsg = data.error;
					} else {
						http.setToken(data.token);
						this.$router.push({ path: '/' });
					}
					this.loading = false;
				});
			} else {
				this.errorMsg = "Password mismatch!";
			}
		},

		signIn() {
			if (this.user.email && this.user.password) {
				this.loading = true;
				this.error = null;
				this.axios.post("/auth/signin", this.user).then(({data}) => {
					if (!data.success) {
						this.errorMsg = data.error;
					} else {
						http.setToken(data.token);
						this.$router.push({ path: '/' });
					}
					this.loading = false;
				});
			} else {
				this.errorMsg = "Invalid password or email!";
			}
		}
	}
}
</script>

<style lang="scss">
.auth-page {
	height: 100vh;
	width: 100%;
	// display: flex;
	// justify-content: center;
	// align-items: center;

	.swap {
		
	}

	.auth {
		width: 400px;
		background-color: white;
		padding: 50px;
		padding-top: 70px;
		border-radius: 15px;
		text-align: center;
		box-shadow: 0px 10px 100px rgba(51, 152, 219, 0.4);
		border: 1px solid rgba(0, 0, 0, 0.1);
		transition: all 0.5s;
		position: fixed;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);

		&.hide {
			left: -150%;
		}

		.swap {
			position: absolute;
			right: 15px;
			top: 15px;
			padding: 8px;
			font-size: 14px;
			border: 1px solid rgba(0, 0, 0, 0.1);
			border-radius: 6px;
			box-shadow: 0px 5px 20px rgba(39, 174, 96, 0.2);
			cursor: pointer;
			color: rgba(39, 174, 96, 1);
			transition: all 0.5s;

			&:hover {
				transform: scale(1.1);
			}
		}

		.title {
			font-size: 40px;
			color: #3498db;
			font-weight: 600;
			margin-bottom: 20px;
		}

		.text {
			font-size: 12px;
			color: #95a5a6;
		}

		input {
			width: 100%;
			padding: 12px 15px;
			background-color: #f5f5f5;
			margin-top: 15px;
			font-size: 16px;
			border-radius: 3px;
			outline: none;
			border: none;
			color: #34495e;
			&::placeholder {
				color: #9b9fa0;
			}
		}

		button {
			margin-top: 25px;
			font-size: 18px;
			background-color: #3498db;
			border: 2px solid rgba(0, 0, 0, 0.05);
			padding: 10px 20px;
			color: white;
			border-radius: 5px;
			transition: all 0.25s;
			cursor: pointer;
			outline: none;

			&:hover {
				background-color: #237ebb;
			}

			&:disabled {
				background-color: #7f8c8d !important;
			}
		}

		.error {
			color: #e74c3c;
			margin-top: 15px;
			font-size: 14px;
		}
	}

	.signin {
		box-shadow: 0px 10px 100px rgba(39, 174, 96, 0.4);

		.swap {
			box-shadow: 0px 5px 20px rgba(51, 152, 219, 0.2);
			color: rgba(51, 152, 219, 1);
		}

		&.hide {
			left: 150%;
		}

		.title {
			color: #2ecc71;
		}

		button {
			background-color: #2ecc71;

			&:hover {
				background-color: #27ae60;
			}
		}
	}
}
</style>