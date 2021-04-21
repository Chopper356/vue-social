<template>
	<div id="app">
		<Header></Header>

		<router-view/>
	</div>
</template>

<script>
import http from './http';
import Header from './components/Header';

export default {
	components: {Header},
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

.wrapper {
	max-width: 1200px;
	margin: auto;
}

@mixin flex () {
	display: flex;
	align-items: center;
	justify-content: space-between;
}
</style>
