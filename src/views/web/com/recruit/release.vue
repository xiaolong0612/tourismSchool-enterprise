<template>
	<div class="release_wrap" style="min-height:calc(100vh - 94px)">
		<div class="pt100 pb40 small_container">
			<div class="curved_box">
				<el-form ref="form" :model="form" :rules="rules" :inline="true" label-width="100px" class="form_wrap">

				  <el-form-item label="岗位名称" prop="jobName">
				    <el-input v-model="form.jobName" placeholder="例如:导游"></el-input>
				  </el-form-item>

				  <el-form-item label="待遇">

                <el-select v-model="form.income" placeholder="请选择">
                  <el-option label="面议" value="面议"></el-option>
                  <el-option label="≤3000" value="≤3000"></el-option>
                  <el-option label="3000-5000" value="3000-5000"></el-option>
                  <el-option label="5000-8000" value="5000-8000"></el-option>
                  <el-option label="≥8000" value="≥8000"></el-option>
                </el-select>
				  </el-form-item>

				  <el-form-item label="工作经验">
            <el-select v-model="form.workExperience" placeholder="请选择">
              <el-option label="≤1年" value="≤1年"></el-option>
              <el-option label="1-3年" value="1-3年"></el-option>
              <el-option label="3-5年" value="3-5年"></el-option>
              <el-option label="≥5年" value="≥5年"></el-option>
            </el-select>
				  </el-form-item>

				  <el-form-item label="岗位类型">

				  	<el-select v-model="form.jobType" placeholder="请选择">
				      <el-option label="兼职" :value="0"></el-option>
				      <el-option label="全职" :value="1"></el-option>
				      <el-option label="实习" :value="2"></el-option>
				    </el-select>
				  </el-form-item>

				  <el-form-item label="学历">
            <el-select v-model="form.qualificate" placeholder="请选择">
              <el-option label="研究生" value="研究生"></el-option>
              <el-option label="本科" value="本科"></el-option>
              <el-option label="大专" value="大专"></el-option>
              <el-option label="高中" value="高中"></el-option>
              <el-option label="初中" value="初中"></el-option>
              <el-option label="小学" value="小学"></el-option>
            </el-select>
				  </el-form-item>

				  <el-form-item label="招聘人数">
				    <el-input v-model="form.recruitNumber" :min="1" placeholder="例如:1人" type="number"></el-input>
				  </el-form-item>

				  <el-form-item label="工作城市" prop="workCity">
				    <region-picker class="input" v-model="form.workCity" :data="city_data" :max-level='2' :min-level='2' placeholder="请选择城市"></region-picker>
				  </el-form-item>

				  <el-form-item label="详细地址" prop="workAddress">
				    <el-input v-model="form.workAddress" placeholder="例如:思明区软二望海路17号楼之二701"></el-input>
				  </el-form-item>

				  <el-form-item label="联系人">
				    <el-input v-model="form.linkName" placeholder="例如:赵经理"></el-input>
				  </el-form-item>

				  <el-form-item label="联系方式" prop="linkPhone">
				    <el-input v-model="form.linkPhone" placeholder="例如:186******15"></el-input>
				  </el-form-item>

				  <el-form-item label="邮箱" prop="receiveEmail">
				    <el-input v-model="form.receiveEmail" placeholder="例如:10********@qq.com"></el-input>
				  </el-form-item>

				  <el-form-item label="岗位标签">
				    <el-select
					    v-model="selectJobLabels"
					    multiple
					    filterable
					    allow-create
					    placeholder="请选择标签">
					    <el-option
					      v-for="item in defaultJobLabels"
					      :key="item.id"
					      :label="item.name"
					      :value="item.name">
					    </el-option>
					  </el-select>
				  </el-form-item>
					<div class="t-center">
						<el-form-item >
					    <el-button v-if="is_edit" type="primary" @click="updateJob">保存编辑</el-button>
					    <el-button v-else type="primary" @click="submitForm">立即发布</el-button>
					    <el-button @click="resetForm()">重置</el-button>
					    
					  </el-form-item>
					 </div>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';
  import { parseTime, getCity } from '@/utils/index';
  import { validatPhone } from '@/utils/validate';
  import { newJob, updateJob, detailJob } from '@/api/com/recruit';
  import { listLabel } from '@/api/admin/label';
	import city_data from 'region-picker/dist/data.json';
  export default {
  	name: '',
    data() {
    	const isPhone = (rule, value, callback) => {
	      if (validatPhone(value)) {
	        callback(new Error('请输入正确的联系方式'))
	      } else {
	        callback()
	      }
	    }
      return {
        type: '',
      	is_edit: false,
      	city_data,
      	startIncome: '',
      	endIncome: '',
        defaultJobLabels: [],
        selectJobLabels: [],
      	form: {
          // companyId: '',
          // companyName: '',
          // jobName: '会计',
          // income: '面议',
          // workCity: '厦门市',
          // workExperience: '1年',
          // jobType: '0',
          // qualificate: '本科',
          // recruitNumber: '1人',
          // workAddress: '软件园',
          // linkName: '赵经理',
          // linkPhone: '18636787915',
          // receiveEmail: '1057520381@qq.com',
          // labels: [],
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
          labels: [],
      	},
      	rules: {
      		jobName: [
      			{ required: true, message: '请输入岗位名称', trigger: 'blur' }
      		],
      		workCity: [
      			{ required: true, message: '请输入城市', trigger: 'blur' }
      		],
      		workAddress: [
      			{ required: true, message: '请输入详细地址', trigger: 'blur' }
      		],
      		linkPhone: [
      			{ required: true, message: '请输入联系方式', trigger: 'blur' }
      		],
      		receiveEmail: [
      			{ required: true, message: '请输入邮箱地址', trigger: 'blur' },
      			{ type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
      		]
      	}
      }
    },
    computed: {
	    ...mapGetters([
	      'id',
	      'name'
	    ])
	  },
    mounted(){
    	// this.resetForm();
    	this.isEdit();
    	this.setDefault();
      this.listLabel();
    },
    methods: {
    	setDefault(){
    		this.form.companyId = this.id;
    		this.form.companyName = this.name;
    	},
    	isEdit(){
    		if(typeof this.$route.query.id != 'undefined') this.is_edit = true;
    		else return false;
    		detailJob({id: this.$route.query.id}).then( res => {
          // let label = res.job.labels;
          // delete res.job.labels;
          for(var i in this.form){
            if(i != 'labels'){
              this.form[i] = res.job[i] || '';
            }else{
              for(let i in res.job.labelList){
                this.form['labels'][this.form['labels'].length] = res.job.labelList[i].name
              }
              this.selectJobLabels = this.form['labels'];
            }
          }
    		})    	
    	},
    	updateJob(){
    		delete this.form.company;
        delete this.form.releaseTime;
        delete this.form.evaluates;
        this.form.id = this.$route.query.id;
    		this.form.workCity = getCity(this.form.workCity);
        // let labels = [];
        // for(let i in this.selectJobLabels){
        //   labels[labels.length] = this.selectJobLabels[i].name;
        // }
    		this.form.labels = this.selectJobLabels.length == 0 ? '' : this.selectJobLabels.join(',');
        this.$refs['form'].validate((valid) => {
          if (valid) {
            if (this.form.workExperience == '') {this.form.workExperience = '不限'}
        		updateJob(this.form).then( res => {
        			if(res.success){
        				this.$message.success('编辑成功');
        				this.$router.push({ path: '/com/recruit/list' });
        			}
        			else{
        				this.$message.error('编辑失败，请刷新重试！！')
        			}
        		})
          } else {
            console.log('error submit!!');
            return false;
          }
        })  
    	},
      submitForm() {
    		let query = JSON.parse(JSON.stringify(this.form));
        if (query.workExperience == '') {query.workExperience = '不限'}
    		query.workCity = this.form.workCity == '' ? '' : getCity(this.form.workCity);
        query.labels = query.labels.length == 0 ? '' : query.labels.join(',');
        this.$refs['form'].validate((valid) => {
          if (valid) {
            newJob(query).then(res => {
            	if(res.success){
            		this.$message.success('岗位发布成功');
                this.$router.push({ path: '/com/recruit/list' });
            	}else{
            		this.$message.error('岗位发布失败，请刷新重试！！')
            	}
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        })
      },
      listLabel(){
        let query = {
          pageNo: 1,
          pageSize: 100,
          type: 1,
          name:'',
        };
        listLabel(query).then(res => {
          this.defaultJobLabels = res.list;
        })
      },
      resetForm() {
      	this.form = {
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
      		labels: [],
      	}
      },
      labelChange(val){
        console.log(val)
        // if(this.is_edit){
        //   this.form.labels[this.form.labels.length] = val
        // }
        // this.form.labels[this.form.labels.length] = val;
        // console.log(this.form.labels)
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
			// width: 450px;
		}
		.curved_box {
		  background: #FDFDFD;
	    background: -webkit-gradient(linear, 0% 0%, 0% 80%, from(#FFF), to(#F2F2F2));
	    background: -moz-linear-gradient(#FFF,#F2F2F2 80%);
	    color: #333;
	    // width: 500px;
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