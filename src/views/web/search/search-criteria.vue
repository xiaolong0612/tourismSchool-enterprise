<template>
	<div class="section mt65 search-wrap">
		<div class="container" v-loading="loading">
			<el-form :inline="true" :model="formSearch" class="">
				<el-row :gutter="20">
					<el-col :span="12" :offset="2">
					  <el-form-item class="mb10">
					    <el-input class="input" v-model="formSearch.jobName" placeholder="关键字搜索: 岗位、专业、薪资、工作地点"></el-input>
					  </el-form-item>
					</el-col>
					<!-- <el-col :span="6">
					  <el-form-item>
					    <el-select class="input" v-model="formSearch.jobName" placeholder="专业" filterable clearable>
					      <el-option v-for="item in content_search.major" :label="item.label" :value="item.value" :key="item.value"></el-option>
					    </el-select>
					  </el-form-item>
					</el-col> -->
					<el-col :span="6">
						<el-form-item class="mb10">
							<region-picker class="input" v-model="formSearch.workCity" :data="content_search.city_data" :max-level='2' :min-level='2' placeholder="地区选择"></region-picker>
						</el-form-item>
					</el-col>
					<el-col :span="3">
					  <el-form-item class="mb10">
					    <el-button class="btn" type="primary" @click="onSubmit">
					    	<icon-svg icon-class="jiantou1you" />
					    </el-button>
					  </el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12" :offset="2">
					    <span class="c-white">热门搜索：</span><font class="c-blue mr15" style="cursor:pointer" v-for="item in hot_search" @click="hotSearch(item)" :key="item">{{item}}</font>
					</el-col>
				</el-row>
			</el-form>
		</div>
	</div>
</template>
<script>
	import { mapGetters } from 'vuex';
	import city_data from 'region-picker/dist/data.json';
	import MDinput from '@/components/MDinput';
  import { searchJob } from '@/api/com/recruit';
  import { searchResumeList } from '@/api/student/resume';
  import { getCity } from '@/utils/index';
	export default {
		name: '',
		components: {
			MDinput
		},
		props: {
      pageNo: {
      	type: Number,
      	default: 1,
      }
    },
    computed: {
	    ...mapGetters([
	    	'id',
	      'type',
	    ])
	  },
		data() {
			return {
				formSearch: {
					pageNo: this.pageNo,
          pageSize: 30,
          workCity: '厦门',
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
				},
				loading: false,
				hot_search: ['导演','旅游外联','计调经理'],
				content_search: {
					major: [{
	          value: '1',
	          label: '旅游'
	        }, {
	          value: '2',
	          label: '管理'
	        }, {
	          value: '3',
	          label: '会展'
	        }, {
	          value: '4',
	          label: '会计'
	        }, {
	          value: '5',
	          label: '邮轮'
	        }, {
	          value: '6',
	          label: '翻译'
	        }],
	        city_data
				}
			}
		},
		watch: {
			pageNo(curVal,oldVal){
				this.formSearch.pageNo =curVal;
				if(this.type == '' || this.type == 2){
					this.getList();
				}else{
					this.getStudentList();
				}
				
			}
		},
		mounted() {
			this.formSearch.workCity = this.$route.query.workCity;
			if(typeof this.$route.query.jobName != 'undefined') this.formSearch.jobName = this.$route.query.jobName;
			if(typeof this.$route.query.workCity != 'undefined') this.formSearch.workCity = this.$route.query.workCity;
			console.log(this.id)
			if(this.id == undefined|| this.id == ''){
				this.getList();
			}else{
				this.getStudentList();
			}
		},
		methods: {
			getList(){
				this.loading = true;
				this.formSearch.workCity = getCity(this.formSearch.workCity);
				searchJob(this.formSearch).then(res => {
          this.$emit('search', res);
          this.loading = false;
        })
			},
			getStudentList(){
				this.loading = true;
				this.studentSearch.id = this.id;
				this.studentSearch.expectJob = this.formSearch.jobName;
				this.studentSearch.expectAddress = getCity(this.formSearch.workCity);
				searchResumeList(this.studentSearch).then(res => {
					this.$emit('search', res);
          this.loading = false;
				})
			},
			hotSearch(text){
				this.formSearch.pageNo =1;
				if(this.$route.path == '/search/list'){
					this.formSearch.jobName = text;
					this.formSearch.workCity = getCity(this.formSearch.workCity);
					this.getList();
				}else{
					this.$router.push({path:'/search/list', query: { jobName: text, workCity: getCity(this.formSearch.workCity)}});
				}
			},
			onSubmit() {
				this.formSearch.pageNo =1;
				if(this.$route.path == '/search/list'){
					this.getList();
				}else{
					this.$router.push({path:'/search/list', query: { jobName: this.formSearch.jobName, workCity: this.formSearch.workCity}});
				}
			},
		}
	}
</script>
<style rel="stylesheet/scss" lang="scss">
	.search-wrap{
		height: 300px;
		padding-top: 88px;
		box-sizing: border-box;
		width: 100%;
		background: url(/static/banner/home_music_slider.jpg) center bottom 82% no-repeat;
		background-size: cover;
		.el-form--inline .el-form-item{
			width: 100%;
			.el-form-item__content{
				width: 100%;
			}
		}
		.input{
			width: 100%;
			input, .region-picker-single input, .region-picker-single .picker-label{
				height: 75px;
				background-color: rgba(255, 255, 255, 0.5);
				box-shadow: 0 0 42px 0 rgba(0, 0, 0, 0.1);
				color:#333;
				font-size: 18px;
				border: 0 solid;
				border-radius: 4px;
			}
			.region-picker-single .picker-label{
				background-color: rgba(0,0,0,0);
				line-height: 75px;
			}
			input::-webkit-input-placeholder{color: #333 ;}
			input:-moz-placeholder{color : #333;}
			input::-moz-placeholder{color : #333; }
			input:-ms-input-placeholder { color: #333;}
		}
		.btn{
			height: 75px;
			width: 50%;
		}
	}
</style>