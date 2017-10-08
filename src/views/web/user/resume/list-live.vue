<template>
	<div class="container" style="padding: 70px 0">
		<div class="section_title">
			<h4>{{list.title}}</h4>
			<div></div>
			<p>{{list.label}}</p>
		</div>
		<el-row v-for="item in list.list" :key="item.name" class="section-list">
      <el-col :offset="2" :sm="20">
      	<div class="item">
	      	<h5>{{item.name}}</h5>
	      	<span>{{item.time}}</span>
	      	<p>{{item.exp}}</p>
	      </div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
    name: 'item',
    props: {
      list: {
        type: Object
      }
    },
    created() {
      // console.log(this.list)
    },
    methods: {
      
    }
  }

</script>

<style rel="stylesheet/scss" lang="scss">
	.section_title{
		text-align: center;
		margin-bottom: 50px;
		>div{
			border-bottom: solid 2px #457aff;
	    margin: 10px auto;
	    max-width: 50px;
		}
	}
	.section-list{
		.item{
			padding: 25px;
	    color: #333333;
	    background-color: #ffffff;
	    margin-bottom: 25px;
	    box-shadow: 0 0 25px 0 rgba(0, 0, 0, 0.1);
	    span{
	    	display: block;
		    margin-top: 0;
		    margin-bottom: 5px;
		    color: #457aff;
		    font-size: 13px;
		    text-transform: uppercase;
		    letter-spacing: 0.05em;
	    }
	    p{
	    	line-height: 1.5;
	    }
		}
	}

</style>