<template>
	<div style="background:url(/static/banner/西湖.jpg) no-repeat center / cover;min-height:calc(100vh - 95px)">
		<div class="breadcrumb-wrap container pt95">
			<el-breadcrumb separator="/">
			  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			  <el-breadcrumb-item>投递列表</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="container pt30 pb50 delivery_list">
			<el-tabs type="border-card" v-model="active_list.tabs" @tab-click="getList">
			  <el-tab-pane
			  	v-for="tab in tabList"
			  	:key="tab.name"
			    :label="tab.title"
			    :name="tab.name">
			    <div v-loading="loading">
				  	<el-row :gutter="20">
						  <el-col :span="12" v-for='item in list' :key="item.id">
						  	<div class="box mb15">
						  		<div class="box_top">
							  		<h2 class="position_name">
							  			<router-link :to="{path: '/search/list/details', query:{id: item.jobId}}">
							  				{{item.jobName}}
							  				<span>{{item.income}}</span>
							  			</router-link>
							  		</h2>
							  		<div class="com_info">
							  			<router-link :to="{path:'/search/com-details', query:{id:item.companyId}}">
								  			{{item.companyName}}
								  			<font>[厦门市]</font>
							  			</router-link>
							  		</div>
							  		<div class="resume clearfix">


									  	<el-button v-if="typeof item.interviewEvaluate == 'undefined' && (item.resumeState == 3 || item.resumeState == 4)" class="pull-right ml5" size="mini" type="primary" @click="getEvaluateEvent(item)">评价</el-button>

							  			<el-popover
											  placement="left-end"
											  width="540"
											  trigger="hover">
								        <div class="contact_info">
								        	<el-alert
								        		v-if="typeof item.stateStr.alert != undefined"
												    :title="item.interviewConclusion == '' ? item.stateStr.alert_text : item.interviewConclusion"
												    :type="item.stateStr.alert"
												    class="mt10"
												    :class="{'mb10': item.stateStr.type == 'danger' || item.stateStr.type == 'text' || item.interviewLinker == ''}"
												    :closable="false">
												  </el-alert>
								          <el-form
								          	v-if="item.resumeState == 2 && item.interviewLinker != ''"
								          	label-position="left"
								          	label-width="70px"
								          	inline
								          	class="demo-table-expand">
								          	<el-row>
								          		<el-col :span="12">
											          <el-form-item label="联系人">
											            <span>{{item.interviewLinker}}</span>
											          </el-form-item>
											        </el-col>
								          		<el-col :span="12">
											          <el-form-item label="联系电话">
											            <span>{{item.interviewTel}}</span>
											          </el-form-item>
											        </el-col>
								          		<el-col :span="12">
											          <el-form-item label="面试地点">
											            <span>{{item.interviewAddr}}</span>
											          </el-form-item>
											        </el-col>
								          		<el-col :span="12">
											          <el-form-item label="携带物品">
											            <span>{{item.itemName}}</span>
											          </el-form-item>
											        </el-col>
								          		<el-col :span="24">
											          <el-form-item label="面试时间">
											            <span>{{item.interviewTime}}</span>
											          </el-form-item>
											        </el-col>
								          		<el-col :span="24">
											          <el-form-item label="备注">
											            <span>{{item.interviewRemark}}</span>
											          </el-form-item>
											        </el-col>
											      </el-row>
									        </el-form>

								          <el-form
								          	v-if="(item.resumeState == 4 || item.resumeState == 3) && typeof item.interviewEvaluate != 'undefined'"
								          	label-position="left"
								          	inline
								          	class="demo-table-expand"
								          	label-width="70px">
								          	<el-row>
								          		<el-col :span="24" class="mb10">
											          <el-form-item label="评分">
											            <el-rate
																    v-model="item.interviewEvaluate.score"
																    show-text
																    disabled
																    :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
																    style="padding: 8px 0">
																  </el-rate>
											          </el-form-item>
											        </el-col>
								          		<el-col :span="24" class="mb10">
											          <el-form-item label="评价内容">
											          	<span>{{item.interviewEvaluate.evaluateContent}}</span>
											          </el-form-item>
											        </el-col>
											        <!-- <el-form-item label="   " class="mb15">
										            <el-button
										            	class="ml5"
										            	size="mini" 
										            	type="primary"
										            	@click="submitEvaluate(item)">提交</el-button>
										          </el-form-item> -->
											      </el-row>
									        </el-form>

								        </div>

									  		<el-button slot="reference" v-if="item.resumeState == 1 || item.resumeState == 2" class="pull-right ml5" size="mini" :type="item.stateStr.type">{{item.stateStr.text}}</el-button>

									  		<el-button slot="reference" v-if="item.resumeState == 3 || item.resumeState == 4" class="pull-right ml5" size="mini" :type="item.stateStr.type">{{item.stateStr.text}}</el-button>

									    </el-popover>
											
											<el-tooltip v-if="item.resumeState == 0" effect="dark" content="等待企业反馈" placement="top-start">
							  				<el-button class="pull-right ml5" size="mini" :type="item.stateStr.type">{{item.stateStr.text}}</el-button>
											</el-tooltip>
							  			<span class="pull-right">{{item.deliveryTime}}</span>
							  		</div>
							  	</div>
						  	</div>
						  </el-col>
						</el-row>
						<div class="pull-right">
							<el-pagination
		            @current-change="handleCurrentChange"
		            :current-page.sync="listQuery.pageNo"
		            :page-size="listQuery.pageSize"
		            layout="total, prev, pager, next"
		            :total="total">
		          </el-pagination>
		        </div>
	        </div>
			  </el-tab-pane>
			</el-tabs>
		</div>
		<el-dialog
		  title="填写面试评价"
		  :visible.sync="dialogEvaluate"
		  width="30%">
		  <el-form :model="form">
		    <el-form-item label="评分" label-width="100px">
		      <el-rate
				    v-model="form.score"
				    show-text
				    :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
				    style="padding: 8px 0">
				  </el-rate>
		    </el-form-item>
		    <el-form-item label="评价内容" label-width="100px">
		      <el-input type="textarea" v-model="form.evaluateContent"></el-input>
		    </el-form-item>
		  </el-form>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogEvaluate = false">取 消</el-button>
		    <el-button type="primary" @click="submitEvaluate">确 定</el-button>
		  </span>
		</el-dialog>
	</div>
