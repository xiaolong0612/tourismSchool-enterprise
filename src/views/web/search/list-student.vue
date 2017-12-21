<template>
	<div>
		<ul class="search-student-list">
			<li class="item mb20" v-for="item in list" :key="item.id">
				<el-row :gutter='20'>
					<el-col :span="12">
						<div class="left clearfix">
							<img class="pull-left" :src="item.pic == '' ? '/static/default_img.gif': item.pic" height="60px" width="60px">
							<div class="user-info mt5">
								<router-link class="c-blue f17" :to="{path: '/search/student-details', query:{id:item.id}}">{{item.linkName}}</router-link>
								<div class="f14 c-gray mt5">
									<p class="mr10" style="display: inline-block;line-height:24px">{{item.expectAddress}}<font v-if="item.working!=''"> / </font>{{item.working}}</p>
									<el-tag size="small" v-for="label in item.labelName" :key="label" class="mr5">{{label}}</el-tag>
								</div>
							</div>
						</div>
					</el-col>
					<el-col :span="8">
						<div class="expect">
							{{item.expectJob}}<br>
							<span class="c-orgin">{{item.expectIncome}}</span>
						</div>
					</el-col>
					<el-col :span="4">
						<div class="pt30">
							<router-link class="c-blue f17" :to="{path: '/search/student-details', query:{id:item.id}}">
								<el-button type="primary" size="small">查看详情</el-button>
							</router-link>
						</div>
					</el-col>
					<el-col :span="24">
						<div class="selfIntro pl15 eli">
							{{item.selfIntro}}
						</div>
					</el-col>
				</el-row>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		props: {
      list: {
        type: Array
      }
    },
		data(){
			return{

			}
		},
		mounted() {
			for(let i in this.list){
				this.list[i].labelName = this.list[i].labelName == '' ? [] : this.list[i].labelName.split(',');
				this.list[i].selfIntro = this.list[i].selfIntro== '' ? '这个人什么也没有留下' : this.list[i].selfIntro;
			}
    },
		methods: {

		}
	}
</script>
<style rel="stylesheet/scss" lang="scss">
	.search-student-list{
		.item{
			border: 1px solid #dedede;
			.left{
				padding: 14px 15px 14px;
				.user-info{
					margin-left: 70px;
				}
			}
			.expect{
				padding: 14px 15px 14px;
				line-height: 30px;
			}
			.selfIntro{
				background-color:#fafafa;
				line-height:40px;
				color:#666;
				font-size: 15px
			}
		}
	}
</style>