<template>
	<div class="bg-gray full-height pb50">
		<search-criteria ref="searchCriteria"/>
		<!-- <div class="container pt40 pb40" v-if="list.is_new_list">
			<el-tabs v-model="active_list.new_list">
		    <el-tab-pane label="新闻列表" name="new">
					<list-new :list="list.new_list"/>
	      </el-tab-pane>
		  </el-tabs>
		</div> -->
    <div class="container new-recruit mt30 rel" v-if="list.host_list.length != 0 && type == 2">
      <el-tabs v-model="active_list.host_list">
        <el-tab-pane label="热门岗位" name="host">
          <el-row :gutter="25" class="new_list">
            <el-col class="new_item">
              <search-list-one :list="list.host_list"/>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <a class="abs" @click="search" style="right: 10px;top:0;line-height: 40px">全部岗位>></a>
    </div>

    <div class="container new-recruit" v-if="list.last_list.length != 0 && type == 2">
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
    <div class="container mt20" v-loading="loading">
      <search-list-student  v-if="list.student.length != 0 && type != 2" :list="list.student"></search-list-student>
    </div>
    <!-- <erweima></erweima> -->
	</div>
</template>
<script>
  import { mapGetters } from 'vuex';
  import { getType, getId } from '@/utils/auth';
	import searchCriteria from '@/views/web/search/search-criteria';
  import searchListOne from '@/views/web/search/list-one';
  import searchListStudent from '@/views/web/search/list-student';
  import erweima from './code';
  import { getHostestJob, getLastJob } from '@/api/home';
  import { searchResumeList } from '@/api/student/resume';
  import { parseTime } from '@/utils/index';
	export default {
		name: '',
		components: {
			searchCriteria,
			searchListOne,
      erweima,
      searchListStudent
		},
		data() {
			return {
        type: '',
				active_list: {
        	host_list: 'host',
        	last_list: 'last'
        },
        list: {
        	host_list: [],
          last_list: [],
          student: []
        },
        listQuery:{
          pageNo: 1,
          pageSize: 6,
          title: '',
        },
        loading: false,
        recruitQuery: {
          pageNo: 1,
          pageSize: 6,
          workCity: '',
          jobType: '',
          jobName: '',
          companyId: '',
          beginDate: '',
          endDate: ''
        },
        studentSearch: {
          pageNo: 1,
          pageSize: 30,
          id: '',
          expectJob: '',
          expectAddress: ''
        }
			}
		},
    mounted() {
      this.getType();
      this.setList();
    },
		methods: {
      getType(){
        this.type = getType();
      },
      setList(){
        // 显示简历列表
        if(this.type == 3){
          this.getStudentList();

        }else{ // 显示岗位列表
          this.getHostestJob();
          this.getLastJob();
        }
      },
      getStudentList(){
        this.loading = true;
        this.studentSearch.id = getId();
        searchResumeList(this.studentSearch).then(res => {
          this.list.student =res.list;
          this.loading = false;
        })
      },
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
      },
      search(){
        this.$refs.searchCriteria.onSubmit();
      }
		}
	}
</script>
<style rel="stylesheet/scss" lang="scss">

</style>