<template>
  <div>
    <el-row :gutter="15" class="resumet_list">
      <el-col :span="6" v-for="item in list" :key="item.id">
        <div class="item mb20" :style="{borderLeftColor: item.border_color}">
          <i class="el-icon-circle-cross"></i>
          <div style="padding: 7px 7px 0" class="clearfix">
            <div class="img pull-left" :style="{backgroundImage: 'url('+item.pic+')'}"></div>
            <div class="info">
              <h2>
                <router-link to="/">
                {{item.expectJob}}
                <span>({{item.expectIncome}})</span>
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
            <router-link to="/user/resume/details" class="pull-right">
              <el-button size="mini" type="primary">编辑</el-button>
            </router-link>
            
            <span class="pull-left">最后编辑于:</span><font class="pull-left">2017-09-10 12:00:00</font>
            <!-- <font>{{item.last_edit_time}}</font> -->
          </div>
        </div> 
      </el-col>
    </el-row>
  </div>
</template>
<script>
  export default{
    name: 'resume-item',
    props: {
      list: {
        type: Array
      }
    },
    mounted() {
      console.log(this.list)
    },
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