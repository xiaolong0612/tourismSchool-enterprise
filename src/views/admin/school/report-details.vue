<template>
	<div class="p30">
		<div style="width: 80%">
			<div class="form-wrap bg-gray p20 mb20">
				<el-form :inline="true">
				  <el-form-item label="面试状态"  class="mb0">
				    <el-select v-model="listQuery.state" @change="getSchoolResumeDeliveryInvitate">
				      <el-option label="面试成功" :value="2"></el-option>
				      <el-option label="无结果" :value="3"></el-option>
				    </el-select>
				  </el-form-item>
				  <el-form-item label="成功比例" class="pull-right mb0">
				    <span class="c-blue">{{proportion * 100 }}%</span>
				  </el-form-item>
				  <el-form-item label="成功个数" class="pull-right mb0">
				    <span class="c-success">{{interviewSuccess}}</span>
				  </el-form-item>
				</el-form>
			</div>
			<el-table
		    :data="tableData"
		    v-loading="listLoading"
		    stripe>
		    <el-table-column
		      prop="studentName"
		      label="学生姓名">
		    </el-table-column>
		    <el-table-column
		      prop="major"
		      label="专业">
		    </el-table-column>
		    <el-table-column
		      prop="companyName"
		      label="公司名称">
		    </el-table-column>
		    <el-table-column
		      prop="jobName"
		      label="岗位名称">
		    </el-table-column>
		    <el-table-column
		      prop="deliveryTime"
		      label="投递时间">
		    </el-table-column>
		    <el-table-column
		      prop="resumeState"
		      label="状态">
		      <template slot-scope="scope">
		      	{{state[scope.row.resumeState]}}
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
  import { getSchoolResumeDeliveryInvitate } from '@/api/admin/school';
	export default {
		computed: {
	    ...mapGetters([
	      'type',
	      'id'
	    ])
	  },
    data() {
      return {
      	listLoading: false,
      	listQuery: {
      		pageNo:1,
      		pageSize: 50,
      		schoolId: 1,
      		state: 2,
      	},
      	state: ['投递成功','待面试','面试成功','无结果'],
      	tableData: [],
      	interviewSuccess: 0,
      	proportion: 0,
      	total: null
      }
    },
    mounted() {
    	console.log(this.$route);
    	if(this.type == 1){
    		this.listQuery.schoolId = this.id;
    	}
    	else this.listQuery.schoolId = this.$route.query.id;
      this.getSchoolResumeDeliveryInvitate();
    },
    methods: {
    	getSchoolResumeDeliveryInvitate(){
    		this.listLoading = true;
    		getSchoolResumeDeliveryInvitate(this.listQuery).then(res => {
    			if(typeof res == 'undefined'){
    				this.listLoading = false;
    				return;
    			}
	    		this.tableData = res.list;
	    		this.total = res.total;
	    		this.listLoading = false;
	    	})
    	},
    	handleCurrentChange(val){
    		this.listQuery.pageNo = val;
    		this.getlist();
    	},
    	handleSizeChange(val){
    		this.listQuery.pageSize = val;
    		this.getlist();
    	},
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
	
	
</style>