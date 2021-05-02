<template>
	<div class="wrapper">
		<form class="user-info edit" @submit.prevent="saveProfile">
			<div class="info">
				<div class="left-block">
					<div class="avatar"><img :src="$store.state.user.avatar"></div>
				</div>

				<div class="right-block">
					<div class="top">
						<input class="name" v-model="user.name">
						<input class="status" type="text" v-model="user.status" placeholder="Input your status">
						<button type="submit"><i class="fad fa-save"></i> Save</button>
					</div>

					<textarea class="about" v-model="user.about_me" placeholder="Tell me something about yourself"></textarea>
				</div>
			</div>
		</form>
	</div>
</template>

<script>
export default {
	data: () => ({
		user: {
			name: "",
			about_me: "",
			status: ""
		}
	}),

	created() {
		this.user.name = this.$store.state.user.name;
		this.user.about_me = this.$store.state.user.about_me;
		this.user.status = this.$store.state.user.status;
	},

	methods: {
		saveProfile() {
			this.axios.post(`/profile/edit/${this.$store.state.user._id}`, {user: this.user}).then(({data}) => {
				if (!data.success) {
					this.error = data.error;
				} 
				else {
					this.$store.state.user.name = this.user.name;
					this.$store.state.user.about_me = this.user.about_me;
					this.$store.state.user.status = this.user.status;
					this.$router.push({ path: `/profile/${this.$store.state.user._id}` });
				}
			});
		}
	}
}
</script>

<style lang="scss">
	.user-info.edit {
		textarea {
			width: 100% !important;
			max-width: 100%;
			min-height: 150px;
			max-height: 400px;
			border: 1px solid rgba(0, 0, 0, 0.1);
			border-radius: 5px;
			color: #535858;
			outline: none;
			padding: 10px;
		}

		input {
			border: 1px solid rgba(0, 0, 0, 0.1);
			border-radius: 5px;
			color: #535858;
			outline: none;
			padding: 5px;
			font-size: 18px !important;
		}

		.status {
			flex: 1;
			margin: 0px 15px;
		}

		button {
			padding: 5px 15px;
			border-radius: 5px;
			font-size: 18px;
			cursor: pointer;
			transition: all 0.5s;
			background-color: #27ae60;
			border: 1px solid rgba(0, 0, 0, 0.1);
			color: white;

			&:hover {
				transform: scale(1.2);
			}
		}
	}
</style>