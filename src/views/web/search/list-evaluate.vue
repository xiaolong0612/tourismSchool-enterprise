<template>
	<div class="evaluate_list">
		<ul>
			<li v-if='list.length == 0' class="c-gray t-center">暂无评价</li>
			<li class="item" v-for="evaluate in list" :key="evaluate.evaluateTime">
				<img class="user-img" :src="typeof evaluate.pic == 'undefined' ? '/static/default_img.gif' : evaluate.pic">
				<div class="evaluate-info">
					<div class="user-name">
						
						<time class="pull-right" style="color:#808080;font-size:12px;">{{evaluate.evaluateTime}}</time>

						<span>{{evaluate.studentName.substring(0,1)}}**</span>

						<font style="color:#999">面试评分</font>
						<div class="rate_wrap">
							<el-rate
								disabled
							  show-score
							  text-color="#ff9900"
							  v-model="evaluate.score">
							</el-rate>
						</div>
					</div>
					<p class="evaluate-text">
						<span style="color:#808080;">[面试过程]</span>
						{{evaluate.evaluateContent}}
					</p>
				</div>
			</li>
		</ul>
		<el-pagination
			v-if="total != 0"
	    layout="prev, pager, next"
	    :total="total"
	    class="pull-right">
	  </el-pagination>
	</div>
</template>

<script>
  import { jobEvaluate } from '@/api/com/recruit';
	export default {
		props: {
      jobId: ''
    },
		data() {
			return {
				list:[],
				total: 1,
				listQuery: {
					pageNo: 1,
					pageSize: 3,
					jobId: ''
				}
			}
		},
		mounted() {
			this.listQuery.jobId = this.jobId;
			this.getEvaluateList();
		},
		methods: {
			getEvaluateList(){
				jobEvaluate(this.listQuery).then(res => {
					this.list = res.list;
					this.total = res.total;
				})
			}
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "src/styles/mixin.scss";
	.evaluate_list{
		.item{
			border-top: 1px dashed #E0E0E0;
			padding: 20px 0;
			position: relative;
			&:first-child{
				border-top: 0px dashed #E0E0E0;
			}
			// &:before{
			// 	content: '';
			// 	display: block;
			// 	position: absolute;
			// 	top: 20px;
			// 	left: 0px;
			// 	width: 50px;
			// 	height: 50px;
			// 	border-radius: 100%;
			// 	border: 2px solid #ddd;
			// 	z-index: 1;
			// }
			&:hover{
				.user-img{
					transform: rotate(60deg);
					-ms-transform: rotate(60deg); /* IE 9 */
					-webkit-transform: rotate(60deg); /* Safari and Chrome */
				}
			}
			.user-img{
				border-radius: 100%;
				width: 50px;
				height: 50px;
				float: left;
				@include transition;
				transform-origin: center top;
				position: relative;
				z-index: 2
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
</style>