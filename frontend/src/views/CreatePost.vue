<template>
	<div class="wrapper">
		<div class="create-post">
			<textarea maxlength="400" placeholder="Do you have some new? :)" v-model="text"></textarea>

			<div class="bottom">
				<span>{{ text.length }} / 400</span> <button @click="createPost">Submit</button>
			</div>

			<div class="error">{{ error }}</div>
		</div>
	</div>	
</template>

<script>
export default {
	data: () => ({
		text: "",
		error: ""
	}),

	methods: {
		createPost() {
			this.axios.post("/post/create", {text: this.text}).then(({data}) => {
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
			justify-content: flex-end;
			flex-wrap: wrap;
			align-items: center;
			margin-top: 20px;
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