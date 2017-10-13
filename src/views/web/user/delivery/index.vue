<template>
	<div>
		<div class="breadcrumb-wrap container pt95">
			<el-breadcrumb separator="/">
			  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			  <el-breadcrumb-item>投递列表</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="container pt30 pb100 delivery_list">
			<el-tabs type="border-card">
			  <el-tab-pane label="全部">
			  	<el-row :gutter="20">
					  <el-col :span="12" v-for='item in list' :key="item.recruit">
					  	<div class="box mb15">
					  		<div class="box_top">
						  		<h2 class="position_name">
						  			<router-link to="/">
						  				{{item.recruit}}
						  				<span>{{item.salary}}</span>
						  			</router-link>
						  		</h2>
						  		<div class="com_info">
						  			<router-link to="/">
							  			{{item.company.name}}
							  			<font>[{{item.address}}]</font>
						  			</router-link>
						  		</div>
						  		<div class="resume clearfix">
						  			<el-button class="pull-right ml5" size="small" type="text">等待通知</el-button>
						  			<span class="pull-right">{{item.time}}</span>
						  			<span>使用简历:</span>
						  			<font>简历一</font>
						  		</div>
						  	</div>
					  	</div>
					  </el-col>
					</el-row>

			  </el-tab-pane>
			  <el-tab-pane label="投递成功">

			  	<el-row :gutter="20">
					  <el-col :span="12" v-for='item in list' :key="item.recruit">
					  	<div class="box mb15">
					  		<div class="box_top">
						  		<h2 class="position_name">
						  			<router-link to="/">
						  				{{item.recruit}}
						  				<span>{{item.salary}}</span>
						  			</router-link>
						  		</h2>
						  		<div class="com_info">
						  			<router-link to="/">
							  			{{item.company.name}}
							  			<font>[{{item.address}}]</font>
						  			</router-link>
						  		</div>
						  		<div class="resume clearfix">
						  			<el-button class="pull-right ml5" size="small" type="text">等待通知</el-button>
						  			<span class="pull-right">{{item.time}}</span>
						  			<span>使用简历:</span>
						  			<font>简历一</font>
						  		</div>
						  	</div>
					  	</div>
					  </el-col>
					</el-row>

			  </el-tab-pane>
			  <el-tab-pane label="邀请面试">
			  	<el-row :gutter="20">
					  <el-col :span="12" v-for='item in list' :key="item.recruit">
					  	<div class="box mb15">
					  		<div class="box_top">
						  		<h2 class="position_name">
						  			<router-link to="/">
						  				{{item.recruit}}
						  				<span>{{item.salary}}</span>
						  			</router-link>
						  		</h2>
						  		<div class="com_info">
						  			<router-link to="/">
							  			{{item.company.name}}
							  			<font>[{{item.address}}]</font>
						  			</router-link>
						  		</div>
						  		<div class="resume clearfix">

						  			<el-popover placement="right-end" title="标题" trigger="click" width="540">
						        <div class="contact_info">
						        	<el-alert
										    title="提示:  你的简历已经通过初筛，企业可能会在近期与你沟通，请保持联系方式畅通"
										    type="info"
										    class="mt10"
										    :closable="false">
										  </el-alert>
						          <el-form label-position="left" inline class="demo-table-expand">
						          	<el-row>
						          		<el-col :span="10">
									          <el-form-item label="联系人">
									            <span>xiaolongjun</span>
									          </el-form-item>
									        </el-col>
						          		<el-col :span="10">
									          <el-form-item label="面试时间">
									            <span>4／12 16:00</span>
									          </el-form-item>
									        </el-col>
						          		<el-col :span="10">
									          <el-form-item label="联系电话">
									            <span>18678787979</span>
									          </el-form-item>
									        </el-col>
						          		<el-col :span="14">
									          <el-form-item label="联系邮箱">
									            <span>1057520381@qq.com</span>
									          </el-form-item>
									        </el-col>
									      </el-row>
							        </el-form>
						        </div>
						      </transition>

						  		<el-button class="pull-right ml5" size="small" type="text" slot="reference" @click="item.collapse = !item.collapse">{{item.state}}</el-button>
						    </el-popover>

						  			<span class="pull-right">{{item.time}}</span>
						  			<span>使用简历:</span>
						  			<font>简历一</font>
						  		</div>
						  	</div>
					  	</div>
					  </el-col>
					</el-row>
			  </el-tab-pane>
			  <el-tab-pane label="面试结果">
			  	<el-row :gutter="20">
					  <el-col :span="12" v-for='item in list' :key="item.recruit">
					  	<div class="box mb15">
					  		<div class="box_top">
						  		<h2 class="position_name">
						  			<router-link to="/">
						  				{{item.recruit}}
						  				<span>{{item.salary}}</span>
						  			</router-link>
						  		</h2>
						  		<div class="com_info">
						  			<router-link to="/">
							  			{{item.company.name}}
							  			<font>[{{item.address}}]</font>
						  			</router-link>
						  		</div>
						  		<div class="resume clearfix">
						  			<el-popover placement="left-end" title="标题" trigger="click" width="540">

											<div class="contact_info">
							        	<el-alert
											    :title="item.alert_text"
											    :type="gerAlertType(item.state)"
											    class="mt10"
											    :closable="false">
											  </el-alert>
											  <div style="height: 10px;"></div>
							        </div>

						  				<el-button class="pull-right ml5" size="small" type="text" slot="reference" @click="item.collapse = !item.collapse">不合适</el-button>
						  			</el-popover>
						  			<span class="pull-right">{{item.time}}</span>
						  			<span>使用简历:</span>
						  			<font>简历一</font>
						  		</div>
						  	</div>
					  		<transition name="el-zoom-in-top" v-if="item.state != '等待通知'">
					        
					      </transition>
					  	</div>
					  </el-col>
					</el-row>
			  </el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>
