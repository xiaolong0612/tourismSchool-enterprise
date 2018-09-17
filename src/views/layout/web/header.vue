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

							<el-badge :value="invitateCount" class="item" v-else-if="item.name == '谁来应聘'">
							  <span @click="toLink(item.link)">
									{{item.name}}
								</span>
							</el-badge>
							<!-- <router-link :to='item.link' v-else>
								
							</router-link> -->
							<span @click="toLink(item.link)" class="point" v-else>{{item.name}}</span>
						</li>

						<li v-if="name.length == 0" @click="dialogLogin = true"><a>登陆/注册</a></li>
						
						<li v-else style="margin:7px 15px">
							<!-- <el-popover
							  placement="bottom"
							  width="120">
							  <p>确定要退出么？</p>
							  <div style="text-align: right; margin: 0">
							    <el-button type="primary" size="mini" @click="logout">确定</el-button>
							  </div>
								<div slot="reference">
									<span style="cursor:pointer;vertical-align:middle">{{name}}</span>
									<img class="logo" :src="user.pic || '/static/default_img.gif'">
								</div>
							</el-popover> -->
							<el-dropdown :hide-on-click="false">
							  <span class="el-dropdown-link">
							    <span style="cursor:pointer;vertical-align:middle">{{name}}</span>
									<img class="logo" :src="user.pic || '/static/logo.png'">
									<i class="el-icon-arrow-down el-icon--right"></i>
							  </span>
							  <el-dropdown-menu slot="dropdown">
							    <el-dropdown-item>
							    	<router-link v-if="type == 2" to="/user/info">个人信息</router-link>
							    </el-dropdown-item>
							    <el-dropdown-item>
							    	<router-link v-if="type == 3" to="/com/collection">收藏列表</router-link>
							    </el-dropdown-item>
							    <el-dropdown-item>
							    	<span @click="dialogPassword = true">修改密码</span>
							    </el-dropdown-item>
							    <el-dropdown-item divided>
							    	<span @click="logout">退出登陆</span>
							    </el-dropdown-item>
							  </el-dropdown-menu>
							</el-dropdown>
						</li>
					</ul>
				</div>
			</div>
		</header>
		<el-dialog title="登陆" :visible.sync="dialogLogin" width="500px">
			<el-form :model="loginForm" status-icon label-width="100px">
			  <el-form-item label="账号">
			    <el-input type="text" v-model="loginForm.account" auto-complete="off" de></el-input>
			  </el-form-item>
			  <el-form-item label="密码" class="mb0">
			    <el-input type="password" v-model="loginForm.password" auto-complete="off"></el-input>
			  </el-form-item>
			  <el-form-item>
			  	<p class="pull-right">
			  		<router-link class="c-blue" to="/register">没有账号</router-link>/
			  		<span class="c-blue point" @click="retrievePassword">找回密码</span>
			  	</p>
	        <el-radio v-model="loginForm.type" label="2">我要应聘</el-radio>
	        <el-radio v-model="loginForm.type" label="3">我要招聘</el-radio>
	      </el-form-item>
			  <el-form-item label="">
			    <el-button type="primary" @click="submitLogin('loginForm')" :loading="loginLoading">登陆</el-button>
			    <el-button @click="dialogLogin = false">取消</el-button>
			  </el-form-item>
			</el-form>
		</el-dialog>
		<el-dialog
		  title="密码修改"
		  :visible.sync="dialogPassword"
		  width="30%"
		  @close="dialogPasswordText = '修改密码'">
		  <el-form status-icon label-width="100px" :model="mod_password" status-icon :rules="mod_pass_rules" ref="mod_password">
			  <!-- <el-form-item label="旧密码" prop="oldPass">
			    <el-input type="password" v-model="mod_password.oldPass" auto-complete="off"></el-input>
			  </el-form-item> -->


			  <el-form-item label="账号">
			    <el-input type="account" v-model="mod_password.account" auto-complete="off" :disabled="editAccount"></el-input>
			  </el-form-item>

			  <el-form-item label="新密码" prop="password">
			    <el-input type="password" v-model="mod_password.password" auto-complete="off"></el-input>
			  </el-form-item>
			  <el-form-item label="确认密码" prop="checkPass" >
			    <el-input type="password" v-model="mod_password.checkPass" auto-complete="off"></el-input>
			  </el-form-item>

			  <el-form-item label="手机号码">
			  	<el-row>
					  <el-col :span="10">
					  	<el-input v-model="mod_password.phone"  :disabled="editAccount"></el-input>
					  </el-col>
					  <el-col :span="14" class="clear_fix">
					  	<el-button class="pull-right" type="primary" @click.prevent="getCode" :disabled="codeTimeBtn">{{codeText}}</el-button>
					  </el-col>
					</el-row>
			  </el-form-item>
			  <el-form-item label="验证码" prop="code">
			    <el-input v-model="mod_password.code"></el-input>
			  </el-form-item>

			  <el-form-item label="用户类型" v-if="account == ''">
			    <el-radio v-model="mod_password.type" label="2">学生</el-radio>
			  </el-form-item>
			</el-form>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogPassword = false">取 消</el-button>
		    <el-button type="primary" @click="submitModPassword('mod_password')">确 定</el-button>
		  </span>
		</el-dialog>
	</div>
