<template>
	<div class="p30">
		<!-- <div class="form-wrap bg-gray p20">
			<el-upload
			  class="upload-demo"
			  action="https://jsonplaceholder.typicode.com/posts/"
			  show-file-list='false'
			  :file-list="fileList">
			  <el-button size="small" type="primary">点击上传</el-button>
			  <div slot="tip" class="el-upload__tip">只能上传excel文件，且不超过500kb</div>
			</el-upload>
		</div> -->
		<div class="pt20">
			<el-table
		    :data="tableData"
		    v-loading="listLoading"
		    stripe
		    style="width: 100%"
		    max-height="700px">
		    <el-table-column
		      prop="id"
		      label="序号">
		    </el-table-column>
		    <el-table-column
		      prop="companyName"
		      label="企业名称">
		    </el-table-column>
		    <el-table-column
		      prop="account"
		      label="账号">
		    </el-table-column>
		    <el-table-column
		      prop="industry"
		      label="行业">

					<template slot-scope="scope">
		      	<span v-show="!scope.row.edit">{{scope.row.industry}}</span>
		      	<el-input v-show="scope.row.edit" size="small" v-model="scope.row.industry"></el-input>
		      </template>

		    </el-table-column>
		    <el-table-column
		      prop="scale"
		      label="规模">
					<template slot-scope="scope">
		      	<span v-show="!scope.row.edit">{{scope.row.scale}}</span>
		      	<el-input v-show="scope.row.edit" size="small" v-model="scope.row.scale"></el-input>
		      </template>
		    </el-table-column>
		    <el-table-column
		      prop="linkName"
		      label="联系人">
				
					<template slot-scope="scope">
		      	<span v-show="!scope.row.edit">{{scope.row.linkName}}</span>
		      	<el-input v-show="scope.row.edit" size="small" v-model="scope.row.linkName"></el-input>
		      </template>

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
		      prop="introduce"
		      label="简介">
				
					<template slot-scope="scope">
		      	<span v-show="!scope.row.edit">{{scope.row.introduce}}</span>
		      	<el-input v-show="scope.row.edit" size="small" v-model="scope.row.introduce"></el-input>
		      </template>

		    </el-table-column>
		    <el-table-column
		      prop="webUrl"
		      label="企业官网">
		      <template slot-scope="scope">

						<router-link v-show="!scope.row.edit" :to="scope.row.webUrl">
							{{scope.row.webUrl}}
						</router-link>
		      	<el-input v-show="scope.row.edit" size="small" v-model="scope.row.webUrl"></el-input>
		      </template>

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
								  <p>确定删除<span style="color:red;">{{scope.row.companyName}}</span>么？</p>
								  <div style="text-align: right; margin: 0">
								    <el-button type="text" size="mini" @click="delCom(scope.row.id)">确定</el-button>
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
  import { getComList, delCom, updateCom } from '@/api/admin/com';
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
	      	pageSize: 50
	      }
      }
    },
    mounted() {
      this.getlist();
    },
    methods: {
    	getlist(){
    		this.listLoading = true;
    		getComList(this.listQuery).then(res => {
	    		this.tableData = res.list;
	    		for(let i in this.tableData){
        		this.$set(this.tableData[i], 'edit', false);
        	}
        	this.backList = JSON.parse(JSON.stringify(this.tableData));
        	this.total = res.total;
    			this.listLoading = false;
	    	})
    	},
    	delCom(id){
    		let data = {
    			id: id
    		}
    		delCom(data).then(res => {
    			this.$message({
	          message: '删除成功',
	          type: 'success'
	        });
    			this.getlist();
    		})
    	},
    	delCom(id){
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
    		updateCom(scope.row).then(res => {
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