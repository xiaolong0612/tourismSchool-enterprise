<template>
	<div class="section mt65 search-wrap">
		<div class="container">
			<el-form :inline="true" :model="formSearch" class="">
				<el-row :gutter="20">
					<el-col :span="6" :offset="2">
					  <el-form-item>
					    <el-input class="input" v-model="formSearch.keyword" placeholder="关键字搜索"></el-input>
					  </el-form-item>
					</el-col>
					<el-col :span="6">
					  <el-form-item>
					    <el-select class="input" v-model="formSearch.major" placeholder="专业" filterable clearable>
					      <el-option v-for="item in content_search.major" :label="item.label" :value="item.value" :key="item.value"></el-option>
					    </el-select>
					  </el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item>
							<region-picker class="input" :data="content_search.city_data" placeholder="地区选择"></region-picker>
						</el-form-item>
					</el-col>
					<el-col :span="3">
					  <el-form-item>
					    <el-button class="btn" type="primary" @click="onSubmit">
					    	<icon-svg icon-class="jiantou1you" />
					    </el-button>
					  </el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</div>
	</div>
</template>
<script>
	import city_data from 'region-picker/dist/data.json';
	import MDinput from '@/components/MDinput';
	export default {
		name: '',
		components: {
			MDinput
		},
		data() {
			return {
				formSearch: {
					keyword: '',
					major: '',
					address: ''
				},
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
		methods: {
			onSubmit() {
				this.$router.push({path:'/search/list'})
			}
		}
	}
</script>
<style rel="stylesheet/scss" lang="scss">
	.search-wrap{
		height: 250px;
		padding-top: 88px;
		box-sizing: border-box;
		width: 100%;
		background: url(/static/banner/长城.jpg) center bottom -150px no-repeat;
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
				background-color: rgba(0,0,0,.5);
				color:#fff;
				border: 0 solid;
				border-radius: 4px;
			}
			.region-picker-single .picker-label{
				background-color: rgba(0,0,0,0);
				line-height: 75px;
			}
			input::-webkit-input-placeholder{color: #fff ;}
			input:-moz-placeholder{color : #fff;}
			input::-moz-placeholder{color : #fff; }
			input:-ms-input-placeholder { color: #fff;}
		}
		.btn{
			height: 75px;
			width: 50%;
		}
	}
</style>