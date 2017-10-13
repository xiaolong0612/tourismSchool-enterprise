<template>
	<div class="release_wrap">
		<div class="pt100 pb40 small_container">
			<div class="curved_box">
				<el-form ref="form" :model="form" label-width="80px" class="form_wrap">

				  <el-form-item label="岗位名称">
				    <el-input v-model="form.jobName" placeholder="例如:导游"></el-input>
				  </el-form-item>

				  <el-form-item label="待遇">
						<el-col :span="11">
					    <el-input v-model="startIncome" placeholder="请输入最低金额"></el-input>
				    </el-col>
				    <el-col class="t-center" :span="2">-</el-col>
				    <el-col :span="11">
					    <el-input v-model="endIncome" placeholder="请输入最高金额"></el-input>
					  </el-col>
				  </el-form-item>

				  <el-form-item label="工作经验">
				    <el-input v-model="form.workExperience" placeholder="例如:1年"></el-input>
				  </el-form-item>

				  <el-form-item label="岗位类型">
				    <el-input v-model="form.jobType" placeholder="例如:导游"></el-input>
				  </el-form-item>

				  <el-form-item label="学历">
				    <el-input v-model="form.qualificate" placeholder="例如:本科"></el-input>
				  </el-form-item>

				  <el-form-item label="招聘人数">
				    <el-input v-model="form.recruitNumber" placeholder="例如:1人"></el-input>
				  </el-form-item>

				  <el-form-item label="工作城市">
				    <region-picker class="input" v-model="form.workCity" :data="city_data" :max-level='2' :min-level='2' placeholder="请选择城市"></region-picker>
				  </el-form-item>

				  <el-form-item label="详细地址">
				    <el-input v-model="form.workAddress" placeholder="例如:思明区软二望海路17号楼之二701"></el-input>
				  </el-form-item>

				  <el-form-item label="联系人">
				    <el-input v-model="form.linkName" placeholder="例如:赵经理"></el-input>
				  </el-form-item>

				  <el-form-item label="联系方式">
				    <el-input v-model="form.linkPhone" placeholder="例如:18636363615"></el-input>
				  </el-form-item>

				  <el-form-item label="邮箱">
				    <el-input v-model="form.receiveEmail" placeholder="例如:1057510575@qq.com"></el-input>
				  </el-form-item>

				  <el-form-item label="岗位标签">
				    <el-select
					    v-model="form.jobLabels"
					    multiple
					    filterable
					    allow-create
					    placeholder="请选择标签,可自行添加">
					    <el-option
					      v-for="item in defaultJobLabels"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					  </el-select>
				  </el-form-item>

					<el-form-item>
				    <el-button type="primary" @click="submitForm">立即发布</el-button>
				    <el-button @click="resetForm('form')">重置</el-button>
				    <el-button>取消</el-button>
				  </el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script>
	import city_data from 'region-picker/dist/data.json';
  export default {
  	name: '',
    data() {
      return {
      	city_data,
      	startIncome: '',
      	endIncome: '',
      	defaultJobLabels: [{
      		value: '轻松',
          label: '轻松'
        }, {
      		value: '自由',
          label: '自由'
        }, {
      		value: '福利好',
          label: '福利好'
        }],
      	form: {
      		companyId: '',
      		companyName: '',
      		jobName: '',
      		income: '',
      		workCity: '',
      		workExperience: '',
      		jobType: '',
      		qualificate: '',
      		recruitNumber: '',
      		workAddress: '',
      		linkName: '',
      		linkPhone: '',
      		receiveEmail: '',
      		jobLabels: ''
      	}
      }
    },
    methods: {
      submitForm() {
      		this.form.income = this.startIncome+'-'+this.endIncome;
          console.log(this.form)
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
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
			width: 450px;
		}
		.curved_box {
		  background: #FDFDFD;
	    background: -webkit-gradient(linear, 0% 0%, 0% 80%, from(#FFF), to(#F2F2F2));
	    background: -moz-linear-gradient(#FFF,#F2F2F2 80%);
	    color: #333;
	    width: 500px;
	    margin: 0 auto;
	    padding: 20px 0 10px;
	    border: 1px solid #dedede;
	    -webkit-transition: all 0.4s;
	    -moz-transition: all 0.4s;
	    -ms-transition: all 0.4s;
	    -o-transition: all 0.4s;
	    box-shadow: 1px 2px 4px rgba(0,0,0,0.7);
	    &:hover{
	    	border-bottom-right-radius: 140px 30px;
    		box-shadow: 6px 6px 6px rgba(0,0,0,0.7);
	    }
		}
	}
</style>