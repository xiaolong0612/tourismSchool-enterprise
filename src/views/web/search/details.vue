<template>
	<div class="pt100 bg-gray pb50 full-height">
		<div class="container recruit_look">
		
			<el-row :gutter="10">
			  <el-col :span="16">
			  	<div class="bg-white recruit_details">
			  		<div class="top_wrap clearfix">
							<div class="pull-right" style="padding-top:8px;">
								<el-button type="primary" @click="handlerDelivery">投个简历</el-button>
							</div>
							<h2 class="name">{{job.jobName}}</h2>
			  		</div>
			  		<div>
			  			<el-form label-position="left" inline label-width="80px">
			  				<el-row>
			  					<!-- <el-col :span="24">
			  						<el-form-item label="企业标签" class="pt10 pb10 mb0">
					            <el-tag size="medium" v-if="job.jobLabels.length != 0" v-for="item in job.jobLabels" :key='item'>{{item}}</el-tag>
					            <span  v-if="job.jobLabels.length == 0">企业福利好，快快加入我们吧</span>
					          </el-form-item>
			  					</el-col> -->
					        <el-col :span="12">
					          <el-form-item label="薪水待遇" class="mb0">
					            <span style="color:#fa6041">{{job.income}}</span>
					          </el-form-item>
					        </el-col>
					        <el-col :span="12">
					          <el-form-item label="招聘人数" class="mb0">
					            <span>{{job.recruitNumber}}</span>
					          </el-form-item>
					        </el-col>
					        <el-col :span="12">
					          <el-form-item label="工作方式" class="mb0">
					            <span>{{job.jobTypeStr}}</span>
					          </el-form-item>
					        </el-col>
					        <el-col :span="12">
					          <el-form-item label="教育程度" class="mb0">
					            <span>{{job.qualificate}}</span>
					          </el-form-item>
					        </el-col>
					        <el-col :span="12">
					          <el-form-item label="工作经验" class="mb0">
					            <span>{{job.workExperience}}</span>
					          </el-form-item>
					        </el-col>
					        <el-col :span="12">
					          <el-form-item label="关注度" class="mb0">
					            <span>1000</span>
					          </el-form-item>
					        </el-col>
					        <el-col :span="12">
					          <el-form-item label="工作地点" class="mb0">
					            <span>{{job.workAddress}}</span>
					          </el-form-item>
					        </el-col>
					        <el-col :span="12">
					          <el-form-item label="更新于" class="mb0">
					            <span>{{job.releaseTime}}</span>
					          </el-form-item>
					        </el-col>
					      </el-row>
			        </el-form>
			  		</div>
			  	</div>
			  	<div class="evaluate_wrap mt10 bg-white">
						<h2 class="title">面试评价</h2>
						<list-evaluate :jobId="$route.query.id"></list-evaluate>
			  	</div>
			  </el-col>
			  <el-col :span="8">
			  	<div class="bg-white com-info">
			  		<div class="mb20">
							<img class="logo mr5" v-if="job.company.pic != ''" :src="job.company.pic">
							<span class="name">{{job.company.companyName}}</span>
						</div>
						<div class="item" v-if="job.company.industry != ''">
							<span>
								<icon-svg icon-class="caidan" />
							</span>
							<font>{{job.company.industry}}</font>
						</div>

						<div class="item" v-if="job.company.introduce != ''">
							<span>
								<icon-svg icon-class="jianjie" />
							</span>
							<font>{{job.company.introduce}}</font>
						</div>

						<div class="item" v-if="job.company.scale != ''">
							<span>
								<icon-svg icon-class="e60213" />
							</span>
							<font>{{job.company.scale}}</font>
						</div>

						<div class="item" v-if="job.company.location != ''">
							<span>
								<icon-svg icon-class="dibiao" />
							</span>
							<font>{{job.company.location}}</font>
						</div>

						<div class="item" v-if="job.company.webUrl != ''">
							<span>
								<icon-svg icon-class="zhuye" />
							</span>
							<font><a target="_blank" :href="job.company.webUrl">{{job.company.webUrl}}</a></font>
						</div>
					</div>
			  </el-col>
			</el-row>
		</div>
		<el-dialog
      title="简历列表"
      :visible.sync="dialogResumeList"
      width="60%">
      <resume-item-select :jobId="jobId" @dialogClose="dialogResumeListClose"></resume-item-select>
    </el-dialog>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';
  import listEvaluate from '@/views/web/search/list-evaluate';
  import { detailJob, countBrowseRecord } from '@/api/com/recruit';
  import resumeItemSelect from '@/views/web/user/resume/list-item-select';
	export default {
		components: { 
			listEvaluate,
			resumeItemSelect
		},
		computed: {
	    ...mapGetters([
	      'account',
	      'id'
	    ])
	  },
		data() {
			return {
				jobId: this.$route.query.id,
				dialogResumeList: false,
				job: {
	        company: {
	            account: "",
	            companyName: "",
	            id: '',
	            industry: "",
	            introduce: "",
	            linkName: "",
	            linkPhone: "",
	            location: "",
	            openId: "",
	            password: "",
	            pic: "",
	            scale: "",
	            state: '',
	            webUrl: ""
	        },
	        companyId: '',
	        companyLogo: "",
	        companyName: "",
	        evaluates: [],
	        id: '',
	        income: "",
	        jobLabels: [],
	        jobName: "",
	        jobType: '',
	        jobTypeStr: "",
	        linkName: "",
	        linkPhone: "",
	        major: "",
	        qualificate: "",
	        receiveEmail: "",
	        recruitNumber: '',
	        releaseTime: "",
	        state: '',
	        workAddress: "",
	        workCity: "",
	        workExperience: ""
	    	},
			}
		},
		mounted() {
			this.getDetails();
			if(this.id == '') countBrowseRecord(0);
			else countBrowseRecord(this.id);
		},
		methods: {
			getDetails(){
				let query={
					id: this.$route.query.id
				}
				detailJob(query).then(res => {
					this.job = res.job;
					this.countBrowseRecord();
				})
			},
			handlerDelivery(){
				if(this.account.length == 0){
					this.$message.error('请先登陆！！！');
					return;
				}
				this.dialogResumeList = true;
			},
      dialogResumeListClose(val){
        this.dialogResumeList = val
      },
      countBrowseRecord(type){
      	countBrowseRecord({userId:type,jobId:this.job.id})
      }
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss">
	.recruit_look{
		.recruit_details{
			padding: 37px 30px;
			.top_wrap{
				border-bottom: 1px solid #E0E0E0;
				.name{
					font-size: 24px;
					line-height: 50px;
					display: inline-block;
				}
			}
		}
		.com-info{

			padding: 45px 30px;
			.logo{
				width: 80px;
				height: 80px;
			}
			.name{
				font-size: 16px;
				color: #555;
			}
			.item{
				font-size: 14px;
				color: #808080;
				line-height: 25px;
				margin-bottom: 15px;
				span{
					display: block;
					float: left;
					font-size: 16px;
				}
				font{
					margin-left: 30px;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 5;
					overflow: hidden;
				}
			}
		}
		.evaluate_wrap{
			padding: 10px 30px;
			.title{
				font-weight: 400;
				font-size: 18px;
				line-height: 50px;
				display: inline-block;
				padding-right: 15px;
				background-color: #fff;
				margin: 0;
			}
			.evaluate_list{
				border-top: 1px solid rgba(135,141,153,.4);
				margin-top: -25px;
				padding: 30px 0 40px;
			}
		}
	}
</style>
