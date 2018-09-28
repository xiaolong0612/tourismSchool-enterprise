<template>
	<div style="background:url(/static/banner/木纹背景-030.jpg);min-height:calc(100vh - 95px)">
		<div class="breadcrumb-wrap container pt95">
			<el-breadcrumb separator="/">
				  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
				  <el-breadcrumb-item>谁来应聘</el-breadcrumb-item>
				</el-breadcrumb>
		</div>
		<div class="container panel_white mt20 pt20 resume_type_list_wrap pb50">
			<el-tabs v-model="active_list.resume_list">
		    <el-tab-pane label="简历列表" name="resume">
		    	
	        <el-row :gutter="15" class="resumet_list">
	          <el-col :span="6" v-for="item in list" :key="item.last_edit_time">
	          	<div class="item mb20" :style="{borderLeftColor: item.border_color}">
	          		<div style="padding: 7px 7px 0">
	          			<!-- <div class="img pull-left" :style="{backgroundImage: 'url('+item.img+')'}"></div> -->
	          			<!-- <div class="info">
	          				<h2>
	          					<router-link :to="{path: '/search/student-details', query: {id: item.studentId}}">
											{{item.studentName}}[{{item.recruit}}]
	          					</router-link>
	          				</h2>
	          				<font class="state">{{item.state}} / 1年</font>
		          			<p>
		          				{{item.jobName}} / 
		          				{{item.edu}}
		          			</p>
	          			</div> -->
	          			<div>
	          				<span class="pull-right" style="font-size:14px;color:#555"> 
	          					{{item.jobName}}
	          				</span>
	          				<router-link :to="{path: '/com/inbox/details', query: {id: item.resumeId,deliveryId: item.id,resumeState:item.resumeState,studentId:item.studentId, is_com_look: true}}">
											{{item.studentName}}
	          				</router-link>
	          			</div>
	          		</div>
	          		<div class="edit">
	          			<router-link :to="{path: '/com/inbox/details', query: {id: item.resumeId,deliveryId: item.id,resumeState:item.resumeState,studentId:item.studentId, is_com_look: true}}">
		          			<el-button class="pull-right" size="mini" type="primary">查看</el-button>
		          		</router-link>
		          		
	          			<span>收件时间:</span>
	          			<font>{{item.deliveryTime}}</font>
	          		</div>
	          	</div> 
	          </el-col>
	        </el-row>
	        <div class="pt15">
				  	<el-pagination
					    layout="prev, pager, next"
					    :current-page.sync="listQuery.pageNo"
	        		:page-size="listQuery.pageSize"
					    :total="total"
					    @current-change="handleCurrentChange"
					    class="pull-right">
					  </el-pagination>
				  </div>
	      </el-tab-pane>
		  </el-tabs>

			<div class="resume_type">
    		<el-select v-model="resumeState" placeholder="请选择" @change="getList()">
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
	import { mapGetters } from 'vuex';
  import { getColor } from '@/utils/index';
  import { getInbox } from '@/api/com/inbox';
	export default {
		computed: {
	    ...mapGetters([
	      'id'
	    ])
	  },
		data() {
			return {
				active_list: {
        	resume_list: 'resume',
        },
        resumeState: '',
        resume_type: {
        	list: [
        		{
        			value: '',
		          label: '全部'
		        },
        		{
        			value: '0',
		          label: '未处理'
		        },
        		{
        			value: '2',
		          label: '被邀面试'
		        },
        		{
        			value: '3',
		          label: '面试成功'
		        },
        		{
        			value: '4',
		          label: '无结果'
		        },
        		{
        			value: '5',
		          label: '平台推荐'
		        },
        	]
        },
        total: 0,
        listQuery: {
        	pageNo: 1,
        	pageSize: 28,
        	companyId: '',
        	state: '',
        	resumeState: '',
        },
        list: []
			}
		},
		mounted() {
			this.setDefault();
			this.getList();
		},
		methods: {
			setDefault(){
				this.listQuery.companyId = this.id;
			},
    	getList(type) {
    		this.listQuery.resumeState = this.resumeState;
    		if(type != 'page'){
					this.listQuery.pageNo = 1;
				}
    		if(this.listQuery.resumeState == 5){
    			this.listQuery.resumeState = '';
    			this.listQuery.state= 2
    		}else{
    			this.listQuery.state= ''
    		}
    		getInbox(this.listQuery).then(res => {
    			this.list = res.list;
    			this.total = res.total;
    			for(let i=0; i<this.list.length; i++){
	    			this.$set(this.list[i], 'border_color', getColor());
	    		}
    		})
    		
    	},
    	handleCurrentChange(val){
    		this.listQuery.pageNo = val;
    		this.getList('page');
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
			right: 30px;
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