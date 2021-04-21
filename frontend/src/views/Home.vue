<template>
	<div class="wrapper home-page">
		<div class="post">
			<img class="avatar" src="https://avatars.githubusercontent.com/u/12010456?v=4">

			<div class="content">
				<div class="header">
					<div class="user">Aboba</div>
					<div class="time">10ч</div>

					<i class="far fa-ellipsis-h"></i>
				</div>

				<div class="message">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad velit repellat, ipsam illum odio nobis vel. Numquam eum sequi alias tempore, deleniti, laudantium eligendi quisquam minus, debitis quibusdam ad dolore.</div>

				<div class="footer">
					<i class="far fa-heart"></i> <span>568</span>
					<!-- <i class="fas fa-heart"></i> -->

					<i class="far fa-comment"></i> <span>34</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	
}
</script>

<style lang="scss">
	.home-page {
		margin-top: 50px;
		.post {
			width: 800px;
			margin: auto;
			padding: 25px;
			margin-top: 20px;
			display: flex;
			justify-content: space-between;
			align-items: flex-start;
			background-color: white;
			box-shadow: 0px 10px 50px rgba(51, 152, 219, 0.2);
			border-radius: 10px;
			border: 1px solid rgba(0, 0, 0, 0.1);

			i {
				cursor: pointer;
				font-size: 18px;
			}

			.avatar {
				width: 75px;
				height: 75px;
				object-fit: cover;
				border-radius: 5px;
				margin-right: 20px;
			}

			.header {
				box-shadow: none;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0;

				.time {
					flex: 1;
					margin-left: 20px;
					color: rgba(0, 0, 0, 0.5);
					font-weight: 600;
				}

				.user {
					font-weight: 600;
					color: #535858;
					font-size: 24px;
				}
			}

			.message {
				margin-bottom: 10px;
				font-size: 18px;
			}

			.footer {
				opacity: 0.5;
				transition: all 0.5s;
				i {
					margin-left: 30px;

					&:first-child {
						margin-left: 0px;
					}
				}

				&:hover {
					opacity: 1;
				}
			}
		}
	}
</style>