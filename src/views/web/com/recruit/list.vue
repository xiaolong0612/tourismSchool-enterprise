<template>
	<div>
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
				    :data="tableData"
				    stripe
				    style="width: 100%"
				    class="table_list">

				    <el-table-column
				      type="selection"
				      width="55">
				    </el-table-column>

				    <el-table-column
				      prop="jobName"
				      label="岗位"
				      width="80">
				    </el-table-column>

				    <el-table-column
				      prop="recruitNumber"
				      label="人数"
				      width="90">
				    </el-table-column>

				    <el-table-column
				      prop="workExperience"
				      label="经验"
				      width="90">
				    </el-table-column>

				    <el-table-column
				      prop="income"
				      label="待遇"
				      width="120">
				    </el-table-column>

				    <el-table-column
				      prop="linkName"
				      label="联系人"
				      width="80">
				    </el-table-column>

				    <el-table-column
				      prop="linkPhone"
				      label="联系方式"
				      width="160">
				    </el-table-column>

				    <el-table-column
				      prop="address"
				      label="地址"
				      width="340">
				    </el-table-column>

				    <el-table-column
				      label="操作">
				      <template scope="scope">
				      	<div class="edit_wrap">
					      	<el-button v-if="scope.row.use" type="success" size="small" @click="handlerUse(scope)">启用</el-button>
					      	<el-button v-if="!scope.row.use" type="warning" size="small" @click="handlerDisable(scope)">停用</el-button>

					      	<el-button type="text" size="small" class="del" @click="handlerDel(scope)"><i class="el-icon-circle-close"></i></el-button>
					      </div>
				      </template>
				    </el-table-column>

				  </el-table>
				  <div class="pt15">
				  	<el-pagination
					    layout="prev, pager, next"
					    :total="50"
					    class="pull-right">
					  </el-pagination>
				  </div>
				</el-tab-pane>
			</el-tabs>
			<div class="all_edit">
				<el-button type="danger" size="small">删除</el-button>

				<el-button type="success" size="small" @click="handlerUse()">启用</el-button>
				<el-button type="warning" size="small" @click="handlerDisable()">停用</el-button>

    		<el-select class="ml10" v-model="recruit_type.select" placeholder="请选择">
			    <el-option
			      v-for="item in recruit_type.list"
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
  export default {
    data() {
      return {
      	active_list: {
        	resume_list: 'recruit',
        },
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
        tableData: [{
          jobName: '导游',
          recruitNumber: 2,
          workExperience: '1年',
          income: '2000-5000',
          linkName: '王小虎',
          linkPhone: '18636787878',
          address: '上海市普陀区金沙江路 1518 弄',
          use: true
        }, {
          jobName: '导游',
          recruitNumber: 12,
          workExperience: '1年',
          income: '2000-5000',
          linkPhone: '18636787878',
          linkName: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
          use: false
        }, {
          jobName: '导游',
          recruitNumber: 1,
          workExperience: '1年',
          income: '2000-5000',
          linkPhone: '18636787878',
          linkName: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          use: false
        }, {
          jobName: '导游',
          recruitNumber: 2,
          workExperience: '1年',
          income: '2000-5000',
          linkPhone: '18636787878',
          linkName: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
          use: true
        }]
      }
    },
    methods: {
    	handlerUse(scope){
    		scope.row.use = false;
    		this.$message({
          message: '启用成功',
          type: 'success'
        });
    	},
    	handlerDisable(scope){
    		scope.row.use = true;
    		this.$message({
          message: '关闭使用',
          type: 'warning'
        });
    	},
    	handlerDel(scope){
    		this.$message({
          message: '已删除',
          type: 'success'
        });
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