<template>
	<div style="height:calc(100vh);" class="register-wrap">
		<div class="table">
			<div class="table-cell">
				<h1 class="t-center c-white" style="line-height:100px;">账号注册</h1>
				<div class="register panel_white p0">
					<el-row :gutter="20">
						<el-col :span="15">
							<div class="com pl30 pb20" v-show="register[0].active">
								<el-form :rules="comRules" ref="com" :model="com">
										<el-row :gutter="20" v-show="step.first">
											<el-col :span="12">
												<el-form-item prop="account">
													<MDinput name="account" v-model="com.account" required :maxlength="20">账号</MDinput>
						        		</el-form-item>
						          </el-col>
						        
					          
											<el-col :span="12">
												<el-form-item prop="password">
													<MDinput name="password" v-model="com.password" required :maxlength="20">密码</MDinput>
						        		</el-form-item>
						          </el-col>
						        
					          
											<el-col :span="12">
												<el-form-item>
													<MDinput name="name" v-model="com.companyName" required :maxlength="20">企业名称</MDinput>
												</el-form-item>
											</el-col>
					          
					          
											<el-col :span="12">
												<el-form-item>
													<MDinput name="name" v-model="com.scale" required :maxlength="20">企业规模</MDinput>
												</el-form-item>
											</el-col>
					        	
					          
											<el-col :span="12">
												<el-form-item>
													<MDinput name="name" v-model="com.industry" required :maxlength="20">所属行业</MDinput>
					          		</el-form-item>
											</el-col>
					          
											<el-col :span="12">
					          		<el-form-item>
													<MDinput name="name" v-model="com.location" required :maxlength="20">企业地址</MDinput>
												</el-form-item>
											</el-col>
					        	
					          
											<el-col :span="12">
												<el-form-item>
													<MDinput name="name" v-model="com.webUrl" required :maxlength="20">官网</MDinput>
						        		</el-form-item>
						          </el-col>
						        
					          
											<el-col :span="12">
												<el-form-item prop="linkName">
													<MDinput name="linkName" v-model="com.linkName" required :maxlength="20">联系人</MDinput>
												</el-form-item>
											</el-col>
					        	
					          
											<el-col :span="12">
												<el-form-item prop="linkPhone">
													<MDinput name="linkPhone" v-model="com.linkPhone" required :maxlength="20">联系方式</MDinput>
												</el-form-item>
											</el-col>

											<el-col :span="24">
												<el-form-item>
													<el-button class="pull-right" type="primary" size="small" @click="comSbumit">&nbsp;&nbsp;提交&nbsp;&nbsp;</el-button>
												</el-form-item>
											</el-col>
			            	</el-row>
										<el-row :gutter="20" v-show="step.second">
											<el-col :span="24">
												<el-form-item>
													<div class="logo-wrap">
														<el-button type="primary mt100" icon="upload" @click="imagecropperShow=true">添加logo
			    										</el-button>
			    								</div>
		    									<el-button-group class="pull-right">
														<el-button type="primary" size="small" @click="comStep('first')" icon="el-icon-arrow-left">上一步</el-button>
														<el-button class="pull-right" type="primary" size="small" @click="comStep('third')">下一步<i class="el-icon-arrow-right el-icon--right"></i></el-button>
													</el-button-group>
												</el-form-item>
											</el-col>
						        </el-row>
										<el-row :gutter="20" v-show="step.third">
											<el-col :span="24">
												<el-form-item>
													<el-input
													  type="textarea"
													  :autosize="{ minRows: 15, maxRows: 20}"
													  placeholder="请填写企业介绍"
													  v-model="com.introduce">
													</el-input>
												</el-form-item>
												<el-form-item>
			    								<el-button-group class="pull-right mt15">
														<el-button type="primary" size="small" @click="comStep('first')" icon="el-icon-arrow-left">上一步</el-button>
														<el-button class="pull-right" type="primary" size="small" @click="comSbumit">完成></i></el-button>
													</el-button-group>
												</el-form-item>
											</el-col>
						        </el-row>
			          </el-form>
							</div>
							<div class="user pl30 pb20" v-show="register[1].active">
								<el-form :rules="userRules" ref="user" :model="user">
									<el-row :gutter="20">
										<el-col :span="24">
											<el-form-item prop="account">
												<MDinput name="account" v-model="user.account" required :maxlength="20">账号</MDinput>
					        		</el-form-item>
					          </el-col>
				          
										<el-col :span="24">
											<el-form-item prop="password">
												<MDinput name="password" v-model="user.password" required :maxlength="20">密码</MDinput>
					        		</el-form-item>
					          </el-col>
				          
										<el-col :span="24">
											<el-form-item prop="name">
												<MDinput name="name" v-model="user.name" required :maxlength="20">姓名</MDinput>
											</el-form-item>
										</el-col>
										<el-col :span="24">
											<el-form-item prop="linkPhone">
												<MDinput name="linkPhone" v-model="user.linkPhone" required :maxlength="20">联系方式</MDinput>
											</el-form-item>
										</el-col>
										<el-col :span="24">
											<el-form-item>
												<el-button class="pull-right mt20" type="primary" size="small" @click="userSbumit">&nbsp;&nbsp;提交&nbsp;&nbsp;</el-button>
											</el-form-item>
										</el-col>
		            	</el-row>
			          </el-form>
							</div>
						</el-col>
						<el-col :span="9">
							<div class="login-type-box t-center">
								<div v-for="item in register" :class="{active: item.active}" @click="changeRegisterType(item)"><span>{{item.name}}</span></div>

								<div style="line-height:50px"><router-link class="c-blue" to="/">已有账号</router-link></div>
							</div>
						</el-col>
					</el-row>
				</div>
			</div>
		</div>
		<image-cropper :width="300" :height="300" :url="gpath.user_hp" @close='close' @crop-upload-success="cropSuccess"
      :key="imagecropperKey" v-show="imagecropperShow"></image-cropper>
	</div>
