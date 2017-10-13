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
          jobIntent: '1',
          certificate: '1',
          selfIntro: '1',
          skillDescript: '1',
          pic: '1',
          labelName: '1',
          working: '1',
          expectAddress: '1',
          expectIncome: '1',
          expectJob: '1',
          work: [
            {
              companyName: '1',
              beginDate: '1',
              endDate: '1',
              workJob: '1',
              workContent: '1',
            },
            {
              companyName: '1',
              beginDate: '1',
              endDate: '1',
              workJob: '1',
              workContent: '1',
            }
          ],
          edu:[
            {
              schoolName: '1',
          		major: '1',
          		qualificate: '1',
          		graduateYear: '1'
          	}
          ]
        }
      }
    },
    methods: {
      onSubmit() {
        let query = JSON.parse(JSON.stringify(this.form));
        // for(let i in query.workList){
        //   query.workList[i] = JSON.stringify(query.workList[i])
        // }
        // for(let i in query.eduList){
        //   query.eduList[i] = JSON.stringify(query.eduList[i]);
        // }
        query.work = JSON.stringify(query.work);
        query.edu = JSON.stringify(query.edu);
        // query.work = '1';
        // query.edu = '1';
        console.log(query)
        saveResume(query).then(res => {
          if(res.data.code == 1){
            this.$message({
              message: '简历新增成功',
              type: 'success'
            });
          }
        })
      }
    }
  }
</script>
