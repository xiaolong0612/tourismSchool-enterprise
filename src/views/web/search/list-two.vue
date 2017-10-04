<template>
	<div class="search_style_two pb80">
		<div class="mb20 item" v-for="item in list" :key="item.recruit">
			<el-row :gutter='20'>
			  <el-col :span="12">
			  	<div class="position_info" style="padding: 14px 15px 0">
				  	<div class="name">
					  	<h2>
					  		<router-link to="/">
					  			{{item.recruit}} [{{item.address}}]
					  		</router-link>
					  	</h2>
					  	<span class="time">{{item.time}}</span>
					  </div>
					  <p class="postion_req">
					  	<span class="mr15">{{item.salary}}</span>
					  	<font>{{item.exp}} / {{item.edu}}</font>
					  </p>
					</div>
			  </el-col>
			  <el-col :span="12">
			  	<div class="con_info" style="padding: 14px 15px 0">
				  	<img class="pull-right" :src="item.company.logo" width="62">
				  	<div class="name">
							<h2>
					  		<router-link to="/">
								{{item.company.name}}
					  		</router-link>
							</h2>
				  	</div>
					  <p class="con_industry">{{item.company.industry}}</p>
				  </div>
			  </el-col>
			  <el-col :span="24" class="item_btm mt5">
			  	<el-row :gutter='20'>
			  		<el-col :span="12">
			  			<div class="lable">
				  			<el-tag class="mr5" type="gray" v-for="lable in item.lable" :key="lable">{{lable}}</el-tag>
				  		</div>
			  		</el-col>
			  		<el-col :span="12">
			  			<div class="btn_wrap">
			  				<el-button icon="star-off" size="small" v-show="!item.is_collection" @click="collection(item)">收藏</el-button>
			  				<el-button icon="star-on" size="small" v-show="item.is_collection" @click="collection(item)" style="color: #20a0ff;border-color: #20a0ff;">已收藏</el-button>
			  				<el-button size="small" type="info" @click="delivery(item)">{{item.submit_btn_text}}</el-button>
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
    		is_collection: false
    	}
    },
		mounted() {
			this.getList();
		},
    methods: {
    	getList() {
    		for(let i=0; i<this.list.length; i++){
    			this.$set(this.list[i], 'submit_btn_text', '投个简历');
    			this.$set(this.list[i], 'is_collection', false);
    		}
    	},
    	collection(item){
    		item.is_collection = !item.is_collection;
    		if(item.is_collection){
    			this.$message({
	          showClose: true,
	          message: '已收藏',
	          type: 'success'
	        });
    		}else{
    			this.$message({
          	showClose: true,
	          message: '已从收藏列表中删除'
	        });
    		}
    	},
    	delivery(item) {
    		item.submit_btn_text = '已投递';
    		this.$message({
          showClose: true,
          message: '简历投递成功',
          type: 'success'
        });
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
					.time{
						font-size: 14px;
						color: #999;
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
				word-wrap: normal
				span{
					font-size: 16px;
					color: #fd5f39;
					display: inline-block;vertical-align: middle;
				}
			}
			.item_btm{
				height: 40px;
				background-color: #fafafa;
				.lable{
					padding: 8px 15px 0;
				}
			  .btn_wrap{
			  	padding: 6px 15px 0;
			  	text-align: right;
			  }
			}
		}
	}
</style>
