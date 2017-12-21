<template>
  <div>
    <div>
      <el-row :gutter="15" class="resumet_list">
        <el-col :span="8" v-for="item in list" :key="item.id">
          <div class="item mb20" :class="{'active': item.is_active }" :style="{borderLeftColor: item.border_color}" @click="select(item)">
            <div style="padding: 7px 7px 0" class="clearfix">
              <div class="img pull-left" :style="{backgroundImage: 'url('+item.pic+')'}"></div>
              <div class="info">
                <h2>
                  {{item.expectJob}}
                  <span>({{item.expectIncome}})</span>
                </h2>
                <font class="state">{{item.working}}</font>
                <p>
                  {{item.expectAddress}}
                  <!-- {{item.edu}} -->
                </p>
              </div>
            </div>
          </div> 
        </el-col>
      </el-row>
    </div>
    <span slot="footer" class="dialog-footer" style="display: block">
      <el-button @click="dialogClose">取 消</el-button>
      <el-button type="primary" @click="delivery">确 定</el-button>
    </span>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex';
  import { getColor } from '@/utils/index';
  import { searchResume } from '@/api/student/resume';
  import { resumeDelivery } from '@/api/student/delivery';
  export default{
    name: 'resume-item',
    props: {
      jobId: {
        type: Number,
        default: '',
      }
    },
    computed: {
      ...mapGetters([
        'id',
        'name'
      ])
    },
    data() {
      return {
        list: [],
        // dialogResumeList: false,
        deliveryQuery: {
          jobId: this.jobId,
          resumeId: '',
          studentId:'',
        }
      }
    },
    watch: {
      jobId(curVal,oldVal){
        console.log('curVal', curVal);
        this.jobId = curVal;
      }
    },
    mounted() {
      this.deliveryQuery.studentId = this.id;
      this.getlist();
    },
    methods: {
      getlist(){
        let query={
          studentId: 1
        }
        searchResume(query).then(res => {
          this.list = res.list;
          for(let index in this.list){
            this.$set(this.list[index], 'is_active', false);
            this.$set(this.list[index], 'border_color', getColor());
          }
        })
      },
      select(item){
        this.clearActive();
        // this.$emit('select', item.is_active);
        item.is_active = true;
        this.deliveryQuery.resumeId = item.id;
      },
      clearActive(){
        for(let index in this.list){
          this.$set(this.list[index], 'is_active', false);
        }
        this.deliveryQuery.resumeId = ''
      },
      dialogClose(){
        for(let index in this.list){
          this.$set(this.list[index], 'is_active', false);
        }
        this.$emit('dialogClose', false);
      },
      delivery() {
        let len=0;
        for(let index in this.list){
          if(this.list[index].is_active ==  true){
            this.deliveryQuery.resumeId = this.list[index].id;
            len++;
          };
        }
        if(len == 0){
          this.$message({
            showClose: true,
            message: '请先选择简历',
            type: 'warning'
          });
          return
        }
        resumeDelivery(this.deliveryQuery).then(res => {
          this.dialogResumeList = false;
          for(let index in this.list){
            if(this.list[index].id == this.deliveryQuery.jobId){
              this.list[index].submit_btn_text = '已投递';
            }
          }
          this.clearActive();
          this.$emit('dialogClose', false);
          this.$message({
            showClose: true,
            message: '简历投递成功',
            type: 'success'
          });
        })
      },
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
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
      }
      &.active{
        box-shadow: 0 0 10px 0 rgba(56, 81, 76, 0.12);
        background-color: #fafafa;
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
          color: #20a0ff;
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