<script>
	export default {
		name: '',
		data() {
			return {
				active_list: {
					search_result: 'result'
				},
				list: [
					{
      			recruit: '导游',
      			time: '9-12 12:00',
      			salary: '15k-30k',
      			exp: '1-3年',
      			edu: '本科',
      			address: '厦门',
      			state: '等待通知',
      			lable: ['旅游', '业界龙头', '氛围好'],
      			company: {
      				name: '微众教育',
      				logo: '//static.lagou.com/thumbnail_100x100/i/image/M00/1A/D8/CgpFT1kIdEGANCt3AACNzh_LYrw828.jpg',
      				industry: '经营多年经营多年经营多年经营多年经营多年经营多年经营多年经营多年经营多年'
      			}
      		},
					{
      			recruit: '导游',
      			time: '9-12 12:00',
      			salary: '15k-30k',
      			exp: '1-3年',
      			edu: '本科',
      			address: '厦门',
      			state: '合适',
      			lable: ['旅游', '业界龙头', '氛围好'],
      			alert_text: '期待您融入我们这个大家庭',
      			company: {
      				name: '微众教育',
      				logo: '//static.lagou.com/thumbnail_100x100/i/image/M00/1A/D8/CgpFT1kIdEGANCt3AACNzh_LYrw828.jpg',
      				industry: '经营多年经营多年经营多年经营多年经营多年经营多年经营多年经营多年经营多年'
      			}
      		},
					{
      			recruit: '导游',
      			time: '9-12 12:00',
      			salary: '15k-30k',
      			exp: '1-3年',
      			edu: '本科',
      			address: '厦门',
      			state: '不合适',
      			lable: ['旅游', '业界龙头', '氛围好'],
      			alert_text: '非常荣幸收到您的简历，经过我们评估，认为您与该职位不太合适，无法进入面试阶段。建议参考STAR法则对简历进行修改，并突出您在专业知识方面的优势。相信更好的机会一定还在翘首期盼着您，赶快调整心态，做好充足的准备重新出发吧！',
      			company: {
      				name: '微众教育',
      				logo: '//static.lagou.com/thumbnail_100x100/i/image/M00/1A/D8/CgpFT1kIdEGANCt3AACNzh_LYrw828.jpg',
      				industry: '经营多年经营多年经营多年经营多年经营多年经营多年经营多年经营多年经营多年'
      			}
      		},
					{
      			recruit: '导游',
      			time: '9-12 12:00',
      			salary: '15k-30k',
      			exp: '1-3年',
      			edu: '本科',
      			address: '厦门',
      			state: '待面试',
      			lable: ['旅游', '业界龙头', '氛围好'],
      			alert_text: '期待您融入我们这个大家庭',
      			company: {
      				name: '微众教育',
      				logo: '//static.lagou.com/thumbnail_100x100/i/image/M00/1A/D8/CgpFT1kIdEGANCt3AACNzh_LYrw828.jpg',
      				industry: '经营多年经营多年经营多年经营多年经营多年经营多年经营多年经营多年经营多年'
      			}
      		},
				]
			}
		},
		mounted() {
			this.getList();
		},
		methods: {
			getList() {
				for(let i=0; i<this.list.length; i++){
	  			this.$set(this.list[i], 'collapse', true);
	  		}
			},
			gerAlertType(type) {
				switch (type) {
					case '待面试':
						return 'info';
						break;
					case '不合适':
						return 'error';
						break;
					case '合适':
						return 'success';
						break;
				}
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
					line-height: 26px;
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