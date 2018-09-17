<template>
	<div class="bg-gray pb100">
		<div class="user-bg">
			<div class="breadcrumb-wrap container">
				<el-breadcrumb separator="/">
				  <!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item> -->
				  <el-breadcrumb-item :to="{ path: '/com/inbox/list' }">谁来应聘</el-breadcrumb-item>
				  <el-breadcrumb-item>简历详情</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
		</div>
		<div class="section user-wrap small_container panel_white ">
			<div class="about_intro">
        <el-form :model="user_info" ref="user_info" label-width="100px">
        	<el-row>
	  				<el-col :span="24">
		  				<el-form-item style="margin-left:-100px;">
		    				<div class="user-img mb20" :style="'background-image:url('+user_info.pic =='' ? '/static/logo.png' : user_info.pic+')'"></div>
		    			</el-form-item>
		    		</el-col>
		    		<el-col :span="24">
	    				<el-form-item style="margin-left:-100px;">
	              <h4 class="t-center">
	                  <span>{{user_info.linkName}}</span>
	              </h4>
	            </el-form-item>
	          </el-col>
						<!-- 基本信息 -->
						<el-col :span="12">
              <el-form-item label="联系方式:" >
                	<span v-if="resumeState != 0 && resumeState != 1 && resumeState != 4 ">{{user_info.linkPhone}}</span>
	                  <span v-else>
	                  	<font v-if="resumeState != 4">邀请面试后可查看</font>
	                  	<font v-else>因拒绝无法查看</font>
	                  </span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
          		<el-form-item label="年龄:" >
              	<span>{{user_info.age}}</span>
          		</el-form-item>
          	</el-col>
            <el-col :span="6">
          		<el-form-item label="性别:" >
              	<span>{{user_info.sexStr}}</span>
          		</el-form-item>
          	</el-col>
          </el-row>
          <el-row>
					  <el-col :span="6">
            	<el-form-item label="在职状态:" >
              	<a href="#">{{user_info.working}}</a>
            	</el-form-item>
            </el-col>
						<el-col :span="18">
					    <el-form-item label="期望工作:" class="mb0">
					      <div class="expect_wrap">
									<el-row>
										<el-col :span="6">
											<icon-svg icon-class="ffan_lingdai" />
											<span>{{user_info.expectJob}}</span>
										</el-col>
										<el-col :span="8">
											<icon-svg icon-class="dibiao" />
											<span>{{user_info.expectAddress}}</span>
										</el-col>
										<el-col :span="8" :offset="2">
											<icon-svg icon-class="bill-copy" />
											<span>{{user_info.expectIncome}}</span>
										</el-col>
									</el-row>
								</div>
					    </el-form-item>
					  </el-col>
					</el-row>
					<el-row>
						<el-col :span="24">
            	<el-form-item label="自我介绍:" label-width="100px">
            		<span>{{user_info.selfIntro  }}</span>
            	</el-form-item>
            </el-col>
					</el-row>
					<el-row>
					  <el-col :span="24">
					    <el-form-item label="应聘标签:" >
								<el-tag 
									v-for="tag in user_info.labelName"
									:key="tag" class="mr5">{{tag}}</el-tag>
					    </el-form-item>
					  </el-col>
        	</el-row>
				</el-form>
      </div>
		</div>

		<div class="small_container section panel_white mb40 t-center" v-if="user_info.workList.length !=0 ">
			<div class="section_title">
				<h4>我的经验</h4>
				<div></div>
				<p>以前的工作有助于经验的收集</p>
			</div>
			<div>
				<el-table
			    :data="user_info.workList"
			    :show-header="false"
			    style="width: 100%">
			    <el-table-column
			      property="companyName">
			    </el-table-column>
			    <el-table-column>
			      <template slot-scope="scope">
			        <el-popover trigger="hover" placement="top">
			          <p>工作描述: {{ scope.row.workContent }}</p>
			          <span slot="reference">{{ scope.row.workJob }}</span>
			        </el-popover>
			      </template>
			    </el-table-column>
			    <el-table-column
			      property="endDate">
			      <template slot-scope="scope">
			      	<span>{{scope.row.endDate}}</span>
			      </template>
			    </el-table-column>
			  </el-table>
			</div>
		</div>

		<div class="small_container section panel_white mb40 t-center" v-if="user_info.eduList.length != 0">
			<div class="section_title">
				<h4>我的教育</h4>
				<div></div>
				<p>教育的根源很苦，但果实甜美集</p>
			</div>
			<div>
				<el-table
			    :data="user_info.eduList"
			    :show-header="false"
			    style="width: 100%">
			    <el-table-column property="schoolName"></el-table-column>
			    <el-table-column property="major"></el-table-column>
			    <el-table-column property="qualificate"></el-table-column>
			    <el-table-column property="graduateYear"></el-table-column>
			  </el-table>
			</div>
		</div>

		<div class="section honor_wrap" v-if="user_info.certificate.length != 0">
			<div class="container">
				<div class="section_title">
					<h4>荣誉</h4>
					<div></div>
					<p>荣誉应该是结果，而不是行为的动机。</p>
				</div>
				<el-row>
				  <el-col :span="8" v-for="(o, index) in user_info.certificate" :key="index">
				    <el-card class="mb40" :style="'background-image:url('+ o.src +')'">
					      <div style="padding-top:100%;overflow:hidden;">
					        <div class="bg-color" style="margin-top:-100%;">
					        	<div class="honor_text">
					        		<!-- <p>2017年6月12</p> -->
					        		<p>{{o.text}}</p>
					        	</div>
					        </div>
					    </div>
				    </el-card>
				  </el-col>
				</el-row>
			</div>
		</div>

		<div class="fixed-edit" v-if="type == 3">
			<ul>
				<transition name="el-zoom-in-center" v-if="!resume_is_collect">
					<li class="bg-info" @click="resumeCollect">收<br>藏</li>
				</transition>
				<transition name="el-zoom-in-center" v-if="resume_is_collect">
					<li class="bg-info" @click="delResumeCollect">取消<br>收藏</li>
				</transition>
				<transition name="el-zoom-in-center" v-if="resumeState == 2 ">
					<li style="background:#67c23a" @click="is_entry_dialog = true">同意<br>入职</li>
				</transition>
				<transition name="el-zoom-in-center" v-if="resumeState == 3">
					<li style="background:#67c23a">成功<br>入职</li>
				</transition>
				<transition name="el-zoom-in-center" v-if="resumeState == 4">
					<li class="bg-danger">已<br>拒<br>绝</li>
				</transition>
				<transition name="el-zoom-in-center" v-if="resumeState == 0 || resumeState == 1">
					<li style="background:#67c23a" @click="is_agree_dialog = true">邀请<br>面试</li>
				</transition>
				<transition name="el-zoom-in-center" v-if="resumeState != 3 && resumeState != 4">
					<li class="bg-danger" @click="is_refuse_dialog = true">拒<br>绝</li>
				</transition>
			</ul>
		</div>
		<el-dialog
		  title="邀请信息"
		  :visible.sync="is_agree_dialog"
		  width="30%">
		  <el-form :model="agreeForm" label-width="100px">

		    <el-form-item label="联系人">
		      <el-input v-model="agreeForm.interviewLinker" auto-complete="off"></el-input>
		    </el-form-item>

		    <el-form-item label="联系方式">
		      <el-input v-model="agreeForm.interviewTel" auto-complete="off"></el-input>
		    </el-form-item>
		    
		    <el-form-item label="面试时间">
		      <el-date-picker
		      	style="width: 100%"
			      v-model="agreeForm.interviewTime"
			      :picker-options="pickerOptions"
			      value-format="yyyy 年 MM 月 dd 日 HH 点 m 分"
			      type="datetime"
			      format="yyyy 年 MM 月 dd 日 HH 点 m 分"
			      placeholder="选择面试时间">
			    </el-date-picker>
		    </el-form-item>
		    
		    <el-form-item label="面试地点">
		      <el-input v-model="agreeForm.interviewAddr" auto-complete="off"></el-input>
		    </el-form-item>
		    
		    <el-form-item label="携带物品">
		      <el-input v-model="agreeForm.itemName" auto-complete="off"></el-input>
		    </el-form-item>
		    
		    <el-form-item label="备注">
		      <el-input v-model="agreeForm.interviewRemark" type="textarea" auto-complete="off"></el-input>
		    </el-form-item>

		  </el-form>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="is_agree_dialog = false">取 消</el-button>
		    <el-button type="primary" @click="updateInbox">确 定</el-button>
		  </span>
		</el-dialog>

		<el-dialog
		  title="邀请入职"
		  :visible.sync="is_entry_dialog"
		  width="30%">
		  <span>确定同意<font class="c-blue">{{user_info.linkName}}</font>入职申请么?</span>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="is_entry_dialog = false">取 消</el-button>
		    <el-button type="primary" @click="handleEntry">确 定</el-button>
		  </span>
		</el-dialog>

		<el-dialog
		  title="拒绝原因"
		  :visible.sync="is_refuse_dialog"
		  width="30%">
		  <el-form :model="refuseForm" label-width="100">
		    
		    <el-form-item label="原因">
		      <el-input v-model="refuseForm.interviewConclusion" type="textarea" auto-complete="off"></el-input>
		    </el-form-item>

		  </el-form>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="is_refuse_dialog = false">取 消</el-button>
		    <el-button type="primary" @click="refuseInbox">确 定</el-button>
		  </span>
		</el-dialog>
	</div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { getResumeDetails } from '@/api/student/resume';
  import { resumeCollect,resumeIsCollect,delResumeCollect } from '@/api/com/collect';
  import { updateInbox, refuseInbox } from '@/api/com/inbox';
  import { changeURLPar } from '@/utils/index';
  export default {
    computed: {
      ...mapGetters([
        'name',
        'id',
        'age',
        'type',
        'linkPhone',
        'linkName'
      ])
    },
  	data() {
  		return {
  			is_agree_dialog: false,
  			is_refuse_dialog: false,
  			is_entry_dialog: false,
  			resume_is_collect: false,
  			pickerOptions: {
          disabledDate(time) {
            return time.getTime() <= Date.now();
          }
        },
  			user_info: {
  				studentId: '',
  				pic: "",
  				linkName: '',
  				linkPhone: '',
  				certificate: '',
  				selfIntro: '',
  				skillDescript: '',
  				sexStr: '',
  				labelName: [],
  				working: '',
  				expectAddress: '',
  				expectIncome: '',
  				expectJob: '',
  				work: [],
  				edu: [],
  				eduList: [],
  				workList: []
  			},
  			agreeForm: {
  				id: '',
  				// type: '0',
  				resumeState: '1',
  				interviewLinker: '',
  				interviewTel: '',
					interviewTime: '',
					interviewAddr: '',
					itemName: '',
					interviewRemark: ''
  			},
  			refuseForm: {
  				id: '',
  				type: 1,
  				resumeState: '',
					interviewConclusion: ''
  			},
  			resumeState: '',
  		}
  	},
  	mounted(){
  		this.setDefault();
  		this.getInfo();
  		this.resumeIsCollect();
  	},
  	methods: {
  		setDefault(){
  			this.agreeForm.id = typeof this.$route.query.deliveryId == 'undeined' ? '' : this.$route.query.deliveryId;
  			this.refuseForm.id = this.agreeForm.id;
  			this.resumeState = typeof this.$route.query.resumeState == 'undefined' ? 0 : this.$route.query.resumeState;

  			this.agreeForm.interviewLinker = this.linkName;
  			this.agreeForm.interviewTel = this.linkPhone;
  		},
  		getInfo(){
  			let id = this.$route.query.id;
  			getResumeDetails({id}).then(res => {
  				if(typeof res == 'undefined') return;
  				let data = res.resume;
  				var arr_to_json = ['certificate']
  				for(let index in data){
  					if(index == 'labelName'){
  						this.user_info[index] = data[index] == '' ? [] : data[index].split(',');
  					}else if(arr_to_json.indexOf(index) != -1){
  							console.log(index)
  							this.user_info[index] = JSON.parse(data[index]) || [];
  					}else{
  						this.user_info[index] = data[index];
  					}
  				}
  			})
  		},
  		// 同意入职
  		handleEntry(){
  			let query = this.$route.query;
  			this.is_entry_dialog = false;
  			this.agreeForm.resumeState = 3
  			updateInbox(this.agreeForm).then(res => {
  				this.resumeState = 3;

  				this.$router.push({path: '/search/student-details',query:{id: query.id,deliveryId: query.deliveryId,resumeState:3, is_com_look: query.is_com_look}});
  			})
  		},
  		// 邀请面试
  		updateInbox(){
  			let query = this.$route.query;
  			this.is_agree_dialog = false;
  			// this.agreeForm.type = 0;
  			this.agreeForm.resumeState = 2;
  			updateInbox(this.agreeForm).then(res => {
  				this.resumeState = 2;

  				this.$router.push({path: '/search/student-details',query:{id: query.id,deliveryId: query.deliveryId,resumeState:2, is_com_look: query.is_com_look}});
  			})
  		},
  		// 拒绝
  		refuseInbox(){
  			let query = this.$route.query;
  			this.is_refuse_dialog = false;
  			this.refuseForm.resumeState = 4;
  			refuseInbox(this.refuseForm).then(res => {
  				this.resumeState = 4;

  				this.$router.push({path: '/search/student-details',query:{id: query.id,deliveryId: query.deliveryId,resumeState:4, is_com_look: query.is_com_look}});
  			})
  		},
  		// 搜藏
  		resumeCollect(){
  			resumeCollect({companyId: this.id, resumeId: this.$route.query.id}).then( res => {
  				if(res.success){
  					this.resume_is_collect = true;
  					this.$message.success('收藏成功');
  				}
  			})
  		},
  		resumeIsCollect(){
  			resumeIsCollect({companyId: this.id, resumeId: this.$route.query.id}).then(res => {
  					if(res.state == 0) this.resume_is_collect = true;
  					else this.resume_is_collect = false;
  			})
  		},
  		delResumeCollect(){
  			delResumeCollect({companyId: this.id, resumeId: this.$route.query.id}).then(res => {
  					if(res.success){
  					this.resume_is_collect = false;
  					this.$message.success('已取消收藏');
  				}
  			})
  		}
  	}
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "src/styles/mixin.scss";
	.user-bg{
		height: 445px;
		width: 100%;
		background: url(/static/banner/slider2-2377c67b76.jpg) center no-repeat;
		background-size: cover;
		.breadcrumb-wrap{
			padding: 80px 0 0;
		}
	}
	.section_title{
		text-align: center;
		margin-bottom: 50px;
		>div{
			border-bottom: solid 2px #457aff;
	    margin: 10px auto;
	    max-width: 50px;
		}
	}
	.user-wrap{
    margin-top: -250px;
    margin-bottom: 40px;
    padding: 25px;
    background-color: #FFFFFF;
    .about_intro {
	    text-align: left;
	    margin: 0 auto;
	    max-width: 100%;
	    .el-form-item{margin-bottom: 0}
	    .user-img{
				width: 80px;
				height: 80px;
				text-align: center;
				overflow: hidden;
				background: url(/static/logo.png) center no-repeat;
				background-size: cover;
				margin: 0 auto;
				border-radius: 100%;
				box-shadow: 0 0 2px 4px #f7f7f7;
				position: relative;
				.avatar-uploader{
					font-size: 50px;
					border: 1px solid #ccc;
					border-radius: 8px;
					height: 100%;
					width: 100%;
				}
				.change_img-remind{
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					line-height: 20px;
					font-size: 14px;
					color: #fff;
					padding-top: 18px;
					text-align: center;
					background-color: rgba(0,0,0,.3);
				}
	    }
	    h4{
	    	text-transform: uppercase;
		    color: #333333;
		    font-weight: 800;
		    letter-spacing: 1px;
		    margin-bottom: 10px;
		    margin-top: 5px;
		    font-size: 20px;
		    height: 30px;
	    }
	    h5{
	    	margin-bottom: 10px;
		    color: #555;
		    font-size: 17px;
		    font-weight: 500;
	    }
	    .border_bottom_list{
	    	li{
	    		line-height: 46px;
	    		padding: 0;
	    		.el-input{
	    			width: 50%;
	    		}
	    		.el-select{
	    			.el-input{
	    				width: 100%;
	    			}
	    		}
	    	}
	    }
		}
	}
	.expect_wrap{
		color: #555;
		font-size: 14px;
		.el-input{
			width: 60%
		}
	}
	.skill_wrap{
		p{
			line-height: 25px;
			margin-bottom: 5px;
		}
		.el-progress{
			margin-bottom: 25px;
		}
	}
	.honor_wrap{
		.el-card{
			width: 85%;
			margin: 0 auto;
			background-size: 55%;
			background-position: center;
			background-repeat: no-repeat;
			position: relative;
			@include transition;
			&:hover{
				background-size: 75%;
				.el-card__body{
					background-color: rgba(0,0,0,.8);
				}
				.honor_text{
					bottom: 10px;
					color: #fff
				}
			}
			.el-card__body{
				@include transition;
			}
			.honor_text{
				position: absolute;
				bottom: 0;
				left: 20px;
				width: 100%;
				line-height: 25px;
				color: #333;
				@include transition;
			}
		}
		img{
			width: 100%;
			height: 100%;
		}
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

.border_bottom_list {
  padding: 0;
  margin: 0;
  list-style: none;
  li {
    text-transform: capitalize;
    padding: 12px 0;
    font-size: 16px;
    border-bottom: 1px solid #f7f7f7;
    .list_title {
      display: block;
      min-width: 95px;
      font-weight: 500;
      letter-spacing: 0;
      float: left;
      color: #000000;
    }
  }
}
</style>