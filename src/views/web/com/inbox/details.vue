<template>
	<div class="bg-gray">
		<div class="user-bg">
			<div class="breadcrumb-wrap container">
				<el-breadcrumb separator="/">
				  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
				  <el-breadcrumb-item :to="{ path: '/user/resume/list' }">简历列表</el-breadcrumb-item>
				  <el-breadcrumb-item>简历详情</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
		</div>
		<div class="section user-wrap small_container panel_white ">
			<div class="about_intro">
        <el-row>
        		<el-col :xs="24" :sm="10">
        				<div class="user-img">
        					<div 
        						v-show="user_label"
        						class="user-label"
        						@click="user_label =! user_label">
        						<el-tag>认真</el-tag>
										<el-tag type="gray">活泼</el-tag>
										<el-tag type="primary">开朗</el-tag>
										<el-tag type="success">热情</el-tag>
										<el-tag type="warning">喜欢音乐</el-tag>
										<el-tag type="danger">热爱生活</el-tag>
        					</div>
        				</div>
            </el-col>
        		<el-col :xs="23" :sm="14">
                <h4>
                    I'm 小龙君
                </h4>
                <h5>
                	《长城》【唐】汪遵
                    秦筑长城比铁牢，蕃戎不敢过临洮。 
										虽然万里连云际，争及尧阶三尺高。
                </h5>
                <ul class="border_bottom_list">

                    <li>
                    	<strong class="list_title">期望职位: </strong>
                    	Web工程师
                    </li>
                    <li>
                    	<strong class="list_title">所在城市:</strong>
                    	厦门市
                    </li>
                    <li>
                    	<strong class="list_title">出生日期:</strong>
                    	12 July 1997
                   	</li>
                    <li>
                    	<strong class="list_title">Email: </strong>
                    	<a href="#">david@resume.com</a>
                    </li>
                    <li>
                    	<strong class="list_title">tel : </strong>
                    	+186 3678 7915
                    </li>
                </ul>

            </el-col>
        </el-row>
      </div>
			<div v-show="!user_label" @click="user_label=!user_label" class="small_container" style="padding: 20px 0 0px">
				<span style="font-size: 14px">个性标签：</span>
				<el-tag>认真</el-tag>
				<el-tag type="gray">活泼</el-tag>
				<el-tag type="primary">开朗</el-tag>
				<el-tag type="success">热情</el-tag>
				<el-tag type="warning">喜欢音乐</el-tag>
				<el-tag type="danger">热爱生活</el-tag>
			</div>
		</div>
		<div class="section bg-white pt70 pb70">
			<div class="container">
				<el-row>
					<el-col :md="10" :sm="24" :xs="24">
						<h5 class="mb25">期望工作</h5>
						<div class="mb30 expect_wrap">
							<el-row>
								<el-col :md="6" :xs="6">
									<icon-svg icon-class="ffan_lingdai" />
									<span>导游</span>
								</el-col>
								<el-col :md="6" :xs="6">
									<icon-svg icon-class="dibiao" />
									<span>厦门</span>
								</el-col>
								<el-col :md="6" :xs="6">
									<icon-svg icon-class="shijian" />
									<span>全职</span>
								</el-col>
								<el-col :md="6" :xs="6">
									<icon-svg icon-class="bill-copy" />
									<span>5k～10k</span>
								</el-col>
							</el-row>
						</div>
						<h5 class="mb25">自我介绍</h5>
						<p style="line-height:25px;">
							Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar.
						</p>
					</el-col>
					<el-col :md="12" :sm="24" :xs="24" :offset="2">
						<h5 class="mb25">我的技能</h5>
						<div class="skill_wrap">
							<p>技能一</p>
							<el-progress :show-text="false" :stroke-width="10" :percentage="0"></el-progress>
							<p>技能二</p>
							<el-progress :show-text="false" :stroke-width="10" :percentage="70"></el-progress>
							<p>技能三</p>
							<el-progress :show-text="false" :stroke-width="10" :percentage="100" status="success"></el-progress>
							<p>技能四</p>
							<el-progress :show-text="false" :stroke-width="10" :percentage="50" status="exception"></el-progress>
						</div>
					</el-col>
				</el-row>
			</div>
		</div>
		<div class="section">
			<list-live :list="list.work"></list-live>
		</div>
		<div class="section bg-white">
			<list-live :list="list.education"></list-live>
		</div>
		<div class="section honor_wrap pt70 pb100">
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
	</div>
