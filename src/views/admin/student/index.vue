<template>
	<div class="p30">
		<div class="form-wrap bg-gray p20">
			<el-form :inline="true">
				<el-form-item label="学生总数" class="pull-right mb0">
			    <span class="c-success">{{total}}</span>人
			  </el-form-item>

				<el-form-item class="mb0" label="学生类型" v-if="type == 0">
					<!-- <el-input v-model="listQuery.schoolName" placeholder="请输入" @change="search"></el-input> -->
					<el-select v-model="listQuery.registerType" filterable placeholder="请选择" @change="search">
				    <el-option
				      label="平台导入"
				      :value="0">
				    </el-option>
				    <el-option
				      label="自主注册"
				      :value="1">
				    </el-option>
				  </el-select>
				</el-form-item>

				<el-form-item class="mb0" label="学校名称" v-if="type == 0">
					<!-- <el-input v-model="listQuery.schoolName" placeholder="请输入" @change="search"></el-input> -->
					<el-select v-model="listQuery.schoolId" filterable placeholder="请选择" @change="search">
				    <el-option
				      v-for="item in schoolList"
				      :key="item.id"
				      :label="item.name"
				      :value="item.id">
				    </el-option>
				  </el-select>
				</el-form-item>
				<el-form-item class="mb0" label="学生姓名">
					<el-input v-model="listQuery.name" placeholder="请输入" @change="getlist"></el-input>
				</el-form-item>
				<el-form-item class="mb0">
					<el-upload
					  ref="upload"
					  :action="gpath.action_student"
					  :file-list="fileList"
					  :auto-upload="false"
					  :on-success="getlist"
					  accept=".xlsx, .xls">
					  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
					  <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
					  <!-- <div slot="tip" class="el-upload__tip">只能上传excel文件，且不超过500kb</div> -->
					</el-upload>
				</el-form-item>
				<el-form-item class="mb0">
					<a href="/static/file/学生导入.xlsx">下载上传模板</a>
				</el-form-item>
				<el-form-item class="mb0">
					<el-button size="small" type="primary" class="ml20" @click="handleDownload">导出excel</el-button>
				</el-form-item>
			</el-form>
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
		      width="150px"
					trigger="click">
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
	import { mapGetters } from 'vuex';
  import { getSchool } from '@/api/admin/school';
  import { getStudent, delStudent, updateStudent } from '@/api/admin/student';
  export default {
  	computed: {
	    ...mapGetters([
	      'type',
	      'user'
	    ])
	  },
    data() {
      return {
      	schoolList: [],
      	fileList: [],
        tableData: [],
        backList: [],
        listLoading: false,
        total: null,
      	listQuery: {
	      	pageNo: 1,
	      	pageSize: 30,
	      	schoolId: '',
	      	studentName: '',
	      	registerType: 0
	      },
	      schoolQuery: {
	      	pageNo: 1,
	      	pageSize: 100,
	      }
      }
    },
    mounted() {
    	if(this.type == 1){
    		this.listQuery.schoolId = this.user.id;
    	}else {
    		this.getSchool();
    	}
      this.getlist();
    },
    methods: {
    	search(){
    		this.getlist();
    	},
    	getSchool(){
    		getSchool(this.schoolQuery).then(res => {
    			if(typeof res.code != 'undefined'){
    				if(res.code == -1){
    					return;
    				}
    			}
	    		this.schoolList = res.list;
    			this.listQuery.schoolId = typeof this.$route.query != undefined ? this.$route.query.schoolId : '';
    			this.getlist();
	    	})
    	},
    	getlist(){
    		this.listLoading = true;
    		getStudent(this.listQuery).then(res => {
    			if(typeof res.code != 'undefined'){
    				if(res.code == -1){
    					this.listLoading = false;
    					return;
    				}
    			}
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
    			if(typeof res.code != 'undefined'){
    				if(res.code == -1){
    					return;
    				}
    			}
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
    	},
    	handleDownload() {
	      this.downloadLoading = true
	      require.ensure([], () => {
	        const { export_json_to_excel } = require('@/vendor/Export2Excel')
	        const tHeader = ['编号', '姓名', '账号', '年龄', '学校','电话','邮箱','性别']
	        const filterVal = ['stuNo', 'name','account', 'age', 'schoolName','linkPhone','email','sexStr']
	        const list = this.tableData
	        const data = this.formatJson(filterVal, list)
	        export_json_to_excel(tHeader, data, '学生列表')
	        this.downloadLoading = false
	      })
	    },
	    formatJson(filterVal, jsonData) {
	      return jsonData.map(v => filterVal.map(j => {
	        if (j === 'timestamp') {
	          return parseTime(v[j])
	        } else {
	          return v[j]
	        }
	      }))
	    }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">

</style>