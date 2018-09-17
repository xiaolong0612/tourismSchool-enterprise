<template>
	<div class="com-info-wrap pb100">
		<div class="top-banner"></div>

		<div class="panel_white small_container com-content">
			<el-form>
				<div class="com-name mb10">
					<img v-if="!is_edit" :src="com_info.pic" class="avatar" style="width:80px;height:80px;vertical-align:middle">
					<transition name="el-zoom-in-top">
						<el-upload
							v-if="is_edit"
						  class="com-logo"
						  :action="gpath.user_hp"
						  :show-file-list="false"
						  :on-success="handleAvatarSuccess"
						  accept=".png, .jpg, .jpeg, .gif">
						  <img v-if="com_info.pic" :src="com_info.pic" class="avatar" style="width:100%;">
						  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
					</transition>
					<span v-if="!is_edit">{{com_info.companyName}}</span>
					<el-input v-if="is_edit" v-model="com_info.companyName" style="width:300px;"></el-input>
				</div>

				<div class="section">
					<h2 class="title">
						企业基本信息
					</h2>
					<div class="section-content">
							<el-row :gutter="100">
							  <el-col :span="12">
							  	<el-form-item label="企业规模" label-width="68px">
							  		<span v-if="!is_edit">{{com_info.scale}}人</span>
								    <el-input v-if="is_edit" type="number" v-model="com_info.scale"></el-input>
								  </el-form-item>
							  </el-col>
							  <el-col :span="12">
							  	<el-form-item label="所属行业" label-width="68px">
										<span v-if="!is_edit">{{com_info.industry}}</span>
								    <el-input v-if="is_edit" v-model="com_info.industry"></el-input>
								  </el-form-item>
							  </el-col>
							</el-row>
							<el-row :gutter="100">
							  <!-- <el-col :span="12">
							  	<el-form-item label="所属行业" label-width="68px">
							  		<span v-if="!is_edit">{{com_info.industry}}</span>
								    <el-input v-if="is_edit" v-model="com_info.industry"></el-input>
								  </el-form-item>
							  </el-col> -->
							  <el-col :span="12">
							  	<el-form-item label="企业官网" label-width="68px">
							  		<a target="_blank" :href="com_info.webUrl" v-if="!is_edit">{{com_info.webUrl}}</a>
								    <el-input v-if="is_edit" v-model="com_info.webUrl"></el-input>
								  </el-form-item>
							  </el-col>
							</el-row>
					</div>
				</div>

				<div class="section">
					<h2 class="title">
						企业简介
					</h2>
					<div class="section-content introduce">
						<p v-if="!is_edit">{{com_info.introduce}}</p>
						<el-input v-if="is_edit" type="textarea" :rows="5" v-model="com_info.introduce"></el-input>
					</div>
				</div>

				<div class="section">
					<h2 class="title">
						企业位置
					</h2>
					<div class="section-content">
							<el-row :gutter="100">
							  <el-col :span="12">
							  	<el-form-item label="位置" label-width="68px">
							  		<span v-if="!is_edit">{{com_info.location}}</span>
								    <el-input v-if="is_edit" v-model="com_info.location"></el-input>
								  </el-form-item>
							  </el-col>
							</el-row>
					</div>
				</div>

				<div class="section">
					<h2 class="title">
						联系我们
					</h2>
					<div class="section-content">
							<el-row :gutter="100">
							  <el-col :span="12">
							  	<el-form-item label="联系人" label-width="68px">
							  		<span v-if="!is_edit">{{com_info.linkName}}</span>
								    <el-input v-if="is_edit" v-model="com_info.linkName"></el-input>
								  </el-form-item>
							  </el-col>
							  <el-col :span="12">
							  	<el-form-item label="联系方式" label-width="68px">
							  		<span v-if="!is_edit">{{com_info.linkPhone}}</span>
								    <el-input v-if="is_edit" v-model="com_info.linkPhone"></el-input>
								  </el-form-item>
							  </el-col>
							</el-row>
					</div> 
				</div>

				<div class="section referpic">
					<h2 class="title">
						企业照片
					</h2>
					<div class="section-content" style="padding: 20px 0 0 0">
						<el-row :gutter="20">
						  <el-col :span="8" v-for="(o, index) in com_info.referPic" :key="index" style="margin-bottom: 20px">
						    <el-card style="position:relative">
						      <div class="img" :style="'background:url('+ o.pic +') center no-repeat;background-size:cover'"></div>
						      <div style="padding: 14px 0 0;">
						        <p v-if="!is_edit" class="eli-3" style="word-wrap:break-word">{{o.text}}</p>
								    <el-input type="textarea" autosize v-if="is_edit" v-model="o.text"></el-input>
						      </div>
						      <i class="el-icon-error del" v-show="is_edit" @click="delRefer(index)"></i>
						    </el-card>
						  </el-col>
						  <el-col :span="8" v-if="is_edit" >
						    <el-card style="height:224px;text-align:center">
						      <el-upload
									  ref="upload"
									  :show-file-list="false"
									  :action="gpath.user_hp"
									  :file-list="fileList"
									  :on-success="handleSuccess"
									  accept=".png, .jpg, .jpeg, .gif">
									  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
									</el-upload>
						    </el-card>
						  </el-col>
						</el-row>
					</div>
				</div>
			</el-form>
		</div>
		<div class="fixed-edit">
			<ul>
				<transition name="el-zoom-in-center">
					<li style="background:#67c23a" @click="updateDetails" v-if="is_edit">保<br>存</li>
				</transition>
				<transition name="el-zoom-in-center">
					<li style="background:#eb9e05" @click="closeEdit" v-if="is_edit">取<br>消</li>
				</transition>
				<transition name="el-zoom-in-center">
					<li style="background:#409eff" @click="is_edit = true" v-if="!is_edit">编<br>辑</li>
				</transition>
			</ul>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';
  import { detailDetails, updateDetails } from '@/api/com/details';
  export default {
  	computed: {
      ...mapGetters([
      	'user',
        'id',
        'type'
      ])
    },
  	data() {
  		return {
  			is_edit: false,
  			fileList: [],
  			com_info: {
  				companyName: '微众 教育',
  				pic: '',
  				scale: '',
  				industry: '2312',
  				location: '2312',
  				introduce: '',
  				webUrl: '21321',
  				linkName: '312312',
  				linkPhone: '321312',
  				referPic: [],
  				state: ''
  			}
  		}
  	},
  	mounted(){
  		this.com_info = this.user;
  		console.log(this.user)
      this.com_info.referPic = this.com_info.referPic == '' ? [] : JSON.parse(this.com_info.referPic);
  	},
  	methods: {
  		handleAvatarSuccess(res, file) {
  			this.is_edit = true;
        this.com_info.pic = res.url;
      },
      closeEdit(){
  			this.is_edit = false;
  			this.com_info = JSON.parse(JSON.stringify(this.user));
  			//this.getInfo();
  		},
  		updateDetails(){
  			let query = JSON.parse(JSON.stringify(this.com_info));
  			query.referPic = JSON.stringify(this.com_info.referPic);
  			delete query.state;
  			updateDetails(query).then(res => {
  				if(res.code != -1 ){
	  				this.is_edit = false;
	  				location.reload()
	  				this.$store.dispatch('GetInfo', {id: this.id, type:this.type}).then(res => {
	            this.com_info = res.userinfo;
	      			this.com_info.referPic = this.com_info.referPic == '' ? [] : JSON.parse(this.com_info.referPic);
	          }).catch(() => {
	            this.loading = false;
	          });
	        }
  			})
  		},
  		handleSuccess(res, file, fileList){
  			this.fileList = [];
  			console.log(res, file, fileList);
  			this.com_info.referPic.push({
  				name: res.name,
  				pic: res.url,
  				text: ''
  			})
  		},
  		delRefer(index){
  			this.com_info.referPic.splice(index,1);
  		}
  	}
  }
