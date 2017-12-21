<template>
	<div class="full-height pt100">
    <div class="container">
      <el-row :gutter="25" class="new_list">
        <el-col :span="12" v-for="item in list" class="new_item" :key="item.title">
          <div class="img pull-left" :style="'background-image:url('+ item.pic +')'"></div>
          <div class="info">
            <h2 class="title mb10">
              <!-- <router-link to='/'> -->
              {{item.title}}
              <!-- </router-link> -->
            </h2>
            <p class="text">{{item.content}}</p>
            <div class="author">
              <span class="mr20">来源：{{item.author}}</span>
              <icon-svg icon-class="shijian" />
              <span>{{item.createTime}}</span>
            </div>
          </div>
        </el-col>
        <el-col :span="24">
          <div class="pull-right">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.pageNo" :page-sizes="[30, 40, 50, 60, 70, 80]"
              :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>
	</div>
</template>
<script>
  import { getListNew } from '@/api/home';
  export default {
    data() {
      return {
        listQuery:{
          pageNo: 1,
          pageSize: 12,
          title: '',
        },
        total: 0,
        list: []
      };
    },
    mounted() {
      this.getListNew();
    },
    methods: {
      getListNew() {
        getListNew(this.listQuery).then(res => {
          this.list = res.list;
          this.total = res.total
        })
      },
      handleCurrentChange(val){
        this.listQuery.pageNo = val;
        this.getListNew();
      },
      handleSizeChange(val){
        this.listQuery.pageSize = val;
        this.getListNew();
      },
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
        background-color: #d8d8d8;
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