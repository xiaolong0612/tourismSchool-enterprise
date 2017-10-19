<template>
	<div class="recruit-layout-one pb40">
		<el-row :gutter='20'>
		  <el-col :span="8" v-for="item in list" :key="item.recruit">
		  	<div class="item mb15">
		  		<div class="recruit-info">
						<div class="clearfix">
							<div class="pull-left">
								<h2 class="name">
									<router-link :to="'/search/list/details/'+item.companyId">
										{{item.jobName}}
									</router-link>
								</h2>
								<font class="time">[{{item.releaseTime}}]</font>
							</div>
							<span class="pull-right salary">{{item.income}}</span>
						</div>
						<div class="exp">
							<span class="pull-right">{{item.workCity}}</span>
							{{item.workExperience}} / {{item.qualificate}} / {{item.jobTypeStr}}

						</div>
						<div class="label mt5">
		  				<el-tag size="small" class="mr5" type="gray" v-for="lable in item.lable" :key="lable">{{lable}}</el-tag>
						</div>
		  		</div>
		  		<div class="con-info">
		  			<img class="logo pull-left" :src="item.companyLogo">
		  			<div class="info-right">
		  				<span class="name">{{item.companyName}}</span>
		  				<!-- <p class="industry">{{item.company.industry}}</p> -->
		  			</div>
		  		</div>
		  	</div>
		  </el-col>
		</el-row>
	</div>
</template>

<script>
  export default {
  	name: 'search-stype-one',
  	props: {
      list: {
        type: Array
      }
    },
    data() {
      return {

      }
    },
    mounted() {
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
	.recruit-layout-one{
		.item{
			box-sizing: border-box;
			position: relative;
			height: 200px;
			padding: 20px 18px 0;
			border: 1px solid #EAEEED;
			background-color: #fff;
			&:hover{
				-webkit-box-shadow: 0 0 10px 0 rgba(56, 81, 76, 0.12);
				-moz-box-shadow: 0 0 10px 0 rgba(56, 81, 76, 0.12);
				box-shadow: 0 0 10px 0 rgba(56, 81, 76, 0.12)
			}
			.recruit-info{
				line-height: 22px;
				.name{
					font-size: 16px;
					color: #555;
					display: inline-block;
					vertical-align: top;
					margin: 0 15px 0 0;
				}
				.time{
					color: #808080;
					font-size: 14px;
				}
				.salary{
					color: #fa6041;
				}
				.exp{
					line-height: 30px;
					height: 30px;
					color: #777;
					font-size: 14px;
				}
				.label{
				}
			}
			.con-info{
				margin-top: 18px;
				padding-top: 18px;
				border-top: 1px dashed #E0E0E0;
				.logo{
					width: 40px;height: 40px;
					// filter: blur(5px);
				}
				.info-right{
					margin-left: 50px;
					height: 20px;
					line-height: 20px;
					font-size: 14px;
					.name{
						color: #333
					}
					.industry{
						color: #999;
						text-overflow: ellipsis;
						overflow: hidden;
						white-space: nowrap;
						word-wrap: normal
					}
				}
			}
		}
	}
</style>