</script>

<style rel="stylesheet/scss" lang="scss">
	.com-info-wrap{
		.top-banner{
			height: 300px;
			background: url(/static/banner/西湖.jpg) center top 58% no-repeat;
			background-size: cover;
		}
		.section{
			.title{
				font-weight: 400;
		    font-size: 16px;
		    line-height: 40px;
		    padding-right: 15px;
		    background-color: #fff;
		    margin: 0;
				border-bottom: 1px solid rgba(135, 141, 153, 0.4);
				color: #20a0ff;
			}
			.el-form-item{
				margin-bottom: 0;
				.el-form-item__label{
					color: #808080;
				}
			}
			.introduce{
				margin-top: 6px;
				line-height: 30px;
			}
			.section-content{
				padding-top: 5px;
				a{
					color: #20a0ff;
				}
			}
		}
		.com-content{
			margin: -150px  auto 0;
			min-height: 500px;
			.com-name{
				.com-logo{
					width: 80px;
					height: 80px;
					display: inline-block;
					margin-right: 5px;
					border: 1px solid #ccc;
					.el-upload{
						line-height: 80px;
						width: 80px;
						text-align: center;
					}
					img{
						height: 80px;
					}
				}
				>span{
					font-size: 18px;
				}
			}
			
		}
	}
	.referpic{
		.img{width: 100%;height: 210px;}
		.del{position: absolute;top:5px;right: 5px;color:red;font-size: 20px;cursor: pointer}
	}
	.fixed-edit{
		position: fixed;
		bottom: 30%;
		right: 0;
		li{
			display: block;
			font-size: 14px;
			color: #fff;
			text-align: center;
			padding: 10px 15px;
			margin-bottom: 10px;
			border-radius: 4px 0 0 4px;
		}
	}
</style>