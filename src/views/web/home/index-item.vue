<template>
	<div>
		<div class="container pt40 pb40">
			<el-tabs v-model="active_list.new_list">
		    <el-tab-pane label="新闻列表" name="new">
					<list-new/>
	      </el-tab-pane>
		  </el-tabs>
		</div>
		<div class="container new-recruit">
			<el-tabs v-model="active_list.recruit_list">
		    <el-tab-pane label="最新招聘" name="recruit">
	        <el-row :gutter="25" class="new_list">
	          <el-col class="new_item">
	            <search-list-one/>
	          </el-col>
	        </el-row>
	      </el-tab-pane>
		  </el-tabs>
		</div>
	</div>
</template>
<script>
	import search from '@/views/web/search/index';
	import listNew from '@/views/web/new/list-new';
	import searchListOne from '@/views/web/search/list-one';
	export default {
		name: '',
		components: {
			search,
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
        	new_list: [{
            img: 'https://wpimg.wallstcn.com/a77d6251-a332-4178-94b5-4ff21ddd7041.jpg?imageView2/1/w/190/h/190',
            title: '香港诞生新楼王！每平米超96万人民币 刷新亚洲最高纪录',
            text: '香港一顶楼复式豪宅昨日以5.22亿港元售出，约合每平方英尺10.5万港元，刷新了亚洲复式豪宅的成交记录。今年以来，香港私人住宅价格指数累涨18%，连涨17个月，为1993年以来最长连涨。',
            author: 'xiaolongjun',
            time: '2017-09-30 12:00:00'
          }, {
            img: 'https://wpimg.wallstcn.com/d0/24/94/-1-2-.png?imageView2/1/w/190/h/190',
            title: '福建出台调控新政：共有产权房建设年内启动，厦门租赁住房占新增住房不低于30%',
            text: '近日，我省出台《关于进一步加强房地产市场调控的八条措施》，通过加强商品房预售监管、完善土地出让方式控制楼面地价上涨、年内启动一批共有产权住房建设并实现常态化供应、增加租赁住房供应、扩大公共租赁住房保障范围、三年基本完成棚户区改造、督促开发企业按照土地合同约定开竣工、严厉打击房地产市场违法违规行为等八条措施，以新的政策“组合拳”坚决遏制部分地方房价不合理上涨、过快上涨，让房子回归居住属性。',
            author: 'xiaolongjun',
            time: '2017-09-30 12:00:00'
          }, {
            img: 'https://wpimg.wallstcn.com/a77d6251-a332-4178-94b5-4ff21ddd7041.jpg?imageView2/1/w/190/h/190',
            title: '香港诞生新楼王！每平米超96万人民币 刷新亚洲最高纪录',
            text: '香港一顶楼复式豪宅昨日以5.22亿港元售出，约合每平方英尺10.5万港元，刷新了亚洲复式豪宅的成交记录。今年以来，香港私人住宅价格指数累涨18%，连涨17个月，为1993年以来最长连涨。',
            author: 'xiaolongjun',
            time: '2017-09-30 12:00:00'
          }, {
            img: 'https://wpimg.wallstcn.com/d0/24/94/-1-2-.png?imageView2/1/w/190/h/190',
            title: '福建出台调控新政：共有产权房建设年内启动，厦门租赁住房占新增住房不低于30%',
            text: '近日，我省出台《关于进一步加强房地产市场调控的八条措施》，通过加强商品房预售监管、完善土地出让方式控制楼面地价上涨、年内启动一批共有产权住房建设并实现常态化供应、增加租赁住房供应、扩大公共租赁住房保障范围、三年基本完成棚户区改造、督促开发企业按照土地合同约定开竣工、严厉打击房地产市场违法违规行为等八条措施，以新的政策“组合拳”坚决遏制部分地方房价不合理上涨、过快上涨，让房子回归居住属性。',
            author: 'xiaolongjun',
            time: '2017-09-30 12:00:00'
          }],
          recruit_list: [
      		{
      			recruit: '导游',
      			time: '9-12 12:00',
      			salary: '15k-30k',
      			exp: '1-3年',
      			edu: '本科',
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
      			lable: ['旅游', '业界龙头', '氛围好'],
      			company: {
      				name: '微众教育',
      				logo: '//static.lagou.com/thumbnail_100x100/i/image/M00/1A/D8/CgpFT1kIdEGANCt3AACNzh_LYrw828.jpg',
      				industry: '经营多年经营多年经营多年经营多年经营多年经营多年经营多年经营多年经营多年'
      			}
      		},
      	]
        }
			}
		},
		methods: {

		}
	}
</script>
<style rel="stylesheet/scss" lang="scss">

</style>