<template>
	<header class="header">
		<div class="container">
			<div class="navber-header pull-left clearfix">
				<el-button class="pull-right navbar-toggle" type="primary" icon="menu"></el-button>
				<router-link to="index" class="logo">旅游校企</router-link>
			</div>
			<div class="navbar-collapse">
				<!-- <el-menu :default-active="activeIndex" class="pull-right" mode="horizontal" @select="handleSelect">
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
				</el-menu> -->
				<ul class="pull-right navbar-nav">
					<li @click="ToggleHeader" v-if="header.type">
							切换企业版
					</li>
					<li @click="ToggleHeader" v-else>
							切换学生版
					</li>
					<li v-for="item in link_list" :key="item.name" :class="{ 'active': item.active, 'border': item.name == '发布招聘'}">
						<router-link :to='item.link'  v-if="item.children == undefined">
							{{item.name}}
						</router-link>

						<el-dropdown v-if="item.children != undefined" @command="handleCommand">
						  <span class="el-dropdown-link">
						  	<router-link :to="item.link">
						    {{item.name}}
						   	</router-link>
						    <i class="el-icon-caret-bottom el-icon--right"></i>
						  </span>
						  <el-dropdown-menu slot="dropdown">
						    <el-dropdown-item v-for="children in item.children" :key="item.name" :command="children.link">
						    	{{children.name}}
						    </el-dropdown-item>
						  </el-dropdown-menu>
						</el-dropdown>
					</li>
					<li>
						<router-link to='/'>
							登陆／登出
						</router-link>
					</li>
				</ul>
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
				com_header: [
					{
						name: '发布招聘',
						link: '/com/recruit/release'
					},{
						name: '招聘列表',
						link: '/com/recruit/list',
						children: [
							{
								name: '导游',
								link: '/com/recruit/list'
							},{
								name: '会计',
								link: '/com/recruit/list'
							}
						]
					},{
						name: '收件箱',
						link: '/com/inbox/list',
						children: [
							{
								name: '导游',
								link: '/com/inbox/list'
							},{
								name: '会计',
								link: '/com/inbox/list'
							}
						]
					},{
						name: '公司信息',
						link: '/index'
					}
				],
				user_header: [
					{
						name: '首页',
						link: '/index'
					},{
						name: '我的简历',
						link: '/user/resume/list',
						children: [
							{
								name: '导游',
								link: '/user/resume/list'
							},{
								name: '会计',
								link: '/user/resume/list'
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
				link_list: [],
				activeIndex: '1'
			}
		},
		watch: {
  		'$route' (to, from) {
  			this.active_link(to.path);
		  }
		},
    mounted() {
    	this.set_active_link();
    	this.active_link(this.$route.path);
    	this.setHeader();
    },
		methods: {
			set_active_link(){
				for(let i in this.link_list){
					if(typeof this.link_list[i].children == 'undefined'){
						this.$set(this.link_list[i], 'active', false);
					
					}else{
						for(let c in this.link_list[i].children){
							this.$set(this.link_list[i].children[c], 'active', false);
						}
					}
				}
			},
			active_link(link){
				for(let i in this.link_list){
					if(typeof this.link_list[i].children == 'undefined'){
						if(this.link_list[i].link == link){
							this.link_list[i].active = true;
						}else{
							this.link_list[i].active = false
						}
					
					}else{
						if(this.link_list[i].link == link){
							this.link_list[i].active = true;
						}else{
							for(let c in this.link_list[i].children){
								if(this.link_list[i].children[c].link == link){
									this.link_list[i].active = true;
									// this.link_list[i].children[c].active = true;
								}else{
									this.link_list[i].active = false;
									// this.link_list[i].children[c].active = false;
								}
							}
						}
					}
				}
			},
			handleCommand(link){
				this.$router.push({path: link})
			},
			ToggleHeader() {
        this.$store.dispatch('ToggleHeader');
        this.setHeader();
      },
      setHeader(){
        if(!this.header.type){
        	this.link_list = this.com_header
        }else{
        	this.link_list = this.user_header
        }
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
		// .navbar-collapse > .el-menu{
		// 	background-color: transparent;
		// 	>.el-menu-item, .el-submenu__title{
		// 		line-height: 65px;
		// 		height: 65px;
		// 		position: relative;
				
		// 	}
		// 	.el-submenu .el-menu-item{
		// 		min-width: 100%;
		// 	}
		// 	.el-menu-item, .el-submenu__title{
		// 		a{
		// 			position: absolute;
		// 			top: 0;
		// 			left: 0;
		// 			right: 0;
		// 			bottom: 0;
		// 		}
		// 	}
		// }
		.navbar-nav{
			li{
				float: left;
				line-height: 25px;
				margin: 20px 15px;
				font-size: 13px;
				&.border{
					border: 1px solid #20a0ff;
					margin: 19px 15px;
					padding: 0 12px;
					border-radius: 50px;
					a{
						color: #20a0ff;
					}
				}
				&.active{
					a{
						color: #20a0ff
					}
				}
				a{
			    text-transform: uppercase;
			    font-weight: 500;
			    font-size: 13px;
			    color: #000000;
			    border-bottom: solid 1px transparent;
			    &.active, &:hover{
			    	color: #20a0ff;
			    }
			    .el-badge{
			    	vertical-align: top;
			    }
				}
			}
		}
	}
</style>