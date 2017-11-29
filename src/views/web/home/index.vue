<template>
	<div class="bg-gray">
		<search-criteria/>
		<div class="container pt40 pb40" v-if="list.is_new_list">
			<el-tabs v-model="active_list.new_list">
		    <el-tab-pane label="新闻列表" name="new">
					<list-new :list="list.new_list"/>
	      </el-tab-pane>
		  </el-tabs>
		</div>
		<div class="container new-recruit" v-if="list.is_recruit_list">
			<el-tabs v-model="active_list.recruit_list">
		    <el-tab-pane label="最新招聘" name="recruit">
	        <el-row :gutter="25" class="new_list">
	          <el-col class="new_item">
	            <search-list-one :list="list.recruit_list"/>
	          </el-col>
	        </el-row>
	      </el-tab-pane>
		  </el-tabs>
		</div>
	</div>
</template>
<script>
	import searchCriteria from '@/views/web/search/search-criteria';
	import listNew from '@/views/web/new/list-new';
	import searchListOne from '@/views/web/search/list-one';
  import { getListNew } from '@/api/index/new';
  import { searchJob } from '@/api/com/recruit';
  import { parseTime } from '@/utils/index';
	export default {
		name: '',
		components: {
			searchCriteria,
			listNew,
			searchListOne
		},
		data() {
			return {
				active_list: {
        	new_list: 'new',
        	recruit_list: 'recruit'
        },
        list: {
        	new_list: [],
          is_new_list: false,
          recruit_list: [],
          is_recruit_list: false
        },
        newQuery:{
          pageNo: 1,
          pageSize: 4,
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
      this.getNewRecruit();
      this.getListNew();
    },
		methods: {
      getListNew() {
        getListNew(this.newQuery).then(res => {
          this.list.new_list = res.list;
          this.list.is_new_list = true
        })
      },
      getNewRecruit() {
        searchJob(this.recruitQuery).then(res => {
          this.list.recruit_list = res.list;
          this.list.is_recruit_list = true;
        })
      }
		}
	}
</script>
<style rel="stylesheet/scss" lang="scss">

</style>