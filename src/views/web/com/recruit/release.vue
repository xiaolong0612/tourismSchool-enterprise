<template>
	<div class="release_wrap">
		<div class="pt100 pb40 small_container">
			<div class="curved_box">
				<el-form ref="form" :model="form" label-width="80px" class="form_wrap">

				  <el-form-item label="岗位名称">
				    <el-input v-model="form.jobName"></el-input>
				  </el-form-item
				  >

				</el-form>
			</div>
		</div>
	</div>
</template>

<script>
  export default {
  	name: '',
    data() {
      return {
      	form: {
      		jobName: ''
      	}
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
	.release_wrap{
		background: url(/static/banner/广西阳朔.jpg) center no-repeat;
		background-size: cover;
		.form_wrap{
			padding: 40px;
			width: 400px;
		}
		.curved_box {
		  display: inline-block;
		  *display: inline;
		  width: 100%;
		  height: 800px;
		  background-color: #fff;
		  border: 1px solid #eee;
		  -webkit-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.27), 0 0 60px rgba(0, 0, 0, 0.06) inset;
		  -moz-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.27), 0 0 40px rgba(0, 0, 0, 0.06) inset; 
		  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.27), 0 0 40px rgba(0, 0, 0, 0.06) inset;
		  position: relative;
		  *zoom: 1;
		}

		.curved_box:before {
		  -webkit-transform: skew(-15deg) rotate(-6deg);
		  -moz-transform: skew(-15deg) rotate(-6deg);
		  transform: skew(-15deg) rotate(-6deg);
		  left: 15px;
		}
		.curved_box:after {
		  -webkit-transform: skew(15deg) rotate(6deg);
		  -moz-transform: skew(15deg) rotate(6deg);
		  transform: skew(15deg) rotate(6deg);
		  right: 15px;
		}

		.curved_box:before, .curved_box:after {
		  width: 70%;
		  height: 55%;
		  content: ' ';
		  
		  -webkit-box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
		  -moz-box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3); 
		  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
		  
		  position: absolute;
		  bottom: 12%;
		  z-index: -1;	
		}
	}
</style>