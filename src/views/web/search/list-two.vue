<template>
	<div class="search_style_two ">
		<div class="mb20 item" v-for="item in list" :key="item.recruit">
			<el-row :gutter='20'>
			  <el-col :span="12">
			  	<div class="position_info" style="padding: 14px 15px 0">
				  	<div class="name">
					  	<h2>
					  		<router-link :to="{path:'/search/list/details', query:{id:item.id}}">
					  			{{item.jobName}} [{{item.workAddress}}]
					  		</router-link>
					  	</h2>
					  </div>
					  <p class="postion_req">
					  	<span class="mr15 income">{{item.income}}</span>
					  	<font>{{item.workExperience}} <d v-if="item.qualificate != ''">/</d> {{item.qualificate}}</font>
					  	<el-tag class="ml10" size="small" type="warning">{{item.jobTypeStr}}</el-tag>
					  </p>
					</div>
			  </el-col>
			  <el-col :span="12">
			  	<div class="con_info" style="padding: 14px 15px 0">
				  	<img class="pull-right" v-if="item.companyLogo == ''" :src="item.companyLogo == '' ? '/static/logo.png' : item.companyLogo" height="62px">
				  	<div class="name">
							<h2>
					  		<router-link :to="{path:'/search/com-details', query:{id:item.companyId}}">
								{{item.companyName}}
					  		</router-link>
							</h2>
				  	</div>
					  <p class="con_industry">简介</p>
				  </div>
			  </el-col>
			  <el-col :span="24" class="item_btm mt5">
			  	<el-row :gutter='20'>
			  		<el-col :span="12">
			  			<div class="lable">
				  			<el-tag v-if="item.jobLabels.length != 0" class="mr5" type="gray" v-for="jobLabels in item.lable" :key="lable">{{lable}}</el-tag>
				  			<span v-if="item.jobLabels.length == 0" class="labeltext">{{item.labletext}}</span>
				  		</div>
			  		</el-col>
			  		<el-col :span="12">
					  	<span class="time pull-left">{{item.releaseTime}}</span>
			  			<div class="btn_wrap">
			  				<el-button size="small" type="primary" @click="dialogDelivery(item.id)">{{item.submit_btn_text}}</el-button>
			  			</div>
			  		</el-col>
			  	</el-row>
			  </el-col>
			</el-row>
		</div>
		
	</div>
</template>
<script>
	export default {
		name: 'search-stype-tow',
		props: {
      list: {
        type: Array
      }
    },
    data() {
    	return {
    		is_collection: false,
    	}
    },
    // watch: {
    // 	list(curVal,oldVal){
    // 		console.log(oldVal)
    // 		this.getList();
    // 	}
    // },
		mounted() {
			this.getList();
		},
    methods: {
    	getList() {
    		for(let i=0; i<this.list.length; i++){
    			this.$set(this.list[i], 'submit_btn_text', '投个简历');
    			this.$set(this.list[i], 'is_collection', false);
    			if(this.list[i].jobLabels.length == 0){
    				this.$set(this.list[i], 'labletext', '这个岗位很赞');
    			}
    		}
    	},
      dialogDelivery(id){
      	this.$emit('jobid', id);
      }
    }
	}
</script>
<style rel="stylesheet/scss" lang="scss">
	.search_style_two{
		a{
			color: #20A0FF;
		}
		.item{
			border: 1px solid #ededed;
			background-color: #fff;
			.time{
				font-size: 14px;
				color: #999;
				line-height: 40px;
				text-indent: 16px;
			}
			.position_info, .con_info{
				.name{
					height: 34px;
					line-height: 34px;
					h2{
						font-size: 16px;
						display: inline-block;
						vertical-align: middle;
						margin: 0 5px 0 0;
					}
				}
			}
			.postion_req, .con_industry{
				height: 24px;
				line-height: 24px;
				font-size: 14px;
				color: #555;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				word-wrap: normal;
				.income{
					font-size: 16px;
					color: #fd5f39;
					display: inline-block;vertical-align: middle;
				}
			}
			.item_btm{
				height: 40px;
				background-color: #fafafa;
				.lable{
					padding: 4px 15px 0;
				}
				.labeltext{
					line-height: 32px;
					color: #555;
					font-size: 14px;
				}
			  .btn_wrap{
			  	padding: 4px 15px 0;
			  	text-align: right;
			  }
			}
		}
	}
</style>
