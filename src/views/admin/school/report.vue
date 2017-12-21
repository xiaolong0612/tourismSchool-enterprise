<template>
	<div class="p30">
		<el-button size="small" type="primary" class="mb20" @click="handleDownload">导出excel</el-button>
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
	      prop="name"
	      label="学校名称">
	    </el-table-column>
	    <!-- <el-table-column
	      prop="introduce"
	      label="简介">
	    </el-table-column> -->
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

	    <el-table-column
	      label="操作">
	      <template slot-scope="scope">
	      	<router-link :to="{path: '/report/list/details', query:{id:scope.row.id}}">查看详情</router-link>
	      </template>
	    </el-table-column>

	  </el-table>
	  <div v-show="!listLoading" class="pull-right">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.pageNo" :page-sizes="[30, 40, 50, 60, 70, 80]"
        :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
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
        listLoading: false,
        downloadLoading: false,
        total: null,
        listQuery: {
	      	pageNo: 1,
	      	pageSize: 50
	      },
	      total: 0
      }
    },
    mounted() {
      this.getlist();
    },
    methods: {
    	getlist(){
    		this.listLoading = true;
    		getReport(this.listQuery).then(res => {
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
    	handleDownload() {
	      this.downloadLoading = true
	      require.ensure([], () => {
	        const { export_json_to_excel } = require('@/vendor/Export2Excel')
	        const tHeader = ['序号', '学校名称', '学生总数', '成功数', 'successRate']
	        const filterVal = ['id', 'name','totalStudent', 'successCount', 'successRate']
	        const list = this.tableData
	        const data = this.formatJson(filterVal, list)
	        export_json_to_excel(tHeader, data, '报表')
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