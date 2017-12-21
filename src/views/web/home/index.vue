<template>
	<div class="bg-gray full-height pb50">
		<search-criteria/>
		<!-- <div class="container pt40 pb40" v-if="list.is_new_list">
			<el-tabs v-model="active_list.new_list">
		    <el-tab-pane label="新闻列表" name="new">
					<list-new :list="list.new_list"/>
	      </el-tab-pane>
		  </el-tabs>
		</div> -->
    <div class="container new-recruit mt30" v-if="list.host_list.length != 0">
      <el-tabs v-model="active_list.host_list">
        <el-tab-pane label="热门岗位" name="host">
          <el-row :gutter="25" class="new_list">
            <el-col class="new_item">
              <search-list-one :list="list.host_list"/>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </div>

    <div class="container new-recruit" v-if="list.last_list.length != 0">
      <el-tabs v-model="active_list.last_list">
        <el-tab-pane label="最新招聘" name="last">
          <el-row :gutter="25" class="new_list">
            <el-col class="new_item">
              <search-list-one :list="list.last_list"/>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </div>
    <erweima></erweima>
	</div>
</template>
<script>
	import searchCriteria from '@/views/web/search/search-criteria';
  import searchListOne from '@/views/web/search/list-one';
  import erweima from './code';
  import { getHostestJob, getLastJob } from '@/api/home';
  import { parseTime } from '@/utils/index';
	export default {
		name: '',
		components: {
			searchCriteria,
			searchListOne,
      erweima
		},
		data() {
			return {
				active_list: {
        	host_list: 'host',
        	last_list: 'last'
        },
        list: {
        	host_list: [],
          last_list: [],
        },
        listQuery:{
          pageNo: 1,
          pageSize: 6,
          title: '',
        },
        recruitQuery: {
          pageNo: 1,
          pageSize: 6,
          workCity: '',
          jobType: '',
          jobName: '',
          companyId: '',
          beginDate: '',
          endDate: ''
        }
			}
		},
    mounted() {
      this.getHostestJob();
      this.getLastJob();
    },
		methods: {
      getHostestJob() {
        getHostestJob(this.listQuery).then(res => {
          this.list.host_list = res.list;
          console.log(this.list)
        })
      },
      getLastJob() {
        getLastJob(this.listQuery).then(res => {
          this.list.last_list = res.list;
        })
      }
		}
	}
</script>
<style rel="stylesheet/scss" lang="scss">

</style>