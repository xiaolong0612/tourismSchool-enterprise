<template>
	<div class="p30">
		<div class="form-wrap bg-gray p20">
			<el-form :inline="true" class="clearfix">
				<el-form-item class="mb0">
					<el-upload
					  ref="upload"
					  :action="gpath.action_school"
					  :file-list="fileList"
					  :auto-upload="false"
					  :on-success="getlist"
					  accept=".xlsx, .xls">
					  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
					  <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
					  <div slot="tip" class="el-upload__tip">只能上传excel文件，且不超过10M</div>
					</el-upload>
				</el-form-item>
				<el-form-item class="mb0">
					<a href="/static/file/学校导入.xlsx">下载上传模板</a>
				</el-form-item>
				<el-form-item class="mb0" label="学校名称">
					<el-select v-model="listQuery.name" filterable placeholder="请选择" @change="getlist">
				    <el-option
				      v-for="item in schoolList"
				      :key="item.id"
				      :label="item.name"
				      :value="item.name">
				    </el-option>
				  </el-select>
				</el-form-item>
			  <el-form-item label="学校总数" class="pull-right mb0">
			    <span class="c-success">{{total}}</span>所
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
		    <el-table-column type="expand">
		      <template slot-scope="props">
		        <el-form label-position="left" label-width="100px">
		          <el-form-item label="简介">
		            <span v-show="!props.row.edit">{{props.row.introduce}}</span>
		      			<el-input v-show="props.row.edit" size="small" type="textarea" v-model="props.row.introduce"></el-input>
		          </el-form-item>
		        </el-form>
		      </template>
		    </el-table-column>
		    <el-table-column
		      prop="id"
		      label="序号"
		      width="50px"
		      align="center">
		    </el-table-column>
		    <el-table-column
		      prop="name"
		      label="学校名称">
		      <template slot-scope="scope">
		      	<router-link :to="{path: '/student/list', query: {schoolName:scope.row.name, schoolId: scope.row.id }}">
							{{scope.row.name}}
		      	</router-link>
		      </template>
		    </el-table-column>
		    <el-table-column
		      prop="account"
		      label="账号">
		    </el-table-column>
		    <el-table-column
		      prop="location"
		      label="位置">

					<template slot-scope="scope">
		      	<span v-show="!scope.row.edit">{{scope.row.location}}</span>
		      	<el-input v-show="scope.row.edit" size="small" v-model="scope.row.location"></el-input>
		      </template>

		    </el-table-column>
		    <el-table-column
		      prop="totalStudent"
		      label="学生总数"
		      align="center">
					<template slot-scope="scope">
		      	<span v-show="!scope.row.edit">{{scope.row.totalStudent}}</span>
		      	<el-input v-show="scope.row.edit" size="small" v-model="scope.row.totalStudent"></el-input>
		      </template>
		    </el-table-column>

		    <el-table-column
		      label="操作"
		      width="150px"
		      align="center">
		      <template slot-scope="scope">
							<div v-show="!scope.row.edit">
								<el-button size="mini" type="text" @click="scope.row.edit = true" class="mr5">编辑</el-button>
								
								<el-popover
								  placement="top"
								  width="160"
								  trigger="click">
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
		  <div v-show="!listLoading" class="pull-right">
	      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.pageNo" :page-sizes="[30, 40, 50, 60, 70, 80]"
	        :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
	      </el-pagination>
	    </div>
		</div>
	</div>
</template>

<script>
  import { schoolList } from '@/api/form';
  import { getSchool, delSchool, updateSchool } from '@/api/admin/school';
  export default {
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
	      	pageSize: 50,
	      	name: ''
	      }
      }
    },
    mounted() {
    	this.getSchoolList();
      this.getlist();
    },
    methods: {
    	getSchoolList(){
    		schoolList().then(res => {
    			this.schoolList = res.data;
    		})
    	},
    	getlist(){
    		this.listLoading = true;
    		getSchool(this.listQuery).then(res => {
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
    	delSchool(id){
    		let data = {
    			id: id
    		}
    		delSchool(data).then(res => {
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