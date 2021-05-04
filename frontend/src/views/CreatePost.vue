<template>
	<div class="wrapper">
		<div class="create-post">
			<textarea maxlength="400" placeholder="Do you have some new? :)" v-model="text"></textarea>

			<div class="bottom">
				<span @click="$refs.upload_img.click()" class="upload">
					<input @change="checkSize" type="file" accept=".png, .jpg, .jpeg, .gif" ref="upload_img" hidden>
					<i class="fad fa-upload"></i> Upload image</span>
				<span>{{ text.length }} / 400</span> <button @click="createPost">Submit</button>
			</div>

			<div class="images">
				<span  v-for="(img, index) of images" :key="index">
					<i @click="deleteImg(img)" class="fas fa-times-circle"></i>
					<img :src="img">
				</span>
			</div>

			<div class="error">{{ error }}</div>
		</div>
	</div>	
</template>

<script>
export default {
	data: () => ({
		text: "",
		error: "",
		image_error: null,
		images: []
	}),

	methods: {
		deleteImg(img) {
			let idx = this.images.indexOf(img);
			this.images.splice(idx, 1);
			this.$refs.upload_img.value = "";
		},

		checkSize() {
			this.image_error = this.$refs.upload_img.files[0].size > 5242880;

			
			let file = this.$refs.upload_img.files[0];
			let reader = new FileReader();
			reader.onload = (e) => {
				this.images.push(e.target.result);
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


			this.axios.post("/post/create", formData, { headers: {
				'Content-Type': 'multipart/form-data'
			}}).then(({data}) => {
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
		width: 800px;
		margin: auto;
		margin-top: 70px;

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

		.bottom {
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			align-items: center;
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
		}

		.images {
			margin-top: 20px;
			max-width: 400px;
			display: flex;

			span {
				opacity: 1;
				position: relative;
				display: block;

				i {
					position: absolute;
					top: 5px;
					right: 5px;
					opacity: 0;
					color: #e74c3c;
					z-index: 100;
					font-size: 22px;
					transition: all 0.5s;
					cursor: pointer;

					&:hover {
						transform: scale(1.1);
					}
				}

				&:hover {
					i {
						opacity: 1;
					}
				}
			}

			img {
				height: 120px;
				width: 120px;
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

			&:hover {
				box-shadow: 0px 10px 30px rgba(51, 152, 219, 0.3);
			}
		}
	}
</style>