</template>
<script>
  import ListLive from '@/views/web/user/resume/list-live';
  export default {
    components: { ListLive },
  	data() {
  		return {
  			list: {
  				work: {
  					title: '我的经验',
  					label: "以前的工作有助于经验的收集",
  					list:[
	  					{
	  					name: '本科计算机工程',
	  					time: '2016年12月-现在',
	  					exp: 'Quisque non tortor nec sapien pellentesque rutrum. Ut id neque et enim commodo dictum consectetur vitae orci. In suscipit dolor nec est finibus, nec semper nisi placerat. Aenean sit amet condimentum mauris.'
	  					},{
	  					name: '本科计算机工程',
	  					time: '2016年12月-现在',
	  					exp: 'Quisque non tortor nec sapien pellentesque rutrum. Ut id neque et enim commodo dictum consectetur vitae orci. In suscipit dolor nec est finibus, nec semper nisi placerat. Aenean sit amet condimentum mauris.'
	  					},{
	  					name: '本科计算机工程',
	  					time: '2016年12月-现在',
	  					exp: 'Quisque non tortor nec sapien pellentesque rutrum. Ut id neque et enim commodo dictum consectetur vitae orci. In suscipit dolor nec est finibus, nec semper nisi placerat. Aenean sit amet condimentum mauris.'
	  					}
  					]
  				},
  				education: {
  					title: '我的教育',
  					label: "教育的根源很苦，但果实甜美集",
  					list:[
	  					{
	  					name: '本科计算机工程',
	  					time: '2016年12月-现在',
	  					exp: 'Quisque non tortor nec sapien pellentesque rutrum. Ut id neque et enim commodo dictum consectetur vitae orci. In suscipit dolor nec est finibus, nec semper nisi placerat. Aenean sit amet condimentum mauris.'
	  					},{
	  					name: '本科计算机工程',
	  					time: '2016年12月-现在',
	  					exp: 'Quisque non tortor nec sapien pellentesque rutrum. Ut id neque et enim commodo dictum consectetur vitae orci. In suscipit dolor nec est finibus, nec semper nisi placerat. Aenean sit amet condimentum mauris.'
	  					},{
	  					name: '本科计算机工程',
	  					time: '2016年12月-现在',
	  					exp: 'Quisque non tortor nec sapien pellentesque rutrum. Ut id neque et enim commodo dictum consectetur vitae orci. In suscipit dolor nec est finibus, nec semper nisi placerat. Aenean sit amet condimentum mauris.'
	  					}
  					]
  				}
  			},
  			user_label: false
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
	.user-wrap{
    margin-top: -250px;
    margin-bottom: 70px;
    padding: 25px;
    background-color: #FFFFFF;
    .about_intro {
	    text-align: left;
	    margin: 0 auto;
	    max-width: 100%;
	    .user-img{
				width: 325px;
				height: 345px;
				overflow: hidden;
				background: url(/static/img/default-img/user.jpg) center no-repeat;
				background-size: cover;
				border-radius: 8px;
				position: relative;
				.user-label{
					position: absolute;
					bottom: 0;
					left: 0;
					width: 100%;
					background-color: rgba(0,0,0,.2);
					padding: 15px;
					box-sizing: border-box;
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
	    }
	    h5{
	    	margin-bottom: 10px;
		    color: #555;
		    font-size: 17px;
		    font-weight: 500;
	    }
		}
	}
	.expect_wrap{
		color: #555;
		font-size: 14px;
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
</style>