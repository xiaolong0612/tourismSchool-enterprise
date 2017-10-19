<template>
	<div class="p30">
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
		      prop="introduce"
		      label="简介">
		    </el-table-column>
		    <el-table-column
		      prop="totalStudent"
		      label="学生总数">
		    </el-table-column>
		    <el-table-column
		      prop="successCount"
		      label="成功数">
		    </el-table-column>
		    <el-table-column
		      prop="successRate"
		      label="成功率">
		    </el-table-column>

		  </el-table>
		  <el-pagination
	      @current-change="handleCurrentChange"
	      :current-page.sync="listQuery.pageNo"
	      :page-size="listQuery.pageSize"
	      layout="total, prev, pager, next"
	      :total="total"
	      class="mt10">
	    </el-pagination>
		</div>
	</div>
</template>

<script>
  import { getReport } from '@/api/admin/school';
  export default {
    data() {
      return {
      	fileList: [],
        tableData: [],
        backList: [],
        listQuery: {
	      	pageNo: 1,
	      	pageSize: 30
	      },
	      total: 0
      }
    },
    mounted() {
      this.getlist();
    },
    methods: {
    	getlist(){
    		getReport(this.listQuery).then(res => {
	    		this.tableData = res.list;
	    		this.total = res.total;
	    	})
    	},
    	handleCurrentChange(val){
    		this.listQuery.pageNo = val;
    		this.getlist();
    	}
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">

</style>