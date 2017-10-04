<template>
	<div>
		<search-criteria/>
		<div class="container pt30" style="width: 958px">
			<el-tabs v-model="active_list.search_result">
		    <el-tab-pane label="搜索结果" name="result">
					<search-list-two :list="list"/>
	      </el-tab-pane>
		  </el-tabs>
		</div>
	</div>
</template>
<script>
	import searchCriteria from '@/views/web/search/search-criteria';
	import searchListTwo from '@/views/web/search/list-two';
	export default {
		name: '',
		components: {
			searchCriteria,
			searchListTwo
		},
		data() {
			return {
				active_list: {
					search_result: 'result'
				},
				list: [
					{
      			recruit: '导游',
      			time: '9-12 12:00',
      			salary: '15k-30k',
      			exp: '1-3年',
      			edu: '本科',
      			address: '厦门',
      			lable: ['旅游', '业界龙头', '氛围好'],
      			company: {
      				name: '微众教育',
      				logo: '//static.lagou.com/thumbnail_100x100/i/image/M00/1A/D8/CgpFT1kIdEGANCt3AACNzh_LYrw828.jpg',
      				industry: '经营多年经营多年经营多年经营多年经营多年经营多年经营多年经营多年经营多年'
      			}
      		},
					{
      			recruit: '导游',
      			time: '9-12 12:00',
      			salary: '15k-30k',
      			exp: '1-3年',
      			edu: '本科',
      			address: '厦门',
      			lable: ['旅游', '业界龙头', '氛围好'],
      			company: {
      				name: '微众教育',
      				logo: '//static.lagou.com/thumbnail_100x100/i/image/M00/1A/D8/CgpFT1kIdEGANCt3AACNzh_LYrw828.jpg',
      				industry: '经营多年经营多年经营多年经营多年经营多年经营多年经营多年经营多年经营多年'
      			}
      		},
					{
      			recruit: '导游',
      			time: '9-12 12:00',
      			salary: '15k-30k',
      			exp: '1-3年',
      			edu: '本科',
      			address: '厦门',
      			lable: ['旅游', '业界龙头', '氛围好'],
      			company: {
      				name: '微众教育',
      				logo: '//static.lagou.com/thumbnail_100x100/i/image/M00/1A/D8/CgpFT1kIdEGANCt3AACNzh_LYrw828.jpg',
      				industry: '经营多年经营多年经营多年经营多年经营多年经营多年经营多年经营多年经营多年'
      			}
      		},
					{
      			recruit: '导游',
      			time: '9-12 12:00',
      			salary: '15k-30k',
      			exp: '1-3年',
      			edu: '本科',
      			address: '厦门',
      			lable: ['旅游', '业界龙头', '氛围好'],
      			company: {
      				name: '微众教育',
      				logo: '//static.lagou.com/thumbnail_100x100/i/image/M00/1A/D8/CgpFT1kIdEGANCt3AACNzh_LYrw828.jpg',
      				industry: '经营多年经营多年经营多年经营多年经营多年经营多年经营多年经营多年经营多年'
      			}
      		},
				]
			}
		},
		methods: {

		}
	}
</script>
<style rel="stylesheet/scss" lang="scss">

</style>