</template>

<script>
	import ImageCropper from '@/components/ImageCropper';
	import MDinput from '@/components/MDinput';
	import { registerCom, registerStudent } from '@/api/login';
	export default {
		components: { MDinput, ImageCropper },
		data() {
  		return {
  			register: [
  				{name: '我要招聘', active: true},
  				{name: '我要应聘', active: false}
  			],
  			imagecropperShow: false,
	      imagecropperKey: 0,
  			step: {
  				first: true,
  				second: false,
  				third: false
  			},
  			com: {
  				account: '',
  				password: '',
  				companyName: '',
  				scale: '',
  				industry: '',
  				location: '',
  				webUrl: '',
  				linkName: '',
  				linkPhone: '',
  				introduce: '',
  				pic:''
  			},
  			user: {
  				account: '',
  				password: '',
  				name: '',
  				linkPhone: ''
  			},
  			comRules: {
  				account: [
  					{ required: true, message: '请填写账号', trigger: 'blur' }
  				],
  				password: [
  					{ required: true, message: '请填写密码', trigger: 'blur' }
  				],
  				linkName: [
  					{ required: true, message: '请填写联系人', trigger: 'blur' }
  				],
  				linkPhone: [
  					{ required: true, message: '请填写联系方式', trigger: 'blur' }
  				]
  			},
  			userRules: {
  				account: [
  					{ required: true, message: '请填写账号', trigger: 'blur' }
  				],
  				password: [
  					{ required: true, message: '请填写密码', trigger: 'blur' }
  				],
  				name: [
  					{ required: true, message: '请填写姓名', trigger: 'blur' }
  				],
  				linkPhone: [
  					{ required: true, message: '请填写联系方式', trigger: 'blur' }
  				]
  			}
  		}
  	},
  	mounted(){
  	},
  	methods: {
  		changeRegisterType(item){
  			for(let i in this.register){
  				if(this.register[i].name == item.name) this.register[i].active = true;
  				else this.register[i].active = false;
  			}
  		},
  		comStep(step){
  			for(let index in this.step){
  				if(index == step) this.step[index] = true;
  				else this.step[index] = false;
  			}
  			console.log(this.step)
  		},
  		comSbumit(){
		  	this.$refs.com.validate(valid => {
          if (valid) {
            this.loading = true;
            setType(this.radio);
            this.loginForm.type = this.radio;
            registerCom(this.com).then(res => {
		  				if(typeof res != 'undefined') {
		  					this.$message.success('注册成功, 即将前往首页');
		  					setTimeout(function(){
		  						this.$router.push({ path: '/' });
		  					},2000)
		  				}
		  			})
          } else {
            console.log('error submit!!');
            return false;
          }
        });
  		},
  		userSbumit(){
  			this.$refs.user.validate(valid => {
          if (valid) {
            this.loading = true;
            setType(this.radio);
            this.loginForm.type = this.radio;
            registerStudent(this.user).then(res => {
		  				if(typeof res != 'undefined') {
		  					this.$message.success('注册成功, 即将前往首页');
		  					setTimeout(function(){
		  						this.$router.push({ path: '/' });
		  					},2000)
		  				}
		  			})
          } else {
            console.log('error submit!!');
            return false;
          }
        });
  		},
  		cropSuccess(resData) {
	      this.imagecropperShow = false
	      this.imagecropperKey = this.imagecropperKey + 1
	      this.image = resData.files.avatar
	    },
	    close() {
	      this.imagecropperShow = false
	    }
  	}
  }
</script>

<style rel="stylesheet/scss" lang="scss">
	.register-wrap{
		background: -webkit-linear-gradient(#409EFF 50%, #fff 50%); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(#409EFF 50%, #fff 50%); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(#409EFF 50%, #fff 50%); /* Firefox 3.6 - 15 */
    background: linear-gradient(#409EFF 50%, #fff 50%); /* 标准的语法（必须放在最后） */
		.register{
			width: 800px;
			margin: 0 auto;
			>div{
			}
		}
		.el-form-item{
			margin-bottom: 0
		}
		.logo-wrap{
			min-height: 345px;
			text-align: center;
		}
		.login-type-box{
			overflow: hidden;
			height: 397px;
			padding-top: 50px;
			box-sizing: border-box;
			background: url(/static/banner/slider2-2377c67b76.jpg) center no-repeat / cover; 
			>div{line-height: 50px;background-color: rgba(255,255,255,.4);margin-top: 30px}
			span{cursor: pointer}
			.active{
				background-color: transparent;
				span{color: #fff;}
			}
		}
	}
</style>