</template>
<script>
  import { mapGetters } from 'vuex';
	import { getType, setType } from '@/utils/auth';
	import { validatPhone } from '@/utils/validate';
  import { getCode } from '@/api/form';
  import { modPassword } from '@/api/login';
	export default {
		computed: {
	    ...mapGetters([
	    	'id',
	    	'user',
	      'name',
	      'account',
	      'type',
	      'invitateCount',
	      'linkPhone'
	    ])
	  },
		data() {
			var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.mod_password.password !== '') {
            this.$refs.mod_password.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.mod_password.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
			return{
  			codeQuery: {
  				phone: '',
  				type: ''
  			},
  			codeText: '获取短信验证码',
  			countdown: 60,
  			codeTimeBtn: false,
				editAccount: false,
				dialogLogin: false,
				loginLoading: false,
				dialogPassword: false,
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
				},
				mod_password: {
					// id: '',
					// oldPass: '',
					phone: '',
					account: '',
					password: '',
					checkPass: '',
					code: '',
					type: ''
				},
				mod_pass_rules: {
          password: [
            { validator: validatePass, trigger: 'blur',required: true, },
            { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur',required: true, }
          ],
          code: [
            { required: true, message: '验证码不能为空', trigger: 'blur' },
          ]
        }
			}
		},
		watch: {
  		'$route' (to, from) {
  			this.activeLink(to.path);
		  },
		  type(curVal,oldVal){
		  	this.type = curVal;
    		this.codeQuery.type = this.type;
		  	this.setHeader();
		  }
		},
    mounted() {
    	if(this.$route.query.login == 'true' && this.account == ''){
    		this.dialogLogin = true;
    	}
    	if(this.account != '') this.editAccount = true
    	this.mod_password.id = this.id;
    	this.setHeader();
    	if(this.id == ''){
    		this.link_list = [];
    	}else{
    		this.mod_password.phone = this.linkPhone;
    		this.mod_password.account = this.account;
    	}
    	this.activeLink(this.link_list[0]);
    	this.codeQuery.type = this.type;
    },
		methods: {
			activeLink(link){
				for(let i in this.link_list){
					if(this.link_list[i].link == link) this.link_list[i].active = true;
					else this.link_list[i].active = false;
				}
			},
			toLink(link){
				if(this.name == ''){
					this.dialogLogin = true;
				}else{
					this.$router.push({ path: link});
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
				if(this.loginForm.type == ''){
					this.$message.error('请选择登陆角色');
					return;
				}
				this.$store.dispatch('Login', this.loginForm).then(rs => {
	          if(rs.code != -1){
	          this.loginLoading = false;
	          this.dialogLogin = false;
	          if(this.loginForm.type == 3){
	          	this.$router.push({ path: '/com/recruit/list' });
	          }else{
	          	this.$router.push({ path: '/' });
	          }
	          location.reload();
	         }
          // window.location.reload();
        }).catch(() => {
          this.loginLoading = false;
        });
			},
			submitModPassword(formName) {
				if(this.account != ''){
					this.mod_password.type = this.type;
				}
        this.$refs[formName].validate((valid) => {
          if (valid) {
          	this.$message.success('密码修改已提交请稍等！');
            modPassword(this.mod_password).then( res => {
            	if(res.success){
            		this.dialogPassword = false;
            		this.$message.success('密码已成功修改');
            	}
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
			logout() {
        this.$store.dispatch('LogOut').then(() => {
        	setType(2);
        	this.$router.push({ path: '/' });
          location.reload();  // 为了重新实例化vue-router对象 避免bug
        });
      },
      getCode(){
    		this.codeQuery.phone = this.mod_password.phone;
    		if(this.codeQuery.phone == ''){
    			this.$message.error('手机号码不能为空哦！');
    		}else if(!validatPhone(this.codeQuery.phone)){
    			this.$message.error('请输入正确的手机号码');
    		}else{
      		if(this.codeTimeBtn) return false;
	    		getCode(this.codeQuery).then( rs => {
	    			if(rs.code != -1){
      				this.codeTimeBtn = true;
    					this.downGetCodeTime();
	    			}
	    		})
	    	}
	    },
	    downGetCodeTime(){
	    	let _this = this;
	    	let code_time = setInterval(function(){
	    		_this.codeText = _this.countdown +'s后重新获取';
	    		_this.countdown--;
	    		if(_this.countdown <= 0){
	    			_this.codeTimeBtn = false;
	    			_this.countdown = 60;
	    			_this.codeText = '获取验证码';
	    			clearInterval(code_time);
	    		}
	    	},1000)
	    },
	    retrievePassword(){
	    	this.dialogPassword = true;
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