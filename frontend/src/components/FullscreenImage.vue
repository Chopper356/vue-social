<template>
	<div class="fullscreen-image" @click.self="$store.state.image_opened = null">
		<div class="content">
			<i  class="fas fa-times-circle" @click="$store.state.image_opened = null"></i>
			<img :src="$store.state.image_opened">
		</div>
	</div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
	.fullscreen-image {
		position: fixed;
		top: 0px;
		left: 0px;
		z-index: 501;
		background-color: rgba(0, 0, 0, 0.4);
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;

		.content {
			position: relative;
			text-align: center;
			max-height: 90vh;
			max-width: 90vw;
			img {
				box-shadow: 0px 10px 50px rgba(51, 152, 219, 0.2);
				border-radius: 10px;
				max-height: 90vh;
				max-width: 90vw;
			}

			i {
				color: #e74c3c;
				font-size: 28px;
				position: absolute;
				right: 10px;
				top: 10px;
				cursor: pointer;
			}
		}
	}
</style>