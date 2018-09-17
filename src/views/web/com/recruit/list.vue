<template>
	<div style="min-height:calc(100vh - 95px)">
		<div class="breadcrumb-wrap container pt95">
			<el-breadcrumb separator="/">
			  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			  <el-breadcrumb-item>招聘列表</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="container pt20 pb80 recruit_list_wrap">
			<el-tabs v-model="active_list.resume_list">
		    <el-tab-pane label="招聘列表" name="recruit">
					<el-table
						v-loading="tableLoading"
				    :data="tableData"
				    stripe
				    style="width: 100%"
				    class="table_list"
				    @selection-change="selectChange">

				    <el-table-column
				      type="selection"
				      width="55">
				    </el-table-column>

				    <el-table-column
				      prop="jobName"
				      label="岗位">
				    </el-table-column>

				    <el-table-column
				      prop="recruitNumber"
				      label="招聘人数"
				      align="center">
				    </el-table-column>

				    <el-table-column
				      prop="workExperience"
				      label="经验(年)">
				    </el-table-column>

				    <el-table-column
				      prop="income"
				      label="待遇">
				    </el-table-column>

						
				      <!-- :filters="[{ text: '兼职', value: 0 }, { text: '全职', value: 1 }, { text: '实习', value: 2 }]"
      				:filter-method="filterJobType" -->
				    <el-table-column
				      prop="jobType"
				      label="工作类型">
				      <template slot-scope="scope">
				      	{{jobType[scope.row.jobType]}}
				      </template>
				    </el-table-column>

				    <el-table-column
				      prop="linkName"
				      label="联系人">
				    </el-table-column>

				    <el-table-column
				      prop="linkPhone"
				      label="联系方式">
				    </el-table-column>

				    <el-table-column
				      prop="workAddress"
				      label="地址">
				      <template slot-scope="scope">
								{{scope.row.workCity}}/{{scope.row.workAddress}}
				      </template>
				    </el-table-column>

				    <el-table-column
				      prop="reviewCount"
				      label="浏览次数"
				      align="center">
				    </el-table-column>

				    <el-table-column
				      label="操作"
				      align="center"
				      width="230px">
				      <template slot-scope="scope">
				      	<div class="edit_wrap">
									<router-link :to="{path: '/com/recruit/release', query:{id:scope.row.id}}">
				      			<el-button class="mr10" type="primary" size="small">编辑</el-button>
									</router-link>
					      	<el-button class="mr10" v-if="scope.row.isUse == '0'" type="success" size="small" @click="handlerUse(scope.row, 1)" :loading="scope.row.loading_btn">启用</el-button>
					      	<el-button class="mr10" v-if="scope.row.isUse 
					      	!= '0'" type="warning" size="small" @click="handlerUse(scope.row, 0)" :loading="scope.row.loading_btn">停用</el-button>
									<el-popover trigger="click" placement="top">

					          <p>确定删除该条招聘信息么</p>
					          <el-button class="pull-right mt5" type="primary" size="mini" @click="handlerDel(scope.row.id)">确定</el-button>

					          <el-button slot="reference" type="text" size="small" class="del"><i class="el-icon-circle-close"></i></el-button>
					        </el-popover>
					      	
					      </div>
				      </template>
				    </el-table-column>

				  </el-table>
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
			<div class="all_edit">
				<!-- <el-button type="danger" size="small">删除</el-button> -->

				<el-button type="success" size="small" @click="handlerSomeUse(1)">启用</el-button>
				<el-button type="warning" size="small" @click="handlerSomeUse(0)">停用</el-button>

    		<!-- <el-select class="ml10" v-model="recruit_type.select" placeholder="请选择">
			    <el-option
			      v-for="item in recruit_type.list"
			      :key="item.value"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
			  </el-select> -->
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';
  import { searchJob, delJob, isUse } from '@/api/com/recruit';
  export default {
  	computed: {
	    ...mapGetters([
	      'id'
	    ])
	  },
    data() {
    	// 所有变量都存在这里，调用 this.变量名
      return {
      	active_list: {
        	resume_list: 'recruit',
        },
        jobType: ['兼职', '全职', '实习'],
        total: 0,
        tableLoading: true,
        recruit_type: {
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
        tableData: [],
        selectList: [],
        listQuery: {
        	pageNo: 1,
        	pageSize: 30,
        	companyId: '',
        	workCity: '',
        	jobType: '',
        	jobName: ''
        }
      }
    },
    // 调用方法的函数，，方法必须以this.方法名的方式调用
    mounted(){
    	this.setDefault();
			this.getList();
    },
    // 写方法的地方
    methods: {
    	setDefault(){
    		this.listQuery.companyId= this.id;
    	},
    	getList(){
    		this.tableLoading = true;
    		// 调用接口,参数必须以 this.参数名 才能调用
    		searchJob(this.listQuery).then(res => {
    			for(let i=0; i<res.list.length; i++){
	    			this.$set(res.list[i], 'loading_btn', false);
	    		}	

    			this.tableData = res.list;

    			this.total = res.total;
    			this.tableLoading = false;
    			this.selectList = [];
    		})
    	},
    	delRecryit(id){
    		
    	},
    	handlerUse(row, state){
    		row.loading_btn = true;
    		isUse({ids: row.id, isUse: state}).then(rs => {
    			if (rs.code != -1) {
    				switch(state){
    					case 0:
    						this.$message.success('该岗位已关闭');
    						break;
    					case 1:
    						this.$message.success('该岗位启用成功');
    						break;
    				};
    				row.loading_btn = false;
    				this.getList();
    			}
    		})
    	},
    	handlerDel(id){
    		delJob({ id: id }).then(res => {
    			if (typeof res == 'undefined') return;
    			// 提示信息
    			this.$message({
	          message: '已删除',
	          type: 'success'
	        });
	        this.getList();
    		})
    		
    	},
    	handleCurrentChange(val){
    		this.listQuery.pageNo = val;
    		this.getList();
    	},
    	filterJobType(value, row) {
        return row.tag === value;
      },
      selectChange(selection){
      	for(let i in selection){
      		this.selectList[i] = selection[i].id;
      	}
      },
      handlerSomeUse(state){
      	if(this.selectList.length == 0){
      		this.$message.error('最少选择一个岗位');
      		return false;
      	}
      	isUse({ids: this.selectList.join(','), isUse: state}).then(rs => {
    			if (rs.code != -1) {
    				switch(state){
    					case 0:
    						this.$message.success('选中岗位已关闭');
    						break;
    					case 1:
    						this.$message.success('选中岗位启用成功');
    						break;
    				};
    				this.getList();
    			}
    		})
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
	.recruit_list_wrap{
		position: relative;
		.all_edit{
			position: absolute;
			top: 15px;
			right: 15px;
		}
		.table_list{
			.edit_wrap{
				.del{
					i{
						font-size: 18px;
						color: red;
						vertical-align: middle;
					}
				}
			}
		}
	}
</style>