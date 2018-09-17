<template>
  <div class="pt95 pb75">
    <div class="container panel_white mt20 pt20 resume_type_list_wrap pb50">
      <el-tabs v-model="active_list.collection">
        <el-tab-pane label="收藏列表" name="collection">
          
          <el-row :gutter="15" class="resumet_list">

            <transition name="el-zoom-in-top" v-for="item in list" :key="item.resume.id">
              <el-col :span="6">
                <div class="item mb20" :style="{borderLeftColor: item.resume.border_color}">
                  <i class="el-icon-circle-cross" @click="delResumeCollect(item.resume)"></i>
                  <div style="padding: 7px 7px 0" class="clearfix">
                    <div class="img pull-left" :style="{backgroundImage: 'url('+item.resume.pic+')'}"></div>
                    <div class="info">
                      <h2>
                        <router-link  :to="{path: '/search/student-details',  query: {id: item.resumeId,deliveryId: item.resume.id,resumeState:item.resume.resumeState, is_com_look: true}}">
                        {{item.resume.expectJob}}
                        <span v-if="item.resume.expectIncome != ''">({{item.resume.expectIncome}})</span>
                        </router-link>
                      </h2>
                      <font class="state">{{item.resume.working}}</font>
                      <p>
                        {{item.resume.expectAddress}}
                      </p>
                    </div>
                  </div>
                  <div class="edit clearfix">
                    <router-link :to="{path: '/search/student-details',  query: {id: item.resumeId,deliveryId: item.resume.id,resumeState:item.resume.resumeState, is_com_look: true}}" class="pull-right">
                      <el-button size="mini" type="primary">查看</el-button>
                    </router-link>

                    <span class="pull-left">收藏于:</span>
                    <!-- <font class="pull-left">2017-09-10 12:00:00</font> -->
                    <font>{{item.collectTime}}</font>
                  </div>
                </div> 
              </el-col>
            </transition>
          </el-row>

        </el-tab-pane>
      </el-tabs>
      <div class="resume_type">
        <el-row>
          <el-col :span="12">
            <el-input v-model="query.studentName" auto-complete="off" placeholder="学生姓名" @change="getlist"></el-input>
          </el-col>
          <el-col :span="12">
            <el-input v-model="query.expectJob" auto-complete="off" placeholder="专业" class="ml20" @change="getlist"></el-input>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex';
  import { getColor } from '@/utils/index';
  import { listCollect, delResumeCollect } from '@/api/com/collect';
  export default{
    name: 'colletion',
    computed: {
      ...mapGetters([
        'id',
        'name'
      ])
    },
    data() {
      return {
        active_list: {
          collection: 'collection',
        },
        list: [],
        query: {
          jobId: this.jobId,
          resumeId: '',
          companyId:'',
          studentName: '',
          expectJob: '',
          pageNo: 1,
          pageSize: 10,
        }
      }
    },
    mounted() {
      this.query.companyId = this.id;
      this.getlist();
    },
    methods: {
      getlist(){
        listCollect(this.query).then(res => {
          this.list = res.list;
          for(let index in this.list){
            this.$set(this.list[index], 'is_active', false);
            this.$set(this.list[index], 'border_color', getColor());
          }
        })
      },
      showDialogDel(){

      },
      delResumeCollect(item){
        delResumeCollect({companyId: this.id, resumeId: item.resumeId}).then(res => {
            if(res.success){
            this.resume_is_collect = false;
            this.$message.success('已取消收藏');
            this.getlist();
          }
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