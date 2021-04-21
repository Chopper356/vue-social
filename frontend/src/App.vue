<template>
	<div id="app">
		<router-view/>
	</div>
</template>

<script>
import http from './http';

export default {
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
</style>
