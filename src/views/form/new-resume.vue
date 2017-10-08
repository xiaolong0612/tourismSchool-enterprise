<template>
	<div class="pt100">
		<el-form ref="form" :model="form" label-width="80px">

		  <el-form-item label="求职意向">
		    <el-input v-model="form.jobIntent"></el-input>
		  </el-form-item
		  >
		  <el-form-item>
		    <el-button type="primary" @click="onSubmit">立即创建</el-button>
		    <el-button>取消</el-button>
		  </el-form-item>
		</el-form>
	</div>
</template>

<script>
	import { saveResume } from '@/api/student/resume';
  export default {
    data() {
      return {
        form: {
          studentId: 1,
          jobIntent: '',
          certificate: '',
          selfIntro: '',
          skillDescript: '',
          pic: '',
          labelName: '',
          working: '',
          expectAddress: '',
          expectIncome: '',
          expectJob: '',
          workList: [
          	{
          		companyName: '',
          		beginDate: '',
          		endDate: '',
          		workJob: '',
          		workContent: '',
          		schoolName: '',
          		major: '',
          		qualificate: '',
          		graduateYear: ''
          	}
          ]
        }
      }
    },
    methods: {
      onSubmit() {
        saveResume(this.form).then(res => {
        	console.log(res)
        })
      }
    }
  }
</script>
