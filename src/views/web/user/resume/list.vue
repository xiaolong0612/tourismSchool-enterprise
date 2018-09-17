<template>
	<div class="bg-gray" style="background:url(/static/banner/slider-2.jpg) no-repeat center / cover;min-height:calc(100vh - 95px)">
		<div class="breadcrumb-wrap container pt95">
			<el-breadcrumb separator="/">
				  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
				  <el-breadcrumb-item>简历列表</el-breadcrumb-item>
				</el-breadcrumb>
		</div>
		<div class="container panel_white mt20 pt20 resume_type_list_wrap pb50">
			<el-tabs v-model="active_list.resume_list">
		    <el-tab-pane label="简历列表" name="resume">
		    	
	        <!-- <resume-item :list="list" v-if="is_resume_item"></resume-item> -->
	        <el-row :gutter="15" class="resumet_list">

            <transition name="el-zoom-in-top" v-for="item in list" :key="item.id">
  			      <el-col :span="6">
  			        <div class="item mb20" :style="{borderLeftColor: item.border_color}">
  			          <i class="el-icon-circle-cross" @click="showDialogDel(item)"></i>
  			          <div style="padding: 7px 7px 0" class="clearfix">
  			            <div class="img pull-left" :style="{backgroundImage: 'url('+item.pic+')'}"></div>
  			            <div class="info">
  			              <h2>
  			                <router-link :to="'/user/resume/list/details/'+item.id">
  			                {{item.expectJob}}
  			                <span v-if="item.expectIncome != ''">({{item.expectIncome}})</span>
  			                </router-link>
  			              </h2>
  			              <font class="state">{{item.working}}</font>
  			              <p>
  			                {{item.expectAddress}}
  			                <!-- {{item.edu}} -->
  			              </p>
  			            </div>
  			          </div>
  			          <div class="edit clearfix">
  			            <router-link :to="'/user/resume/list/details/'+item.id" class="pull-right">
  			              <el-button size="mini" type="primary">查看</el-button>
  			            </router-link>
  			            
  			            <span class="pull-left">最后编辑于:</span>
                    <!-- <font class="pull-left">2017-09-10 12:00:00</font> -->
  			            <font>{{item.updatetime}}</font>
  			          </div>
  			        </div> 
  			      </el-col>
            </transition>
			    </el-row>

	      </el-tab-pane>
		  </el-tabs>

			<div class="resume_type">
        <router-link to="/user/resume/list/details/0">
          <el-button type="primary" class="mr10" size="small">新建简历</el-button>
        </router-link>
    		<!-- <el-select v-model="resume_type.select" placeholder="请选择">
			    <el-option
			      v-for="item in resume_type.list"
			      :key="item.value"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
			  </el-select> -->
    	</div>

		</div>
    <el-dialog
      title="删除提示"
      :visible.sync="dialogDel"
      width="30%">
      <p>确定删除<span class="c-blue">{{delItem.expectJob}}</span>该专业的简历么？</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogDel = false">取 消</el-button>
        <el-button type="primary" @click="delResume(delItem.id)">确 定</el-button>
      </span>
    </el-dialog>
	</div>
</template>

<script>
  import { mapGetters, } from 'vuex';
  import { getColor } from '@/utils/index';
  import { searchResume, delResume } from '@/api/student/resume';
  import resumeItem from '@/views/web/user/resume/list-item';

	export default {
		name: '',
		components: { resumeItem },
    computed: {
      ...mapGetters([
        'id'
      ])
    },
		data() {
			return {
        dialogDel: false,
        delItem: '',
				active_list: {
        	resume_list: 'resume',
        },
        resume_type: {
        	select: '1',
        	list: [
        		{
        			value: '1',
		          label: '全部'
		        },
        		{
        			value: '2',
		          label: '导游'
		        },
        	]
        },
        is_resume_item: false,
        list: [],
        listQuery: {
        	pageNo: 1,
        	pageSize: 30,
        	studentId: 0
        }
			}
		},
		mounted() {
			this.getList();
		},
		methods: {
    	getList() {
        this.listQuery.studentId = this.id
    		searchResume(this.listQuery).then(res => {
          if(typeof res == 'undefined') return;
	    		for(let i=0; i<res.list.length; i++){
            this.$set(res.list[i], 'border_color', getColor());
            this.$set(res.list[i], 'show', false);
	    		}
          this.list = res.list;
	    		this.is_resume_item = true;
    		})
    	},
      showDialogDel(item){
        this.dialogDel = true;
        this.delItem = item;
      },
      delResume(id){
        let query = {
          studentId: this.id,
          id: id,
        }
        delResume(query).then(res => {
          if(typeof res == 'undefined') return;
          this.dialogDel = false;
          this.$message({
            message: '删除成功',
            type: 'success'
          });
          this.getList();
        })
      }
    }
	}
</script>

<style rel="stylesheet/scss" lang="scss">
	.resume_type_list_wrap{
		position: relative;
		.resume_type{
			position: absolute;
			top: 15px;
			right: 30px;
		}
	}
	.resumet_list{
    .item{
      background-color: #fff;
      border: 1px solid #d1dbe5;
      border-left-width: 3px;
      border-left-style: solid;
      border-radius: 4px;
      overflow: hidden;
      position: relative;
      &:hover{
        box-shadow: 0 0 10px 0 rgba(56, 81, 76, 0.12);
        >i{
          display: block;
        }
      }
      >i{
        display: none;
        position: absolute;
        top: 5px;
        right: 5px;
        color: #808080;
        font-size: 20px;
      }
      .img{
        width: 70px;
        height: 70px;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
      }
      .info{
        margin-left: 77px;
        h2{
          font-size: 18px;
          font-weight: 400;
          line-height: 25px;
          margin-bottom: 0;
          a{
            color: #20a0ff;
          }
          span{
            font-size: 16px;
            color: #e6775c;
          }
        }
        .state{
          font-size: 14px;
          color: #999;
          line-height: 20px;
        }
        p{
          line-height: 25px;
          height: 25px;
          overflow: hidden;
          font-size: 16px;
          color: #555;
        }
      }
      .edit{
        border-top: 1px solid #d1dbe5;
        margin-top: 5px;
        line-height: 28px;
        padding: 5px 7px;
        >span{
          color: #999;
          font-size: 13px;
        }
        >font{
          color: #555;
          font-size: 13px;
        }
      }
    }
  }
</style>