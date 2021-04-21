<template>
	<div class="page-404">
		<div class="circle">404</div>
		<div class="title">Not found!</div>
		<div class="line"></div>

		<div class="text">Sorry, we can't find what you're looking for.</div>

		<router-link to="/">Go back home</router-link>
	</div>
</template>

<script>
export default {
	
}
</script>

<style lang="scss">
	.page-404 {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		text-align: center;
		color: #333;

		.circle {
			font-size: 36px;
			color: #e74c3c;
			border: 5px solid #e74c3c;
			border-radius: 50%;
			width: 140px;
			height: 140px;
			display: flex;
			align-items: center;
			justify-content: center;
			font-weight: 600;
			margin: auto;
			margin-bottom: 50px;
			box-shadow: 0px 0px 50px rgba(231, 76, 60, 0.3);
			transition: all 0.5s;

			&:hover {
				transform: scale(1.1);
			}
		}

		.title {
			font-size: 24px;
			margin-bottom: 15px;
		}

		.line {
			width: 40px;
			border-bottom: 2px solid #333;
			margin: auto;
			margin-bottom: 40px;
		}

		.text {
			margin-bottom: 30px;
		}

		a {
			padding: 10px 20px;
			background-color: #3498db;
			color: white;
			text-decoration: none;
			border-radius: 5px;
			border: 1px solid rgba(0, 0, 0, 0.3);
			margin-top: 30px;
			box-shadow: 0px 10px 20px rgba(52, 152, 219, 0.3);
			transition: all 0.5s;

			&:hover {
				background-color: #2f87c2;
			}
		}
	}
</style>