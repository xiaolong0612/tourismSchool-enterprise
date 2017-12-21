<template>
	<div class="release_wrap" style="min-height:calc(100vh - 94px)">
		<div class="pt100 pb40 small_container">
			<div class="curved_box">
				<el-form ref="form" :model="form" :rules="rules" :inline="true" label-width="100px" class="form_wrap">

				  <el-form-item label="岗位名称" prop="jobName">
				    <el-input v-model="form.jobName" placeholder="例如:导游"></el-input>
				  </el-form-item>

				  <el-form-item label="待遇">
				  	<el-row>
							<el-col :span="11">
						    <el-input v-model="startIncome" placeholder="请输入最低金额"></el-input>
					    </el-col>
					    <el-col class="t-center" :span="2">-</el-col>
					    <el-col :span="11">
						    <el-input v-model="endIncome" placeholder="请输入最高金额"></el-input>
						  </el-col>
						</el-row>
				  </el-form-item>

				  <el-form-item label="工作经验">
				    <el-input v-model="form.workExperience" placeholder="例如:1年"></el-input>
				  </el-form-item>

				  <el-form-item label="岗位类型">

				  	<el-select v-model="form.jobType" placeholder="请选择">
				      <el-option label="兼职" value="0"></el-option>
				      <el-option label="全职" value="1"></el-option>
				      <el-option label="实习" value="2"></el-option>
				    </el-select>
				  </el-form-item>

				  <el-form-item label="学历">
				    <el-input v-model="form.qualificate" placeholder="例如:本科"></el-input>
				  </el-form-item>

				  <el-form-item label="招聘人数">
				    <el-input v-model="form.recruitNumber" placeholder="例如:1人"></el-input>
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
					    v-model="form.labels"
					    multiple
					    filterable
					    allow-create
					    placeholder="请选择标签"
              @change="labelChange">
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
      	is_edit: false,
      	city_data,
      	startIncome: '面议',
      	endIncome: '',
      	defaultJobLabels: [],
      	form: {
      		companyId: '',
      		companyName: '',
      		jobName: '会计',
      		income: '面议',
      		workCity: '厦门市',
      		workExperience: '1年',
      		jobType: '0',
      		qualificate: '本科',
      		recruitNumber: '1人',
      		workAddress: '软件园',
      		linkName: '赵经理',
      		linkPhone: '18636787915',
      		receiveEmail: '1057520381@qq.com',
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
    			this.form = res.job;
    			this.form['labels'] = res.job.jobLabels;
    			delete this.form.jobLabels;
    		})    	
    	},
    	updateJob(){
    		delete this.form.company;
    		delete this.form.releaseTime;
    		if(this.endIncome == ''){
      		this.form.income = this.startIncome
      	}else{
      		this.form.income = this.startIncome+'-'+this.endIncome;
      	}
    		this.form.workCity = getCity(this.form.workCity);
    		this.form.labels = this.labels.length == 0 ? '' : this.form.labels.join(',');
        this.$refs['form'].validate((valid) => {
          if (valid) {
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
      	if(this.endIncome == ''){
      		this.form.income = this.startIncome
      	}else{
      		this.form.income = this.startIncome+'-'+this.endIncome;
      	}
    		let query = JSON.parse(JSON.stringify(this.form));
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
      labelChange(){
        console.log(this.form.labels)
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