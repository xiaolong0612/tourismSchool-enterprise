<template>
	<div class="pt100 bg-gray pb50">
		<div class="container recruit_look">
		
			<el-row :gutter="10">
			  <el-col :span="16">
			  	<div class="bg-white recruit_details">
			  		<div class="top_wrap">
							<div class="pull-right" style="padding-top:8px;">
			  				<el-button icon="el-icon-star-off">收藏</el-button>
								<el-button type="primary">投个简历</el-button>
							</div>
							<h2 class="name">{{details.jobName}}</h2>
			  		</div>
			  		<div>
			  			<el-form label-position="left" inline label-width="80px">
			  				<el-row>
			  					<el-col :span="24">
			  						<el-form-item label="企业标签" class="pt10 pb10 mb0">
					            <el-tag size="medium">标签一</el-tag>
											<el-tag size="medium" type="success">标签二</el-tag>
											<el-tag size="medium" type="info">标签三</el-tag>
											<el-tag size="medium" type="warning">标签四</el-tag>
											<el-tag size="medium" type="danger">标签五</el-tag>
					          </el-form-item>
			  					</el-col>
					        <el-col :span="12">
					          <el-form-item label="薪水待遇" class="mb0">
					            <span style="color:#fa6041">{{details.income}}</span>
					          </el-form-item>
					        </el-col>
					        <el-col :span="12">
					          <el-form-item label="工作方式" class="mb0">
					            <span>{{details.jobTypeStr}}</span>
					          </el-form-item>
					        </el-col>
					        <el-col :span="12">
					          <el-form-item label="教育程度" class="mb0">
					            <span>{{details.qualificate}}</span>
					          </el-form-item>
					        </el-col>
					        <el-col :span="12">
					          <el-form-item label="工作经验" class="mb0">
					            <span>{{details.workExperience}}</span>
					          </el-form-item>
					        </el-col>
					        <el-col :span="12">
					          <el-form-item label="关注度" class="mb0">
					            <span>1000</span>
					          </el-form-item>
					        </el-col>
					        <el-col :span="12">
					          <el-form-item label="更新于" class="mb0">
					            <span>2017-09-10</span>
					          </el-form-item>
					        </el-col>
					        <el-col :span="24">
					          <el-form-item label="工作地点" class="mb0">
					            <span>{{details.workAddress}}</span>
					          </el-form-item>
					        </el-col>
					      </el-row>
			        </el-form>
			  		</div>
			  	</div>
			  	<div class="evaluate_wrap mt10 bg-white">
						<h2 class="title">面试评价</h2>
						<div class="evaluate_list">
							<ul>
								<li class="item">
									<img class="user-img" src="https://static.lagou.com/thumbnail_100x100/images/jd_portrait.png">
									<div class="evaluate-info">
										<div class="user-name">
											
											<time class="pull-right" style="color:#808080;font-size:12px;">2017-09-12 12:00:00</time>

											<span>小龙君</span>

											<font style="color:#999">面试评分</font>
											<div class="rate_wrap">
												<el-rate
												  v-model="rate">
												</el-rate>
											</div>
										</div>
										<p class="evaluate-text">
											<span style="color:#808080;">[面试过程]</span>
											当天面试时头有点昏，感觉和面试官不在一个调上
										</p>
									</div>
								</li>
								<li class="item">
									<img class="user-img" src="https://static.lagou.com/thumbnail_100x100/images/jd_portrait.png">
									<div class="evaluate-info">
										<div class="user-name">
											
											<time class="pull-right" style="color:#808080;font-size:12px;">2017-09-12 12:00:00</time>

											<span>小龙君</span>

											<font style="color:#999">面试评分</font>
											<div class="rate_wrap">
												<el-rate
												  v-model="rate">
												</el-rate>
											</div>
										</div>
										<p class="evaluate-text">
											<span style="color:#808080;">[面试过程]</span>
											当天面试时头有点昏，感觉和面试官不在一个调上
										</p>
									</div>
								</li>
								<li class="item">
									<img class="user-img" src="https://static.lagou.com/thumbnail_100x100/images/jd_portrait.png">
									<div class="evaluate-info">
										<div class="user-name">
											
											<time class="pull-right" style="color:#808080;font-size:12px;">2017-09-12 12:00:00</time>

											<span>小龙君</span>

											<font style="color:#999">面试评分</font>
											<div class="rate_wrap">
												<el-rate
												  v-model="rate">
												</el-rate>
											</div>
										</div>
										<p class="evaluate-text">
											<span style="color:#808080;">[面试过程]</span>
											当天面试时头有点昏，感觉和面试官不在一个调上
										</p>
									</div>
								</li>
								<li class="item">
									<img class="user-img" src="https://static.lagou.com/thumbnail_100x100/images/jd_portrait.png">
									<div class="evaluate-info">
										<div class="user-name">
											
											<time class="pull-right" style="color:#808080;font-size:12px;">2017-09-12 12:00:00</time>

											<span>小龙君</span>

											<font style="color:#999">面试评分</font>
											<div class="rate_wrap">
												<el-rate
												  v-model="rate">
												</el-rate>
											</div>
										</div>
										<p class="evaluate-text">
											<span style="color:#808080;">[面试过程]</span>
											当天面试时头有点昏，感觉和面试官不在一个调上
										</p>
									</div>
								</li>
								<li class="item">
									<img class="user-img" src="https://static.lagou.com/thumbnail_100x100/images/jd_portrait.png">
									<div class="evaluate-info">
										<div class="user-name">
											
											<time class="pull-right" style="color:#808080;font-size:12px;">2017-09-12 12:00:00</time>

											<span>小龙君</span>

											<font style="color:#999">面试评分</font>
											<div class="rate_wrap">
												<el-rate
												  v-model="rate">
												</el-rate>
											</div>
										</div>
										<p class="evaluate-text">
											<span style="color:#808080;">[面试过程]</span>
											当天面试时头有点昏，感觉和面试官不在一个调上
										</p>
									</div>
								</li>
							</ul>
							<el-pagination
						    layout="prev, pager, next"
						    :total="1000"
						    class="pull-right">
						  </el-pagination>
						</div>
			  	</div>
			  </el-col>
			  <el-col :span="8">
			  	<div class="bg-white com-info">
			  		<div class="mb20">
							<img class="logo mr5" src="//static.lagou.com/thumbnail_100x100/i/image/M00/1A/D8/CgpFT1kIdEGANCt3AACNzh_LYrw828.jpg">
							<span class="name">校企</span>
						</div>
						<div class="item">
							<span>
								<icon-svg icon-class="caidan" />
							</span>
							<font>旅游</font>
						</div>

						<div class="item">
							<span>
								<icon-svg icon-class="jianjie" />
							</span>
							<font>我公司很厉害我公司很厉害我公司很厉害我公司很厉害我公司很厉害我公司很厉害我公司很厉害我公司很厉害我公司很厉害我公司很厉害我公司很厉害我公司很厉害我公司很厉害我公司很厉害我公司很厉害我公司很厉害我公司很厉害我公司很厉害我公司很厉害我公司很厉害我公司很厉害我公司很厉害我公司很厉害我公司很厉害我公司很厉害我公司很厉害我公司很厉害我公司很厉害我公司很厉害我公司很厉害我公司很厉害我公司很厉害我公司很厉害我公司很厉害我公司很厉害我公司很厉害我公司很厉害我公司很厉害我公司很厉害我公司很厉害我公司很厉害我公司很厉害我公司很厉害我公司很厉害我公司很厉害</font>
						</div>

						<div class="item">
							<span>
								<icon-svg icon-class="e60213" />
							</span>
							<font>100-300人</font>
						</div>

						<div class="item">
							<span>
								<icon-svg icon-class="zhuye" />
							</span>
							<font><router-link to="www.baidu.com">www.baidu.com</router-link></font>
						</div>
					</div>
			  </el-col>
			</el-row>

		</div>
	</div>
