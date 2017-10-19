<template>
	<div>
		<div class="breadcrumb-wrap container pt95">
			<el-breadcrumb separator="/">
				  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
				  <el-breadcrumb-item>收件箱</el-breadcrumb-item>
				</el-breadcrumb>
		</div>
		<div class="container pt20 resume_type_list_wrap pb50">
			<el-tabs v-model="active_list.resume_list">
		    <el-tab-pane label="简历列表" name="resume">
		    	
	        <el-row :gutter="15" class="resumet_list">
	          <el-col :span="6" v-for="item in list" :key="item.last_edit_time">
	          	<div class="item mb20" :style="{borderLeftColor: item.border_color}">
	          		<i class="el-icon-circle-cross"></i>
	          		<div style="padding: 7px 7px 0">
	          			<div class="img pull-left" :style="{backgroundImage: 'url('+item.img+')'}"></div>
	          			<div class="info">
	          				<h2>
	          					<router-link to="/">
											{{item.name}}[{{item.recruit}}]
	          					</router-link>
	          				</h2>
	          				<font class="state">{{item.state}} / 1年</font>
		          			<p>
		          				{{item.address}} / 
		          				{{item.edu}}
		          			</p>
	          			</div>
	          		</div>
	          		<div class="edit">
	          			<router-link to="/com/inbox/details/1">
		          			<el-button class="pull-right" size="mini" type="primary">查看</el-button>
		          		</router-link>
		          		
	          			<span>收件时间:</span>
	          			<font>{{item.last_edit_time}}</font>
	          		</div>
	          	</div> 
	          </el-col>
	        </el-row>
	      </el-tab-pane>
		  </el-tabs>

			<div class="resume_type">
    		<el-select v-model="resume_type.select" placeholder="请选择">
			    <el-option
			      v-for="item in resume_type.list"
			      :key="item.value"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
			  </el-select>
    	</div>

		</div>
	</div>
</template>

<script>
  import { getColor } from '@/utils/index';
	export default {
		data() {
			return {
				active_list: {
        	resume_list: 'resume',
        },
        resume_type: {
        	select: '1',
        	list: [
        		{
        			value: '1',
		          label: '全部'
		        },
        		{
        			value: '2',
		          label: '导游'
		        },
        	]
        },
        list: [
        	{
        		name: '小龙君',
        		img: 'http://xq.openguts.com/static/img/default-img/user.jpg',
        		recruit: '会展',
        		edu: '本科',
        		last_edit_time: '2017-9-12 12:00:00',
        		address: '厦门',
        		salary: '15K-39k',
        		state: '全职'
        	},
        	{
        		name: '小龙君',
        		img: 'http://xq.openguts.com/static/img/default-img/user.jpg',
        		recruit: '会展',
        		edu: '本科',
        		last_edit_time: '2017-9-12 12:00:00',
        		address: '厦门',
        		salary: '15K-39k',
        		state: '全职'
        	},
        	{
        		name: '小龙君',
        		img: 'http://xq.openguts.com/static/img/default-img/user.jpg',
        		recruit: '会展',
        		edu: '本科',
        		last_edit_time: '2017-9-12 12:00:00',
        		address: '厦门',
        		salary: '15K-39k',
        		state: '全职'
        	},
        	{
        		name: '小龙君',
        		img: 'http://xq.openguts.com/static/img/default-img/user.jpg',
        		recruit: '会展',
        		edu: '本科',
        		last_edit_time: '2017-9-12 12:00:00',
        		address: '厦门',
        		salary: '15K-39k',
        		state: '全职'
        	},
        	{
        		name: '小龙君',
        		img: 'http://xq.openguts.com/static/img/default-img/user.jpg',
        		recruit: '会展',
        		edu: '本科',
        		last_edit_time: '2017-9-12 12:00:00',
        		address: '厦门',
        		salary: '15K-39k',
        		state: '全职'
        	},
        	{
        		name: '小龙君',
        		img: 'http://xq.openguts.com/static/img/default-img/user.jpg',
        		recruit: '会展',
        		edu: '本科',
        		last_edit_time: '2017-9-12 12:00:00',
        		address: '厦门',
        		salary: '15K-39k',
        		state: '全职'
        	}
        ]
			}
		},
		mounted() {
			this.getList();
		},
		methods: {
    	getList() {
    		for(let i=0; i<this.list.length; i++){
    			this.$set(this.list[i], 'border_color', getColor());
    		}
    	}
    }
	}
</script>

<style rel="stylesheet/scss" lang="scss">
	body{
		background-color: #fff;
	}
	.resume_type_list_wrap{
		position: relative;
		.resume_type{
			position: absolute;
			top: 15px;
			right: 15px;
		}
	}
	.resumet_list{
		.item{
			background-color: #fff;
			border: 1px solid #d1dbe5;
			border-left-width: 3px;
			border-left-style: solid;
			border-radius: 4px;
			overflow: hidden;
			position: relative;
			&:hover{
				box-shadow: 0 0 10px 0 rgba(56, 81, 76, 0.12);
				>i{
					display: block;
				}
			}
			>i{
				display: none;
				position: absolute;
				top: 5px;
				right: 5px;
				color: #808080;
				font-size: 20px;
			}
			.img{
				width: 70px;
				height: 70px;
				background-size: cover;
				background-position: center;
				background-repeat: no-repeat;
			}
			.info{
				margin-left: 77px;
				h2{
					font-size: 18px;
					font-weight: 400;
					line-height: 25px;
					margin-bottom: 0;
					a{
						color: #20a0ff;
					}
					span{
						font-size: 16px;
						color: #e6775c;
					}
				}
				.state{
					font-size: 14px;
					color: #999;
					line-height: 20px;
				}
				p{
					line-height: 25px;
					height: 25px;
					overflow: hidden;
					font-size: 16px;
					color: #555;
				}
			}
			.edit{
				border-top: 1px solid #d1dbe5;
				margin-top: 5px;
				line-height: 28px;
				padding: 5px 7px;
				>span{
					color: #999;
					font-size: 13px;
				}
				>font{
					color: #555;
					font-size: 13px;
				}
			}
		}
	}
</style>