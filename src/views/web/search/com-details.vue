<template>
	<div class="com-info-wrap">
		<div class="top-banner"></div>

		<div class="panel_white small_container com-content">
			<div class="com-name mb10">
				<el-upload
				  class="com-logo"
				  :action="gpath.user_hp"
				  :show-file-list="false"
				  :on-success="handleAvatarSuccess"
				  :before-upload="beforeAvatarUpload">
				  <img v-if="com_info.pic" :src="com_info.pic" class="avatar" style="width:100%;">
				  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
				<span>{{com_info.companyName}}</span>
			</div>

			<div class="section">
				<h2 class="title">
					企业基本信息
				</h2>
				<div class="section-content">
					<el-form>
						<el-row>
						  <el-col :span="12">
						  	<el-form-item label="企业规模">
						  		<span>{{com_info.scale}}</span>
							  </el-form-item>
						  </el-col>
						  <el-col :span="12">
						  	<el-form-item label="所属行业">
									<span>{{com_info.industry}}</span>
							  </el-form-item>
						  </el-col>
						  <el-col :span="12">
						  	<el-form-item label="所属行业">
						  		<span>{{com_info.industry}}</span>
							  </el-form-item>
						  </el-col>
						  <el-col :span="12">
						  	<el-form-item label="企业官网">
						  		<router-link :to="com_info.webUrl">{{com_info.webUrl}}</router-link>
							  </el-form-item>
						  </el-col>
						</el-row>
					</el-form>
				</div>
			</div>

			<div class="section">
				<h2 class="title">
					企业简介
				</h2>
				<div class="section-content introduce">
					<p>{{com_info.introduce}}</p>
				</div>
			</div>

			<div class="section">
				<h2 class="title">
					企业位置
				</h2>
				<div class="section-content">
					<el-form>
						<el-row>
						  <el-col :span="12">
						  	<el-form-item label="位置">
						  		<span>{{com_info.location}}</span>
							  </el-form-item>
						  </el-col>
						</el-row>
					</el-form>
				</div>
			</div>

			<div class="section">
				<h2 class="title">
					联系我们
				</h2>
				<div class="section-content">
					<el-form>
						<el-row>
						  <el-col :span="12">
						  	<el-form-item label="联系人">
						  		<span>{{com_info.linkName}}</span>
							  </el-form-item>
						  </el-col>
						  <el-col :span="12">
						  	<el-form-item label="联系方式">
						  		<span>{{com_info.linkPhone}}</span>
							  </el-form-item>
						  </el-col>
						</el-row>
					</el-form>
				</div>
			</div>
		</div>

		<div class="panel_white small_container com-recruit mt30 pt20">
			<div class="section">
				<h2 class="title">
					该企业招聘职位
				</h2>
				<div class="section-content">
				</div>
			</div>
		</div>
	</div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { getResumeDetails, saveResume, updateResume } from '@/api/student/resume';
  export default {
  	data() {
  		return {
  			is_edit: false,
  			com_info: {
  				companyName: '微众 教育',
  				pic: '',
  				scale: '12',
  				industry: '2312',
  				location: '2312',
  				introduce: '厦门市七星通联科技有限公司，2014年3月正式成立，目前公司注册资本2364万元，在职员工200人，致力于专业为银行打造全景化金融服务场景平台。公司创始团队拥有20年以上的国内银行IT系统、社区银行系统、银行电商系统、移动支付产品的设计和开发经验。七星生活“七星生活”平台——全景化金融服务场景平台，将金融服务融入本地生活、消费支付、技能分享、商户营销、银行服务等各类生活场景中，使银行、客户、商户三方角色有机串连、互利共赢，从而提升平台各方用户体验。基于与农信社、农商行、城...',
  				webUrl: '21321',
  				linkName: '312312',
  				linkPhone: '321312'
  			}
  		}
  	},
  	methods: {
  		handleAvatarSuccess(res, file) {
  			this.is_edit = true;
        this.com_info.pic = res.url;
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
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
</style>