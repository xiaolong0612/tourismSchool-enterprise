<template>
	<div class="bg-gray pb100">
		<div class="user-bg">
			<div class="breadcrumb-wrap container">
				<el-breadcrumb separator="/">
				  <!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item> -->
				  <el-breadcrumb-item :to="{ path: '/com/inbox/list' }">收件列表</el-breadcrumb-item>
				  <el-breadcrumb-item>简历详情</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
		</div>
		<div class="section user-wrap small_container panel_white ">
			<div class="about_intro">
        <el-row>
        		<el-col :span="10">
        				<div class="user-img" :style="'background-image:url()'">
        				</div>
        				
            </el-col>
        		<el-col :span="14">
                <h4>
                    <span>{{user_info.linkName}}</span>
                </h4>
                <ul class="border_bottom_list">
										<!-- 基本信息 -->
                    <li class="clearfix">
                    	<strong class="list_title">tel : </strong>
                    	<span>{{user_info.linkPhone}}</span>
                    </li>
                    <li class="clearfix">
                    	<strong class="list_title">年龄:</strong>
                    	<span>{{age}}</span>
                   	</li>
                    <li class="clearfix">
                    	<strong class="list_title">在职状态: </strong>
                    	<span>{{user_info.working}}</span>
                    </li>
                </ul>
								<el-form label-width="80px" label-position="left" class="mt25">

							    <el-form-item label="个性标签" >
							      <div class="small_container">
											<el-tag 
												v-for="tag in user_info.labelName"
												:key="tag">{{tag}}</el-tag>
										</div>
							    </el-form-item>

							    <el-form-item label="期望工作" class="mb0">
							      <div class="expect_wrap">
												<el-row>
													<el-col :span="12">
														<icon-svg icon-class="ffan_lingdai" />
														<span>{{user_info.expectJob}}</span>
													</el-col>
													<el-col :span="12">
														<icon-svg icon-class="dibiao" />
														<span>{{user_info.expectAddress}}</span>
													</el-col>
													<el-col :span="12">
														<icon-svg icon-class="bill-copy" />
														<span>{{user_info.expectIncome}}</span>
													</el-col>
												</el-row>
											</div>
							    </el-form-item>

							  </el-form>


            </el-col>
        </el-row>
      </div>
		</div>

		<div class="small_container section panel_white mb40">
			<div class="section_title">
				<h4>我的经验</h4>
				<div></div>
				<p>以前的工作有助于经验的收集</p>
			</div>
			<div>
				<el-table
					v-show="user_info.work.length != 0"
			    :data="user_info.work"
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

		<div class="small_container section panel_white mb40">
			<div class="section_title">
				<h4>我的教育</h4>
				<div></div>
				<p>教育的根源很苦，但果实甜美集</p>
			</div>
		</div>

		<div class="section honor_wrap">
			<div class="container">
				<div class="section_title">
					<h4>荣誉</h4>
					<div></div>
					<p>荣誉应该是结果，而不是行为的动机。</p>
				</div>
				<el-row>
				  <el-col :span="8" v-for="(o, index) in 3" :key="o">
				    <el-card style="background-image:url(/static/img/zhengshu.jpg)">
					      <div style="padding-top:100%;overflow:hidden;">
					        <div class="bg-color" style="margin-top:-100%;">
					        	<div class="honor_text">
					        		<p>2017年6月12</p>
					        		<p>厦门大学所奖</p>
					        	</div>
					        </div>
					    </div>
				    </el-card>
				  </el-col>
				</el-row>
			</div>
		</div>

		<div class="fixed-edit" v-if="is_com_look">
			<ul>
				<transition name="el-zoom-in-center" v-if="resumeState == 2 || resumeState == 1">
					<li style="background:#67c23a">已<br>邀<br>请</li>
				</transition>
				<transition name="el-zoom-in-center" v-if="resumeState == 3">
					<li class="bg-danger">已<br>拒<br>绝</li>
				</transition>
				<transition name="el-zoom-in-center" v-if="resumeState == 0">
					<li style="background:#67c23a" @click="is_agree_dialog = true">同<br>意</li>
				</transition>
				<transition name="el-zoom-in-center" v-if="resumeState == 0">
					<li class="bg-danger" @click="is_refuse_dialog = true">拒<br>绝</li>
				</transition>
			</ul>
		</div>
		<el-dialog
		  title="邀请信息"
		  :visible.sync="is_agree_dialog"
		  width="30%">
		  <el-form :model="agreeForm" label-width="100">

		    <el-form-item label="联系人">
		      <el-input v-model="agreeForm.interviewLinker" auto-complete="off"></el-input>
		    </el-form-item>

		    <el-form-item label="联系方式">
		      <el-input v-model="agreeForm.interviewTel" auto-complete="off"></el-input>
		    </el-form-item>
		    
		    <el-form-item label="面试时间">
		      <el-input v-model="agreeForm.interviewTime" auto-complete="off"></el-input>
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
		  title="邀请信息"
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
  import { updateInbox, refuseInbox } from '@/api/com/inbox';
  export default {
    computed: {
      ...mapGetters([
        'name',
        'id',
        'age'
      ])
    },
  	data() {
  		return {
  			is_agree_dialog: false,
  			is_refuse_dialog: false,
  			is_com_look: false,
  			user_info: {
  				studentId: '',
  				pic: "",
  				linkName: '',
  				linkPhone: '',
  				certificate: '',
  				selfIntro: '',
  				skillDescript: '',
  				pic: '',
  				labelName: [],
  				working: '',
  				expectAddress: '',
  				expectIncome: '',
  				expectJob: '',
  				work: [],
  				edu: []
  			},
  			agreeForm: {
  				id: '',
  				interviewLinker: '1',
  				interviewTel: '1',
					interviewTime: '1',
					interviewAddr: '1',
					itemName: '1',
					interviewRemark: '1'
  			},
  			refuseForm: {
  				id: '',
  				type: 1,
  				resumeState: 3,
					interviewConclusion: '1'
  			},
  			resumeState: '',
  		}
  	},
  	mounted(){
  		this.setDefault();
  		this.getInfo();
  	},
  	methods: {
  		setDefault(){
  			this.is_com_look = typeof this.$route.query.is_com_look == 'undeined' ? false : true;
  			this.agreeForm.id = typeof this.$route.query.deliveryId == 'undeined' ? '' : this.$route.query.deliveryId;
  			this.refuseForm.id = this.agreeForm.id;
  			this.resumeState = this.$route.query.resumeState;
  		},
  		getInfo(){
  			let id = this.$route.query.id;
  			getResumeDetails({id}).then(res => {
  				if(typeof res == 'undefined') return;
  				let data = res.resume;
  				for(let index in data){
  					if(index == 'labelName'){
  						this.user_info[index] = data[index] == '' ? [] : data[index].split(',');
  					}else{
  						this.user_info[index] = data[index];
  					}
  				}
  			})
  		},
  		updateInbox(){
  			this.is_agree_dialog = false;
  			updateInbox(this.agreeForm).then(res => {
  				console.log(res)
  				this.resumeState = 2;
  			})
  		},
  		refuseInbox(){
  			this.is_refuse_dialog = false;
  			refuseInbox(this.refuseForm).then(res => {
  				console.log(res)
  				this.resumeState = 3;
  				console.log(this.$route.query.resumeState)
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
		background: url(/static/img/background/长城.jpg) center top 98% no-repeat;
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
	    .user-img{
				width: 325px;
				height: 345px;
				line-height: 345px;
				text-align: center;
				overflow: hidden;
				background: url(/static/img/default-img/user.jpg) center no-repeat;
				background-size: cover;
				border-radius: 8px;
				position: relative;
				.avatar-uploader{
					font-size: 50px;
					border: 1px solid #ccc;
					border-radius: 8px;
					height: 100%;
					width: 100%;
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
					opacity: 1;
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
				color: #fff;
				opacity: 0;
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