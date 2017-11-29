<template>
	<div>
		<header class="header">
			<div class="container">
				<div class="navber-header pull-left clearfix">
					<router-link to="index" class="logo">旅游校企</router-link>
				</div>
				<div class="navbar-collapse">
					<ul class="pull-right navbar-nav">
						<li v-for="item in link_list" :key="item.name" :class="{ 'active': item.active, 'border': item.name == '发布招聘'}">
							<router-link :to='item.link'>
								{{item.name}}
							</router-link>
						</li>
						<li v-if="name.length == 0" @click="dialogLogin = true">登陆</li>
						
						<li v-else>
							<el-popover
							  placement="bottom"
							  width="120">
							  <p>确定要退出么？</p>
							  <div style="text-align: right; margin: 0">
							    <el-button type="primary" size="mini" @click="logout">确定</el-button>
							  </div>
								
								<span  slot="reference">{{name}}</span>

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
			  <el-form-item label="密码">
			    <el-input type="password" v-model="loginForm.password" auto-complete="off"></el-input>
			  </el-form-item>
			  <el-form-item>
	        <el-radio v-model="loginForm.type" label="2">学生</el-radio>
	        <el-radio v-model="loginForm.type" label="3">企业</el-radio>
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
						name: '招聘列表',
						link: '/com/recruit/list',
					},{
						name: '收件箱',
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
						name: '我的简历',
						link: '/user/resume/list',
					},{
						name: '投递箱',
						link: '/user/delivery'
					}
				],
				link_list: [],
				activeIndex: '1',
				loginForm: {
					account: '18805070157',
					password: '123456',
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