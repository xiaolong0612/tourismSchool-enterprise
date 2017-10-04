<template>
	<div>
    <el-row :gutter="25" class="new_list">
      <el-col :span="12" v-for="item in list" class="new_item" :key="item.title">
        <div class="img pull-left" :style="'background-image:url('+ item.img +')'"></div>
        <div class="info">
          <h2 class="title mb10">
            <router-link to='/'>
            {{item.title}}
            </router-link>
          </h2>
          <p class="text">{{item.text}}</p>
          <div class="author">
            <span class="mr20">来源：{{item.author}}</span>
            <icon-svg icon-class="shijian" />
            <span>{{item.time}}</span>
          </div>
        </div>
      </el-col>
    </el-row>
	</div>
</template>
<script>
  export default {
    props: {
      list: {
        type: Array
      }
    },
    data() {
      return {
        
      };
    },
    methods: {
    }
  };
</script>
<style rel="stylesheet/scss" lang="scss">
  .new_list{
    .new_item{
      margin-bottom: 12px;
      .img{
        width: 188px;
        height: 188px;
        background-position: center;
        background-repeat: no-repeat;
        background-size: 100%;
        transition: all .2s;
        &:hover{
          background-size: 120%;
        }
      }
      .info{
        height: 188px;
        margin-left: 188px;
        padding: 12px 15px 12px 16px;
        background-color: #fff;
        border: 1px solid #ebebeb;
        position: relative;
        .title, .text{
          display: block;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          word-wrap: break-word;
          overflow-wrap: break-word;
          cursor: pointer;
          overflow: hidden;
        }
        .title{
          -webkit-line-clamp: 2;
          line-clamp: 2;
          font-size: 18px;
          line-height: 27px;
          max-height: 54px;
          width: 100%;
          color: #333;
          font-weight: 700;
        }
        .text{
          -webkit-line-clamp: 3;
          line-clamp: 3;
          width: 100%;
          font-size: 14px;
          color: #666;
          line-height: 23px;
          max-height: 69px;
        }
        .author{
          position: absolute;
          bottom: 12px;
          left: 16px;
          font-size: 12px;
          color: #999;
          line-height: 21px;
          span:first-child{
            display: inline-block;
          }
        }
      }
    }
  }
</style>