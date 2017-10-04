<template>
	<div class="bg-gray pb70">
		<div class="breadcrumb-wrap container pt95">
			<el-breadcrumb separator="/">
			  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			  <el-breadcrumb-item>收藏列表</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="container pt20">
			<el-tabs v-model="active_list.collect_list">
		    <el-tab-pane label="我收藏的职位" name="collect">
	        <el-row :gutter="15" class="collect_list">
	          <el-col :span="12" v-for="item in list" :key="item.recruit">
	          	<div class="collect_item mb15">
	          		<img class="pull-left" src="//static.lagou.com/thumbnail_100x100/i/image/M00/1A/D8/CgpFT1kIdEGANCt3AACNzh_LYrw828.jpg" width="70px">
	          		<div class="text_info">
	          			<div class="recruit">
	          				<font class="pull-right time">发布时间： {{item.time}}</font>
	          				<h2>
	          					<router-link to="/">
	          					{{item.recruit}}
	          					</router-link>
	          				</h2>
	          				<span>  ({{item.salary}})</span>
	          			</div>
	          			<div class="com_info">
	          				<p class="name">{{item.company.name}} / {{item.address}} / {{item.exp}} / {{item.edu}}</p>
	          				<div>
	          					<div class="btn_wrap pull-right">
		          					<el-button size="mini" type="text">取消收藏</el-button>
	          						<span style="color: #808080"> | </span>
	          						<el-button size="mini" type="text">投个简历</el-button>
	          					</div>
		          					
	          					<el-tag class="mr5" type="gray" v-for="lable in item.lable" :key="lable">{{lable}}</el-tag>
	          				</div>
	          			</div>
	          		</div>
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
		data() {
			return {
				active_list: {
        	collect_list: 'collect',
        },
        list: [
        	{
      			recruit: '导游',
      			time: '9-12 12:00',
      			salary: '15k-30k',
      			exp: '1-3年',
      			edu: '本科',
            address: '厦门',
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
      			lable: ['旅游', '业界龙头', '氛围好'],
      			company: {
      				name: '微众教育',
      				logo: '//static.lagou.com/thumbnail_100x100/i/image/M00/1A/D8/CgpFT1kIdEGANCt3AACNzh_LYrw828.jpg',
      				industry: '经营多年经营多年经营多年经营多年经营多年经营多年经营多年经营多年经营多年'
      			}
      		}
        ]
			}
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss">
	.collect_list{
		.collect_item{
			padding: 7px;
			background-color: #fff;
			.text_info{
				margin-left: 77px;
				.recruit{
					line-height: 27px;
					.time{
						color: #999;
						font-size: 12px;
					}
					h2{
						display: inline-block;
						vertical-align: middle;
						font-size: 18px;
						font-weight: 400;
						margin-bottom: 0;
					}
					a{
						color: #20a0ff;
					}
					span{
						font-size: 16px;
						color: #e6775c;
					}
				}
				.com_info{
					.name{
						color: #555;
					}
					.btn_wrap{
						button{
							font-size: 14px;
						}
					}
				}
			}
		}
	}
</style>