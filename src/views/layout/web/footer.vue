<template>
	<footer class="footer fixed">
		<div class="container">
			<ul>
				<li>
					<router-link to="index">微众企业</router-link>
				</li>
				<li>
					<router-link to="index">微众企业</router-link>
				</li>
				<li>
					<router-link to="index">微众企业</router-link>
				</li>
				<li>
					<router-link to="index">微众企业</router-link>
				</li>
				<li>
					<router-link to="index">微众企业</router-link>
				</li>
			</ul>
			<p>
				Copyright © 2017 Booom! Collect from xiaolongjun
			</p>
		</div>
	</footer>
</template>

<script>
	export default {
		name: '',
		data() {
			return {
				is_fixed: ''
			}
		},
		// watch: {
	 //    '$route' (to, from) {
	 //      // this.setFixed();
	 //    }
	 //  },
		// beforeRouteUpdate(to, from, next) {
		// 	this.setFixed();
		// },
		methods: {
			setFixed() {
				let body_height = document.body.scrollHeight;
				let win_height = 0;
				if (window.innerHeight){
					win_height = window.innerHeight;
				}
				else if ((document.body) && (document.body.clientHeight)){
					win_height = document.body.clientHeight;
				}

				this.is_fixed = 'fixed';
				if(body_height > win_height) this.is_fixed = '';
				console.log(this.is_fixed, body_height, win_height, body_height > win_height)
			}
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss">
	.footer{
		color: #fff;
		background: #333;
		text-align: center;
		box-shadow: 0 0 42px 0 rgba(0, 0, 0, 0.8);
    -moz-box-shadow: 0 0 42px 0 rgba(0, 0, 0, 0.8);
    -webkit-box-shadow: 0 0 42px 0 rgba(0, 0, 0, 0.8);
    -o-box-shadow: 0 0 42px 0 rgba(0, 0, 0, 0.8);
		ul{
			padding: 22px 0;
			li{
				display: inline-block;
				vertical-align: top;
				font-size: 14px;
				margin: 5px 10px;
			}
		}
		p{
			font-size: 12px;
			line-height: 20px;
		}
	}
</style>