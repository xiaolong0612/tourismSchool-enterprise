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
				<el-form-item class="mb0">
					<a href="/static/file/企业导入.xlsx">下载上传模板</a>
				</el-form-item>
				<el-form-item class="mb0" label="企业名称" v-if="com_state == 0">
					<el-select v-model="listQuery.name" filterable placeholder="请选择" @change="getlist">
				    <el-option
				      v-for="item in comList"
				      :key="item.id"
				      :label="item.companyName"
				      :value="item.companyName">
				    </el-option>
				  </el-select>
				</el-form-item>
			  <el-form-item label="企业状态" class="mb0 pull-right">
			    <el-select v-model="com_state" placeholder="请选择" @change="changeComState">
			      <el-option label="全部" :value="0"></el-option>
			      <el-option label="待审核" value="待审核"></el-option>
			      <el-option label="审核通过" value="审核通过"></el-option>
			      <el-option label="拒绝" value="拒绝"></el-option>
			    </el-select>
			  </el-form-item>
			  <el-form-item label="企业总数" class="mb0 pull-right">
			    <span class="c-success">{{total}}</span>个
			  </el-form-item>
			</el-form>
		</div>
		<div class="pt20" v-if="com_state == 0">
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

						<a target="_blank" :href="scope.row.webUrl">
							{{scope.row.webUrl}}
						</a>
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
		<div class="pt20" v-if="com_state != 0">
			<el-table
		    :data="changeDate"
		    v-loading="listLoading"
		    stripe
		    style="width: 100%">
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
		      	<span>{{scope.row.industry}}</span>
		      </template>

		    </el-table-column>
		    <el-table-column
		      prop="scale"
		      label="规模"
		      type="number"
		      width="100px">
					<template slot-scope="scope">
		      	<span>{{scope.row.scale}}</span>
		      </template>
		    </el-table-column>
		    <el-table-column
		      prop="linkName"
		      label="联系人"
		      width="100px">
				
					<template slot-scope="scope">
		      	<span>{{scope.row.linkName}}</span>
		      </template>

		    </el-table-column>
		    <el-table-column
		      prop="linkPhone"
		      label="联系电话"
		      width="120px">
				
					<template slot-scope="scope">
		      	<span>{{scope.row.linkPhone}}</span>
		      </template>

		    </el-table-column>

		    <el-table-column
		      prop="webUrl"
		      label="企业官网">
		      <template slot-scope="scope">

						<a target="_blank" :href="scope.row.webUrl">
							{{scope.row.webUrl}}
						</a>
		      </template>
		    </el-table-column>
		    <el-table-column
		      label="操作"
		      width="150px">
		      <template slot-scope="scope">
							<div v-if="com_state != '审核通过' && com_state != '拒绝'">
							<el-button size="mini" type="success" @click="examination(scope.row.companyId,'审核通过 ')">通过</el-button>
							<el-button size="mini" type="warning" @click="examination(scope.row.companyId,'拒绝')">拒绝</el-button>
						</div>
					</template>
		    </el-table-column>
		  </el-table>
		  <div v-show="!listLoading" class="pull-right">
	      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="reviewQuery.pageNo" :page-sizes="[30, 40, 50, 60, 70, 80]"
	        :page-size="reviewQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
	      </el-pagination>
	    </div>
		</div>
	</div>
</template>

<script>
  import { mapGetters, } from 'vuex';
  import { comList } from '@/api/form';
  import { getComList, delCom, updateCom, companyReview, examination } from '@/api/admin/com';
  export default {
  	computed: {
      ...mapGetters([
        'id',
        'name',
        'user'
      ])
    },
    data() {
      return {
      	com_state: 0,
	      comList: [],
      	fileList: [],
        tableData: [],
        changeDate: [],
        backList: [],
        listLoading: false,
        total: null,
        listQuery: {
	      	pageNo: 1,
	      	pageSize: 50,
	      	name: '',
	      },
	      reviewQuery: {
	      	pageNo: 1,
	      	pageSize: 50,
	      	state: 1
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
    	getListReview(){
    		companyReview(this.reviewQuery).then(res => {
    			if(typeof res.code != 'undefined'){
    				if(res.code == -1){
    					this.listLoading = false;
    					return;
    				}
    			}
	    		this.changeDate = res.list;
	    		for(let i in this.changeDate){
        		this.$set(this.changeDate[i], 'edit', false);
        	}
        	this.backList = JSON.parse(JSON.stringify(this.changeDate));
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
    		if(com_state == 0){
    			this.listQuery.pageNo = val;
    			this.getlist();
    		}else{
    			this.reviewQuery.pageNo = val;
    			this.getListReview();
    		}
    	},
    	handleSizeChange(val){
    		if(com_state == 0){
    			this.listQuery.pageSize = val;
    			this.getlist();
    		}else{
    			this.reviewQuery.pageSize = val;
    			this.getListReview();
    		}
    	},
    	changeComState(val){
    		if(val == 0){
    			this.getlist();
    		}else{
    			this.reviewQuery.state = val;
    			this.getListReview()
    		}
    	},
    	examination(id, state){
    		let query = {
    			id: id,
    			reviewr: this.user.name,
    			state: state
    		}
    		examination(query).then(res => {
    			if(res.code != -1){
    				this.$message.success('审核通过');
    				this.changeComState('待审核');
    			}
    		})
    	}
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">

</style>