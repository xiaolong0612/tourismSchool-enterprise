<template>
	<div class="p30">
		<div class="form-wrap bg-gray p20">
			<el-upload
			  ref="upload"
			  :action="gpath.action_school"
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
		    stripe
		    style="width: 100%"
		    max-height="700px">
		    <el-table-column
		      prop="id"
		      label="序号">
		    </el-table-column>
		    <el-table-column
		      prop="name"
		      label="学校名称">
		    </el-table-column>
		    <el-table-column
		      prop="account"
		      label="账号">
		    </el-table-column>
		    <el-table-column
		      prop="location"
		      label="位置">

					<template scope="scope">
		      	<span v-show="!scope.row.edit">{{scope.row.location}}</span>
		      	<el-input v-show="scope.row.edit" size="small" v-model="scope.row.location"></el-input>
		      </template>

		    </el-table-column>
		    <el-table-column
		      prop="totalStudent"
		      label="学生总数">
					<template scope="scope">
		      	<span v-show="!scope.row.edit">{{scope.row.totalStudent}}</span>
		      	<el-input v-show="scope.row.edit" size="small" v-model="scope.row.totalStudent"></el-input>
		      </template>
		    </el-table-column>

		    <el-table-column
		      prop="introduce"
		      label="简介">
				
					<template scope="scope">
		      	<span v-show="!scope.row.edit">{{scope.row.introduce}}</span>
		      	<el-input v-show="scope.row.edit" size="small" v-model="scope.row.introduce"></el-input>
		      </template>

		    </el-table-column>

		    <el-table-column
		      label="操作"
		      width="150px">
		      <template scope="scope">
							<div v-show="!scope.row.edit">
								<el-button size="mini" type="text" @click="scope.row.edit = true" class="mr5">编辑</el-button>
								
								<el-popover
								  placement="top"
								  width="160">
								  <p>确定删除<span style="color:red;">{{scope.row.name}}</span>么？</p>
								  <div style="text-align: right; margin: 0">
								    <el-button type="text" size="mini" @click="delSchool(scope.row.id)">确定</el-button>
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
		</div>
	</div>
</template>

<script>
  import { getSchool, delSchool, updateSchool } from '@/api/admin/school';
  export default {
    data() {
      return {
      	fileList: [],
        tableData: [],
        backList: [],
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
    		getSchool(this.listQuery).then(res => {
	    		this.tableData = res.list;
	    		for(let i in this.tableData){
        		this.$set(this.tableData[i], 'edit', false);
        	}
        	this.backList = JSON.parse(JSON.stringify(this.tableData));
	    	})
    	},
    	delCom(id){
    		let data = {
    			id: id
    		}
    		delSchool(data).then(res => {
    			this.$message({
	          message: '删除成功',
	          type: 'success'
	        });
    			this.getlist();
    		})
    	},
    	delSchool(id){
    		let data = {
    			id: id
    		}
    		delSchool(data).then(res => {
    			this.$message({
	          message: '删除成功',
	          type: 'success'
	        });
    			this.getlist();
    		})
    	},
    	handleUpdata(scope){
    		updateSchool(scope.row).then(res => {
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
    	}
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">

</style>