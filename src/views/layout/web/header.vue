<template>
	<header class="header">
		<div class="container">
			<div class="navber-header pull-left clearfix">
				<el-button class="pull-right navbar-toggle" type="primary" icon="menu"></el-button>
				<router-link to="index" class="logo">旅游校企</router-link>
			</div>
			<div class="navbar-collapse">
				<el-menu :default-active="activeIndex" class="pull-right" mode="horizontal" @select="handleSelect">
				  <el-menu-item index="0" :open="ToggleHeader">切换企业版</el-menu-item>
				  <el-menu-item :router="true" :index="item.link" v-for="item in link_list" :key="item.name" v-if="item.children == undefined">
				  	{{item.name}}
				  	<router-link :to='item.link'>	</router-link>
				  </el-menu-item>

				  <el-submenu :index="item.name" v-for="item in link_list" :key="item.name" v-if="item.children != undefined">
				    <template slot="title">
				    	{{item.name}}
				    	<router-link :to='item.link'>	</router-link>
				    </template>
				    <el-menu-item :index="item.name+'-'+children.name" v-for="children in item.children" :key="item.name">
				    	{{children.name}}
				    	<router-link :to='children.link'></router-link>
				    </el-menu-item>
				  </el-submenu>
				  <el-menu-item index="5">登陆／登出</el-menu-item>
				</el-menu>
				<!-- <ul class="pull-right navbar-nav">
					<li>
						<router-link to='index'>切换企业版</router-link>
					</li>
					<li v-for="item in link_list">
						<router-link :to='item.link'>item.name</router-link>
					</li>
					<li>
						<router-link to='/resume/details'>
							<el-badge is-dot class="item">我的简历</el-badge>
						</router-link>
					</li>
					<li>
						<router-link to='index'>投递箱</router-link>
					</li>
					<li>
						<router-link to='index'>收藏夹</router-link>
					</li>
					<li>
						<router-link to='index'>登陆／登出</router-link>
					</li>
				</ul> -->
			</div>
		</div>
	</header>
</template>
<script>
  import { mapGetters } from 'vuex';
	export default {
		computed: {
	    ...mapGetters([
	      'header'
	    ])
	  },
		data() {
			return{
				link_list: [
					{
						name: '首页',
						link: '/'
					},{
						name: '我的简历',
						link: '/user/resume/list',
						children: [
							{
								name: '导游',
								link: '/user/resume/details'
							},{
								name: '会计',
								link: '/user/resume/details'
							}
						]
					},{
						name: '投递箱',
						link: '/user/delivery'
					},{
						name: '收藏夹',
						link: '/user/collect/list'
					}
				],
				activeIndex: '1'
			}
		},
		watch: {
  		'$route' (to, from) {
  			// console.log(to, from);
		  }
		},
		methods: {
			ToggleHeader() {
				console.log(12312)
        this.$store.dispatch('ToggleHeader')
      },
			handleSelect(){

			}
		}
	}
</script>
<style rel="stylesheet/scss" lang="scss">
	.header{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 9;
    background: #ffffff;
    background: rgba(255, 255, 255, 0.6);
    min-height: 60px;
    line-height: 65px;
    margin-bottom: 0;
    width: 100%;
    box-shadow: 0 0 42px 0 rgba(0, 0, 0, 0.08);
    -moz-box-shadow: 0 0 42px 0 rgba(0, 0, 0, 0.08);
    -webkit-box-shadow: 0 0 42px 0 rgba(0, 0, 0, 0.08);
    -o-box-shadow: 0 0 42px 0 rgba(0, 0, 0, 0.08);
    border: 0;
    webkit-transition: all 0.3s ease-in-out;
    -webkit-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
    .logo{
	    display: block;
	    font-family: "Raleway", sans-serif;
	    text-transform: uppercase;
	    font-weight: 600;
	    height: 100%;
	    color: #000000;
		}
		.navbar-collapse > .el-menu{
			background-color: transparent;
			>.el-menu-item, .el-submenu__title{
				line-height: 65px;
				height: 65px;
				position: relative;
				
			}
			.el-submenu .el-menu-item{
				min-width: 100%;
			}
			.el-menu-item, .el-submenu__title{
				a{
					position: absolute;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
				}
			}
		}
		.navbar-nav{
			li{
				float: left;
				a{
			    text-transform: uppercase;
			    font-weight: 500;
			    height: 100%;
			    padding: 22px 15px;
			    font-size: 13px;
			    color: #000000;
			    border-bottom: solid 1px transparent;
			    background-color: transparent !important;
			    display: block;
			    &.active, &:hover{
			    	color: #457aff;
			    }
			    .el-badge{
			    	vertical-align: top;
			    }
				}
			}
		}
	}
</style>