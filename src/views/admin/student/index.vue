<template>
	<div class="p30">
		<div class="form-wrap bg-gray p20">
			<el-upload
			  ref="upload"
			  :action="gpath.action_student"
			  :file-list="fileList"
			  :auto-upload="false"
			  accept=".xlsx, .xls">
			  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
			  <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
			  <div slot="tip" class="el-upload__tip">只能上传excel文件，且不超过500kb</div>
			</el-upload>
		</div>
		<div class="pt20">
			<el-table
		    :data="tableData"
		    v-loading="listLoading"
		    stripe
		    style="width: 100%"
		    max-height="700px">
		    <el-table-column
		      prop="stuNo"
		      label="编号">
		    </el-table-column>
		    <el-table-column
		      prop="name"
		      label="姓名">
		      <template slot-scope="scope">
		      	<span v-show="!scope.row.edit">{{scope.row.name}}</span>
		      	<el-input v-show="scope.row.edit" size="small" v-model="scope.row.name"></el-input>
		      </template>
		    </el-table-column>
		    <el-table-column
		      prop="account"
		      label="账号">
		    </el-table-column>
		    <el-table-column
		      prop="age"
		      label="年龄">
		      <template slot-scope="scope">
		      	<span v-show="!scope.row.edit">{{scope.row.age}}</span>
		      	<el-input v-show="scope.row.edit" size="small" v-model="scope.row.age"></el-input>
		      </template>
		    </el-table-column>
		    <el-table-column
		      prop="schoolName"
		      label="学校">
		    </el-table-column>
		    <el-table-column
		      prop="linkPhone"
		      label="联系电话">
		      <template slot-scope="scope">
		      	<span v-show="!scope.row.edit">{{scope.row.linkPhone}}</span>
		      	<el-input v-show="scope.row.edit" size="small" v-model="scope.row.linkPhone"></el-input>
		      </template>
		    </el-table-column>
		    <el-table-column
		      prop="email"
		      label="邮箱">
		      <template slot-scope="scope">
		      	<span v-show="!scope.row.edit">{{scope.row.email}}</span>
		      	<el-input v-show="scope.row.edit" size="small" v-model="scope.row.email"></el-input>
		      </template>
		    </el-table-column>
		    <el-table-column
		      prop="sexStr"
		      label="性别">
		    </el-table-column>
		    <el-table-column
		      label="操作"
		      width="150px">
		      <template slot-scope="scope">
							<div v-show="!scope.row.edit">
								<el-button size="mini" type="text" @click="scope.row.edit = true" class="mr5">编辑</el-button>
								
								<el-popover
								  placement="top"
								  width="160">
								  <p>确定删除<span style="color:red;">{{scope.row.name}}</span>么？</p>
								  <div style="text-align: right; margin: 0">
								    <el-button type="text" size="mini" @click="delStudent(scope.row.id)">确定</el-button>
								  </div>

								  <el-button slot="reference" size="mini" type="danger" icon="el-icon-delete"></el-button>
								</el-popover>
							</div>
							<div v-show="scope.row.edit">
								<el-button size="mini" type="success" @click="handleUpdata(scope)">保存</el-button>
								<el-button size="mini" type="warning" @click="handleCancel(scope)">取消</el-button>
							</div>
						</template>
		    </el-table-column>
		  </el-table>
		  <div v-show="!listLoading" class="pull-right">
	      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.pageNo" :page-sizes="[30, 40, 50, 60, 70, 80]"
	        :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
	      </el-pagination>
	    </div>
		</div>
	</div>
</template>

<script>
  import { getStudent, delStudent, updateStudent } from '@/api/admin/student';
  export default {
    data() {
      return {
      	fileList: [],
        tableData: [],
        backList: [],
        listLoading: false,
        total: null,
      	listQuery: {
	      	pageNo: 1,
	      	pageSize: 30
	      }
      }
    },
    mounted() {
      this.getlist();
    },
    methods: {
    	getlist(){
    		this.listLoading = true;
    		getStudent(this.listQuery).then(res => {
	    		this.tableData = res.list;
	    		this.total = res.total;
	    		for(let i in this.tableData){
        		this.$set(this.tableData[i], 'edit', false);
        	}
        	this.backList = JSON.parse(JSON.stringify(this.tableData));
        	this.listLoading = false;
	    	})
    	},
    	delStudent(id){
    		let data = {
    			id: id
    		}
    		delStudent(data).then(res => {
    			this.$message({
	          message: '删除成功',
	          type: 'success'
	        });
    			this.getlist();
    		})
    	},
    	handleUpdata(scope){
    		updateStudent(scope.row).then(res => {
    			if(res.success){
    				scope.row.edit = false;
    				this.$message({
		          message: '编辑成功',
		          type: 'success'
		        });
    			}
    		})
    	},
    	handleCancel(scope){
				let index = scope.$index;
				for(let i in this.backList[index]){
					scope.row[i] = this.backList[index][i]
				}
      	scope.row.edit = false;
    	},
    	submitUpload(){
    		this.$refs.upload.submit();
    	},
    	fileUpSuccess(){
    		this.getlist();
    	},
    	handleCurrentChange(val){
    		this.listQuery.pageNo = val;
    		this.getlist();
    	},
    	handleSizeChange(val){
    		this.listQuery.pageSize = val;
    		this.getlist();
    	}
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">

</style>