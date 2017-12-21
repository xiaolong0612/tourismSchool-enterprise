<template>
	<div class="p30">
		<div class="form-wrap bg-gray p20">
			<el-form :inline="true" class="clearfix">
				<el-form-item class="mb0">
					<el-upload
					  ref="upload"
					  :action="gpath.action_company"
					  :file-list="fileList"
					  :auto-upload="false"
					  :on-success="getlist"
					  accept=".xlsx, .xls">
					  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
					  <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
					  <div slot="tip" class="el-upload__tip">只能上传excel文件，且不超过10M</div>
					</el-upload>
				</el-form-item>
				<el-form-item class="mb0" label="企业名称">
					<el-select v-model="listQuery.name" filterable placeholder="请选择" @change="getlist">
				    <el-option
				      v-for="item in comList"
				      :key="item.id"
				      :label="item.companyName"
				      :value="item.companyName">
				    </el-option>
				  </el-select>
				</el-form-item>
			  <el-form-item label="企业总数" class="mb0 pull-right">
			    <span class="c-success">{{total}}</span>个
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
		          <el-form-item label="企业简介">
					      	<span v-show="!props.row.edit">{{props.row.introduce}}</span>
					      	<el-input v-show="props.row.edit" type="textarea" size="small" v-model="props.row.introduce"></el-input>
		          </el-form-item>
		        </el-form>
		      </template>
		    </el-table-column>
		    <el-table-column
		      prop="id"
		      label="序号"
		      width="50px">
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
		      label="行业"
		      width="120px">

					<template slot-scope="scope">
		      	<span v-show="!scope.row.edit">{{scope.row.industry}}</span>
		      	<el-input v-show="scope.row.edit" size="small" v-model="scope.row.industry"></el-input>
		      </template>

		    </el-table-column>
		    <el-table-column
		      prop="scale"
		      label="规模"
		      width="100px">
					<template slot-scope="scope">
		      	<span v-show="!scope.row.edit">{{scope.row.scale}}</span>
		      	<el-input v-show="scope.row.edit" size="small" v-model="scope.row.scale"></el-input>
		      </template>
		    </el-table-column>
		    <el-table-column
		      prop="linkName"
		      label="联系人"
		      width="100px">
				
					<template slot-scope="scope">
		      	<span v-show="!scope.row.edit">{{scope.row.linkName}}</span>
		      	<el-input v-show="scope.row.edit" size="small" v-model="scope.row.linkName"></el-input>
		      </template>

		    </el-table-column>
		    <el-table-column
		      prop="linkPhone"
		      label="联系电话"
		      width="120px">
				
					<template slot-scope="scope">
		      	<span v-show="!scope.row.edit">{{scope.row.linkPhone}}</span>
		      	<el-input v-show="scope.row.edit" size="small" v-model="scope.row.linkPhone"></el-input>
		      </template>

		    </el-table-column>

		    <el-table-column
		      prop="webUrl"
		      label="企业官网">
		      <template slot-scope="scope">

						<a v-show="!scope.row.edit" target="_blank" :href="scope.row.webUrl">
							{{scope.row.webUrl}}
						</a>
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
								  width="160"
								  trigger="click">
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
  import { comList } from '@/api/form';
  import { getComList, delCom, updateCom } from '@/api/admin/com';
  export default {
    data() {
      return {
	      comList: [],
      	fileList: [],
        tableData: [],
        backList: [],
        listLoading: false,
        total: null,
        listQuery: {
	      	pageNo: 1,
	      	pageSize: 50,
	      	name: '',
	      }
      }
    },
    mounted() {
    	this.getFormComList();
      this.getlist();
    },
    methods: {
    	getFormComList(){
    		comList().then(res => {
    			this.comList = res.data;
    		})
    	},
    	getlist(){
    		this.listLoading = true;
    		getComList(this.listQuery).then(res => {
    			if(typeof res.code != 'undefined'){
    				if(res.code == -1){
    					this.listLoading = false;
    					return;
    				}
    			}
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
    	submitUpload(){
    		this.$refs.upload.submit();
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