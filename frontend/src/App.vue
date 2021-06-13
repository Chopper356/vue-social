<template>
	<div id="app">
		<Header></Header>

		<transition name="fullscreen">
			<FullscreenImage v-if="$store.state.image_opened"></FullscreenImage>
		</transition>

		<template v-if="checkStorage">
			<router-view :key="$route.path"/>
		</template>
	</div>
</template>

<script>
import http from './http';
import Header from './components/Header';
import FullscreenImage from './components/FullscreenImage';

export default {
	components: {Header, FullscreenImage},
	computed: {
		checkStorage() {
			if (!localStorage.token) return true;

			if (this.$store.state.user.name) return true;

			return false;
		}
	},

	created() {
		if (localStorage.token) {
			http.setToken(localStorage.token);
		}
	}
}
</script>

<style lang="scss">
body {
	margin: 0px;
	padding: 0px;
	font-family: 'Open Sans', sans-serif;
	background-color: #f5f5f5;
	min-width: 1200px;
}

* {
	box-sizing: border-box;
}

input, textarea, button, select {
	font-size: inherit;
	font-family: inherit;
	font-weight: inherit;
	color: inherit;
}

a {
	text-decoration: none;
	color: #2980b9;
}


.fullscreen-enter-active, .fullscreen-leave-active {
	transition: opacity .25s;
}
.fullscreen-enter, .fullscreen-leave-to /* .fade-leave-active до версии 2.1.8 */ {
	opacity: 0;
}

#app {
	padding-bottom: 80px;
}

.wrapper {
	max-width: 1200px;
	margin: auto;
}

@mixin flex () {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.pages-enter-active, .pages-leave-active {
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
	transition: all .5s;
}
.pages-enter, .pages-leave-to {
	left: -100%;
}
</style>
