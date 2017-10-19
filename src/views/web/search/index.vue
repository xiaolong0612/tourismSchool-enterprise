<template>
	<div>
		<search-criteria @search="change" :data="res" :pageNo="listQuery.pageNo"/>
		<div class="container pt30" style="width: 958px" v-if="res.success">
			<el-tabs v-model="active_list.search_result">
		    <el-tab-pane label="搜索结果" name="result">
					<search-list-two :list="list" :key="listKey" @jobid="getJobId"/>

          <div class="pb80">
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page.sync="listQuery.pageNo"
              :page-size="listQuery.pageSize"
              layout="total, prev, pager, next"
              :total="listQuery.total">
            </el-pagination>
          </div>
	      </el-tab-pane>
		  </el-tabs>
		</div>

    <el-dialog
      title="简历列表"
      :visible.sync="dialogResumeList"
      width="60%">
      <resume-item-select :jobId="jobId" @dialogClose="dialogResumeListClose"></resume-item-select>
    </el-dialog>
	</div>
</template>
<script>
	import searchCriteria from '@/views/web/search/search-criteria';
	import searchListTwo from '@/views/web/search/list-two';
  import resumeItemSelect from '@/views/web/user/resume/list-item-select';
	export default {
		name: '',
		components: {
			searchCriteria,
			searchListTwo,
      resumeItemSelect
		},
		data() {
			return {
				active_list: {
					search_result: 'result'
				},
				list: [],
        listKey: 0,
        dialogKey: 0,
        res: {
          success: false
        },

        jobId: '',
        dialogResumeList: false,
        listQuery: {
          pageNo: 1,
          pageSize: 10,
          total: ''
        }
			}
		},
		methods: {
      change(res){
        this.list = res.list;
        this.res.success = res.success;
        this.listQuery.total = res.total;
        this.listKey++;
      },
      dialogResumeListClose(val){
        this.dialogResumeList = val
      },
      handleCurrentChange(val) {
        this.listQuery.pageNo = val;
      },
      getJobId(val){
        this.jobId = val;
        this.dialogResumeList = true;
      }
		}
	}
</script>
<style rel="stylesheet/scss" lang="scss">

</style>