</template>

<script>
  import Sticky from '@/components/Sticky/index';
	export default {
		components: { Sticky },
		data() {
			return {
				rate: 3.7,
				details: {
		      jobName: "工程师",//岗位名称
		      companyName: "校企",//公司名称
		      id: "1",//id
		      income: "3000",//待遇
		      workCity: "厦门",
		      workExperience: "2年",//工作经验
		      qualificate: "本科",//学历
		      jobTypeStr: "全职",//岗位类型
		      recruitNumber: "3人",//招聘人数
		      linkName: "张三",//联系人
		      linkPhone: "18850521231",//联系电话
		      workAddress: "软件园",//工作具体地址
		      receiveEmail: "18850521231@qq.com",//接收邮箱
		      evaluates: [
		        {
							id: "1",//id
							evaluateContent: "3000",//评价内容
							score: "80",//打分
							evaluateTime: "2017-09-10",//评价时间
							studentId: "3",//学生id
							jobId: "3",//岗位id
							studentName: "张三",//学生名称
	        	}
	        ]
	    	}
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
				.item{
					border-top: 1px dashed #E0E0E0;
					padding: 20px 0;
					&:first-child{
						border-top: 0px dashed #E0E0E0;
					}
					.user-img{
						border-radius: 100%;
						width: 50px;
						height: 50px;
						float: left;
					}
					.evaluate-info{
						margin-left: 60px;
						.user-name{
							line-height: 20px;
							padding: 2px 0;
							>span{
								display: inline-block;
								vertical-align: top;
								width: 80px;
								color:#555;
							}
							>font{
								font-size: 14px;
							}
							.rate_wrap{
								display: inline-block;
								vertical-align: top;
							}
						}
						.evaluate-text{
							color: #555;
							font-size: 14px;
							line-height: 25px;
						}
					}
				}
			}
		}
	}
</style>
