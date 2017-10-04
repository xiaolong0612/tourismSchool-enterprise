<template>
	<div class="web-wrapper">
		<div class="header-wrapper">
			<web-header class="header-container"></web-header>
		</div>
		<div class="main-wrapper pb95">
			<app-main></app-main>
		</div>
		<div class="footer-wrapper">
			<web-footer class="footer-container"></web-footer>
		</div>
	</div>
</template>

<script>
	import { WebHeader, WebFooter, AppMain } from '@/views/layout';
	export default {
    name: 'weblayout',
    components: {
      WebHeader,
      WebFooter,
      AppMain
    }
  }

</script>

<style rel="stylesheet/scss" lang="scss">

	html, body, #app{
		height: 100%;
	}
	.web-wrapper{
		min-height: 100%;
		position: relative;
		overflow: auto;
	}
	.footer-wrapper{
		position: absolute;
  	bottom: 0;
  	left: 0;
  	right: 0;

	}

</style>