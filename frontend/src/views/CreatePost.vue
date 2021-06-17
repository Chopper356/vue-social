<template>
	<div class="wrapper">
		<div class="create-post">
			<!-- <transition name="create"> -->
				<textarea v-if="!preview.show" maxlength="400" placeholder="Do you have some new? :)" v-model="text" @input="previewText"></textarea>
				<Post v-else class="createdPost" :post="preview" :footer="false"></Post>
			<!-- </transition> -->

			<div class="bottom">
				<span @click="$refs.upload_img.click()" class="upload">
					<input @change="checkSize" type="file" accept=".png, .jpg, .jpeg, .gif" ref="upload_img" hidden>
					<template v-if="!preview.images">
						<i class="fad fa-upload"></i> Upload image
					</template>

					<div v-else class="images">
						<i @click.stop="deleteImg" class="fas fa-times-circle"></i>
						<img :src="preview.images">
					</div>
				</span>

				<div class="right">
					<span class="check" @click="preview.show = !preview.show">
						<i v-if="preview.show" class="far fa-check-square"></i>
						<i v-else class="far fa-square"></i>
						Preview
					</span>
					<span>{{ preview.content.length }} / 400</span> 
					<button @click="createPost" :disabled="upload">Submit</button>
				</div>
			</div>

			<div class="error">{{ error }}</div>
		</div>
	</div>	
</template>

<script>
import Post from "../components/Post";
export default {
	components: {Post},
	data() {
		return {
			error: "",
			text: "",
			image_error: null,
			checkPreview: false,
			upload: false,
			preview: {
				date_create: new Date(),
				content: "",
				images: "",
				show: false,
				user: {
					name: this.$store.state.user.name,
					avatar: this.$store.state.user.avatar
				}
	
			} 
		}
	},

	methods: {
		deleteImg() {
			// let idx = this.images.indexOf(img);
			// this.images.splice(idx, 1);
			this.preview.images = null;
			this.$refs.upload_img.value = "";
		},

		previewText() {
			this.preview.content = this.text.replace(/\n{2,}/gi, "<br><br>");
			this.preview.content = this.preview.content.replace(/\n/, "<br>");
		},

		checkSize() {
			this.image_error = this.$refs.upload_img.files[0].size > 5242880;

			
			let file = this.$refs.upload_img.files[0];
			let reader = new FileReader();
			reader.onload = (e) => {
				this.preview.images = e.target.result;
			};
			reader.readAsDataURL(file);
		},

		createPost() {
			let formData = new FormData();
			let file = this.$refs.upload_img.files[0];

			if (file && !this.image_error) {
				formData.append("image", file);
			}
			formData.append("text", this.text);


			this.upload = true;
			this.axios.post("/posts/create", formData, { headers: {
				'Content-Type': 'multipart/form-data'
			}}).then(({data}) => {
				this.upload = false;
				if (!data.success) {
					this.error = data.error;
				} 
				else {
					this.$router.push({ path: '/' });
				}
			});
		}
	}
}
</script>
<style lang="scss">
	.create-post {
		width: 700px;
		margin: auto;
		margin-top: 70px;

		.error {
			color: #e74c3c;
			text-align: center;
			font-size: 20px;
			margin-top: 20px;
		}

		textarea {
			max-width: 100%;
			min-width: 100%;
			max-height: 200px;
			min-height: 200px;
			outline: none;
			resize: none;
			border: 1px solid rgba(0, 0, 0, 0.12);
			box-shadow: 0px 10px 50px rgba(51, 152, 219, 0.2);
			border-radius: 5px;
			padding: 25px;
			font-size: 20px;
		}

		.create-enter-active, .create-leave-active {
			transition: opacity .25s;
		}
		.create-enter, .create-leave-to /* .fade-leave-active до версии 2.1.8 */ {
			opacity: 0;
		}

		& > .title {
			color: #2c3e50;
			font-size: 30px;
			text-align: center;
			margin: 30px 0px;
			font-weight: 600;
		}

		.bottom {
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			align-items: flex-start;
			margin-top: 20px;
			position: relative;

			.upload {
				cursor: pointer;
				transition: all 0.5s;
				flex: 1;
				&:hover {
					opacity: 1;
				}
				i {
					color: #3498db;
				}
			}

			.right {
				.check {
					transition: all 0.5s;
					cursor: pointer;
					&:hover {
						opacity: 1;
					}
				}
			}
		}

		.images {
			width: fit-content;
			display: flex;
			position: relative;

			&:hover {
				i {
					opacity: 1;
				}
			}

			i {
				position: absolute;
				top: 5px;
				right: 5px;
				opacity: 0;
				color: #e74c3c !important;
				z-index: 100;
				font-size: 22px;
				transition: all 0.5s;
				cursor: pointer;

				&:hover {
					transform: scale(1.1);
				}
			}

			img {
				height: 80px;
				width: 80px;
				border-radius: 5px;
				transition: all 0.5s;
				object-fit: cover;

				&:hover {
					transform: scale(1.1);
				}
			}
		}

		span {
			margin-right: 15px;
			opacity: 0.5;
		}

		button {
			padding: 10px 15px;
			background-color: #3498db;
			color: white;
			border: 1px solid rgba(0, 0, 0, 0.3);
			border-radius: 5px;
			outline: none;
			cursor: pointer;
			font-size: 18px;
			transition: all 0.5s;

			&:disabled {
				background-color: #7e7e7e;
				cursor: default;
			}

			&:hover {
				box-shadow: 0px 10px 30px rgba(51, 152, 219, 0.3);
			}
		}
	}

	.createdPost {
		margin-top: 20px;
	}

	.preview-post {
		width: 800px;
		margin: auto;
		margin-top: 40px;

		.post {
			margin: auto;
			padding: 25px;
			display: flex;
			justify-content: space-between;
			align-items: flex-start;
			flex-wrap: wrap;
			box-shadow: 0px 10px 50px rgba(51, 152, 219, 0.2);
			border-radius: 10px;
			margin-bottom: 25px;
			border: 1px solid rgba(0, 0, 0, 0.1);
		}

		.title {
			color: #2c3e50;
			font-size: 30px;
			text-align: center;
			margin: 30px 0px;
			font-weight: 600;
		}

		span {
			font-size: 16px;
			color: #7e7e7e;
		}
		.text {
			font-size: 18px;
			margin-bottom: 10px;

		}

		img {
			max-height: 250px;
			max-width: 250px;
			border-radius: 5px;
			margin-bottom: 10px;
		}
	}
</style>