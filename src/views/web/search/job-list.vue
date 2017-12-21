<template>
	<ul class="job-list">
		<li v-for="item in list" :key="item.id" class="p10 mb15">
			<time class="pull-right c-gray">{{item.releaseTime}}</time>
			<h2 class="c-blue">
				<router-link :to="{path:'/search/list/details', query:{id:item.id}}">
					{{item.jobName}} [{{item.workAddress}}]
				</router-link>
			</h2>
			<span class="c-orgin mr15">
				{{item.income}}
			</span>  
			<font>{{item.workExperience}} / {{item.qualificate}} / {{item.jobTypeStr}}</font>
		</li>
	</ul>
</template>

<script>
  import { searchJob } from '@/api/com/recruit';
	export default {
		props: {
	    companyId: '',
	  },
		data(){
			return {
				list: [],
				listQuery: {
        	pageNo: 1,
        	pageSize: 50,
        	companyId: '',
        	workCity: '',
        	jobType: 1,
        	jobName: ''
        }
			}
		},
		mounted(){
  		this.getJobList();
		},
		methods: {
			getJobList(){
    		this.tableLoading = true;
    		this.listQuery.companyId = this.companyId;
    		searchJob(this.listQuery).then(res => {
    			this.list = res.list;
    		})
    	}
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss">
	.job-list{
		>li{
			border: 1px solid #ededed;
			border-left: 4px solid #67C23A;
			h2{
				font-size: 16px;
			}
			time{font-size: 14px}
			h3{font-size: 15px;}
			>font{
				font-size: 14px;
				color: #666;
			}
		}
	}
</style>