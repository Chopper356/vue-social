<template>
	<div class="wrapper">
		<form class="user-info edit" @submit.prevent="saveProfile">
			<div class="info">
				<div class="left-block">
					<div class="avatar"><img :src="user.avatar"><div v-show="image_error" class="img-err">Avatar size <br> > 5MB</div></div>
					<div class="upload" @click="$refs.upload_input.click()">
						<input @change="checkSize" type="file" accept=".png, .jpg, .jpeg, .gif" hidden ref="upload_input">
						<i class="fad fa-upload"></i>
						<span>Avatar</span>
					</div>
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
			status: "",
			avatar: ""
		},
		image_error: false
	}),

	created() {
		this.checkUserData()
	},

	methods: {
		checkUserData() {
			this.user.name = this.$store.state.user.name;
			this.user.about_me = this.$store.state.user.about_me || "";
			this.user.about_me = this.user.about_me.replace(/<br>/gi, "\n");
			this.user.status = this.$store.state.user.status || "";
			this.user.avatar = this.$store.state.user.avatar;
		},
		checkSize() {
			this.image_error = this.$refs.upload_input.files[0].size > 5242880;

			if (!this.image_error) {
				let file = this.$refs.upload_input.files[0];
				let reader = new FileReader();
				reader.onload = (e) => {
					this.user.avatar = e.target.result;
				};
				reader.readAsDataURL(file);
			}
		},

		saveProfile() {
			let formData = new FormData();
			let file = this.$refs.upload_input.files[0];
			if (file && !this.image_error) {
				formData.append("avatar", file);
			}
			formData.append("name", this.user.name);
			formData.append("about_me", this.user.about_me);
			formData.append("status", this.user.status);

			this.axios.post(`/profile/edit/${this.$store.state.user._id}`, formData, { headers: {
				'Content-Type': 'multipart/form-data'
			}}).then(({data}) => {
				if (!data.success) {
					this.error = data.error;
				} 
				else {
					this.$store.state.user.name = this.user.name;
					this.$store.state.user.about_me = this.user.about_me;
					this.$store.state.user.status = this.user.status;
					this.$store.state.user.avatar = this.user.avatar;
					this.$router.push({ path: `/profile/${this.$store.state.user._id}` });
				}
			});
		}
	}
}
</script>

<style lang="scss">
	.user-info.edit {

		.left-block {
			position: relative;

			.avatar {
				position: relative;
				.img-err {
					position: absolute;
					height: 100%;
					width: 100%;
					background-color: rgba(231, 76, 60, 0.8);
					border-radius: 5px;
					display: flex;
					align-items: center;
					justify-content: center;
					text-align: center;
					top: 0px;
					left: 0px;
					color: white;
					font-size: 18px;

					span {
						font-weight: 600;
					}
				}
			}

			.upload {
				font-size: 18px;
				background-color: #2980b9;
				color: white;
				border-radius: 5px;
				cursor: pointer;
				display: flex;
				align-items: center;
				justify-content: center;
				transition: all 0.5s;
				padding: 5px 10px;
				margin-top: 15px;

				span {
					margin-left: 5px;
				}

			}
		}

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
			top: 0px !important;
		}

		.status {
			flex: 1;
			margin: 0px 15px;
			margin-left: 15px !important;
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