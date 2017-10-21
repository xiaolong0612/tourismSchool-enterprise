<template>
	<div class="web-wrapper">
		<div class="header-wrapper">
			<web-header class="header-container"></web-header>
		</div>
		<div class="main-wrapper">
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
		min-height: 100%;
	}
	.main-wrapper, .app-main{
		min-height: calc(100vh - 95px);
	}
	.web-wrapper{
		min-height: 100%;
		position: relative;
		overflow: auto;
	}
	.footer-wrapper{
		margin-top: 100px;
	}
</style>