</template>
<script>
	import { mapGetters } from 'vuex';
  import { deliveryList, editEvaluate } from '@/api/student/delivery';
  import { parseTime } from '@/utils/index';
	export default {
		computed: {
	    ...mapGetters([
	      'id'
	    ])
	  },
		data() {
			return {
				active_list: {
					tabs: '5'
				},
				tabList: [{
          title: '全部',
          name: '5',
        }, {
          title: '投递成功',
          name: '0',
        }, {
          title: '企业邀请',
          name: '2',
        }, {
          title: '面试通过',
          name: '3',
        }, {
          title: '无结果',
          name: '4',
        }],
				listQuery: {
					pageNo: 1,
					pageSize: 10,
					studentId: '',
					resumeState: "",
				},
				total: 0,
				loading: false,
				form: {
					evaluatetime: parseTime(new Date, '{y}-{m}-{d} {h}:{i}:{s}'),
      		jobId: '',
      		studentId: '',
      		score: 0,
      		evaluateContent: ''
				},
				list: [],
				dialogEvaluate: false,
				evaluateEvent:[]
			}
		},
		mounted() {
			this.form.studentId = this.id;
			this.getList('5');
		},
		methods: {
			getList(val) {
				this.loading = true;
				val = val.name;
				val = val > 4 ? '' : val;
				this.listQuery.resumeState = val;
				this.listQuery.studentId = this.id;
				deliveryList(this.listQuery).then(res => {
					if (typeof res == 'undefined') return;
					for(let i=0; i<res.list.length; i++){
		  			this.$set(res.list[i], 'stateStr', this.gerAlertType(res.list[i].resumeState));
		  			this.$set(res.list[i], 'evaluate_content', '');
		  			this.$set(res.list[i], 'score', 0);
		  		}

					this.list = res.list;
					this.total = res.total;
					this.loading = false;
				})
			},
			gerAlertType(type) {
				switch (type) {
					case 0:
					return {
							type: 'text',
							text: '等待通知'
						}
						break;
					case 2:
						return {
							type: 'primary',
							text: '待参加面试',
							alert:'success',
							alert_text: '提示:  你的简历已经通过初筛，企业可能会在近期与你沟通，请保持联系方式畅通'
						}
						break;
					case 3:
						return {
							type: 'success',
							text: '面试成功',
							alert:'success',
							alert_text: '即将开始工作，请做好工作前的准备'
						}
						break;
					case 4:
						return {
							type: 'danger',
							text: '无结果',
							alert: 'warning',
							alert_text: '非常荣幸收到您的简历，经过我们评估，认为您与该职位不太合适，无法进入面试阶段'

						}
						break;
				}
			},
			handleCurrentChange(val) {
        this.listQuery.pageNo = val;
        this.getList(this.active_list.tabs);
      },
      getEvaluateEvent(item){
      	this.dialogEvaluate = true;
      	this.evaluateEvent = item;
      },
      submitEvaluate(){
      	this.form.jobId = this.evaluateEvent.jobId;
      	if(this.form.evaluateContent == ''){
					this.$message.error('评价内容不能为空！！！');
					return;
      	}
      	editEvaluate(this.form).then(res => {
      		if(res.success) this.$message.success('评价成功');
      		else this.$message.error('评价失败，请刷新重试！！！');
      		this.getList(this.active_list.tabs);
      		this.dialogEvaluate = false;
      	})
      }
		}
	}
</script>
<style rel="stylesheet/scss" lang="scss">
	.delivery_list{
		.box{
			border-bottom: 1px solid #EAEEED;
			.box_top{
				border: 1px solid #EAEEED;
				border-left: 3px solid #20a0ff;
				border-bottom: 0px solid;
				padding: 3px 12px;
				.position_name{
					padding: 5px 0 0;
					font-size: 18px;
					font-weight: 400;
					a{
						color: #20a0ff;
					}
					span{
						font-size: 16px;
						color: #e6775c
					}
				}
				.com_info{
					font-size: 15px;
					color: #555;
					font{
						color: #999;
					}
				}
				.resume{
					margin: 5px 0;
					color: #999;
					font-size: 14px;
					line-height: 30px;
					font{
						color: #555;
					}
					.el-button{
						vertical-align: middle;
						font-size: 14px;
					}
				}
			}
		}
	}
	.contact_info{
		border: 1px solid #EAEEED;
		padding: 0px 15px 0;
		background-color: #eaeeed;
	}
	.el-form-item{
		margin-bottom: 0;
	}
</style>