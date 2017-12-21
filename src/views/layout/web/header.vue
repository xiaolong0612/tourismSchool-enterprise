<template>
	<div>
		<header class="header">
			<div class="container">
				<div class="navber-header pull-left clearfix" style="line-height:0">
					<router-link to="/" class="logo">
						<img src="/static/logo.png" height="50px" style="margin-top:7px">
					</router-link>
				</div>
				<div class="navbar-collapse">
					<ul class="pull-right navbar-nav">
						<li v-for="item in link_list" :key="item.name" :class="{ 'active': item.active, 'border': item.name == '发布招聘'}">
							<a :href='item.link' v-if="item.name == '操作手册'">
								{{item.name}}
							</a>
							<router-link :to='item.link' v-else>
								{{item.name}}
							</router-link>
						</li>

						<li v-if="name.length == 0" @click="dialogLogin = true">登陆</li>
						
						<li v-else style="margin:7px 15px">
							<el-popover
							  placement="bottom"
							  width="120">
							  <p>确定要退出么？</p>
							  <div style="text-align: right; margin: 0">
							    <el-button type="primary" size="mini" @click="logout">确定</el-button>
							  </div>
								<div slot="reference">
									<span style="cursor:pointer;vertical-align:middle">{{name}}</span>
									<img class="logo" :src="user.pic">
								</div>
							</el-popover>
						</li>
					</ul>
				</div>
			</div>
		</header>
		<el-dialog title="登陆" :visible.sync="dialogLogin" width="500px">
			<el-form :model="loginForm" status-icon label-width="100px">
			  <el-form-item label="账号">
			    <el-input type="text" v-model="loginForm.account" auto-complete="off"></el-input>
			  </el-form-item>
			  <el-form-item label="密码" class="mb0">
			    <el-input type="password" v-model="loginForm.password" auto-complete="off"></el-input>
			  </el-form-item>
			  <el-form-item>
			  	<router-link class="c-blue pull-right" to="/register">没有账号</router-link>
	        <el-radio v-model="loginForm.type" label="2">我要应聘</el-radio>
	        <el-radio v-model="loginForm.type" label="3">我要招聘</el-radio>
	      </el-form-item>
			  <el-form-item label="">
			    <el-button type="primary" @click="submitLogin('loginForm')" :loading="loginLoading">提交</el-button>
			    <el-button @click="dialogLogin = false">取消</el-button>
			  </el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>
<script>
  import { mapGetters } from 'vuex';
import { getType, setType } from '@/utils/auth';
	export default {
		computed: {
	    ...mapGetters([
	    	'user',
	      'name',
	      'account',
	      'type'
	    ])
	  },
		data() {
			return{
				dialogLogin: false,
				loginLoading: false,
				cut: '',
				com_header: [
					{
						name: '发布招聘',
						link: '/com/recruit/release'
					},{
						name: '操作手册',
						link: '/static/file/旅游校企对接平台操作手册说明书-企业端.docx'
					},{
						name: '招聘列表',
						link: '/com/recruit/list',
					},{
						name: '谁来应聘',
						link: '/com/inbox/list',
					},{
						name: '公司信息',
						link: '/com/info'
					}
				],
				user_header: [
					{
						name: '首页',
						link: '/index'
					},{
						name: '操作手册',
						link: '/static/file/旅游校企对接平台操作手册说明书-学生端.docx'
					},{
						name: '我的简历',
						link: '/user/resume/list',
					},{
						name: '我的求职',
						link: '/user/delivery'
					}
				],
				link_list: [],
				activeIndex: '1',
				loginForm: {
					// account: '18805070157',
					// password: '123456',
					account: '',
					password: '',
					type: 0,
				}
			}
		},
		watch: {
  		'$route' (to, from) {
  			this.activeLink(to.path);
		  },
		  type(curVal,oldVal){
		  	this.type = curVal;
		  	this.setHeader();
		  }
		},
    mounted() {
    	this.setHeader();
    	this.activeLink(this.link_list[0]);
    },
		methods: {
			activeLink(link){
				for(let i in this.link_list){
					if(this.link_list[i].link == link) this.link_list[i].active = true;
					else this.link_list[i].active = false;
				}
			},
      setHeader(){
        if(this.type == 3){
        	this.link_list = this.com_header;
        }else{
        	this.link_list = this.user_header;
        }

        for(let i in this.link_list){
					this.$set(this.link_list[i], 'active', false);
				}
      },
			submitLogin(){
				this.$store.dispatch('Login', this.loginForm).then(() => {
          this.loginLoading = false;
          this.dialogLogin = false;
          if(this.loginForm.type == 3){
          	this.$router.push({ path: '/com/recruit/list' });
          }else{
          	this.$router.push({ path: '/' });
          }
          location.reload();
          // window.location.reload();
        }).catch(() => {
          this.loginLoading = false;
        });
			},
			logout() {
        this.$store.dispatch('LogOut').then(() => {
        	this.$router.push({ path: '/' });
          location.reload();  // 为了重新实例化vue-router对象 避免bug
        });
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
				.logo{
					width: 50px;
					height: 50px;
					vertical-align:middle;
					border-radius: 100%;
				}
			}
		}
	}
</style>