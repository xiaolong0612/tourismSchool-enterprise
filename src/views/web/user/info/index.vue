<template>
	<div class="pt95 pb70 container">
		<el-row>
		  <el-col :span="12">
		  	<el-form label-width="100px">
		  		<el-form-item>
    				<div class="user-img mb20" :style="'background-image:url('+(listQuery.pic == '' ? '/static/logo.png' : listQuery.pic)+')'">
    					<el-upload
    						style="width:100%;height:100%;"
							  class="avatar-uploader"
							  :action="gpath.user_hp"
							  accept=".jpg,.png, .gif"
							  :show-file-list="false"
							  :on-success="handleAvatarSuccess"
							  :before-upload="beforeAvatarUpload">
							  <img v-if="listQuery.pic" :src="listQuery.pic" class="avatar" style="width:100%;">
							  <div class="change_img-remind">点击<br>更换头像</div>
							</el-upload>
							<!-- <div class="change_img-remind" v-if="is_edit" @click="imagecropperShow = true">点击<br>更换头像</div> -->
    				</div>
    			</el-form-item>

				  <el-form-item label="用户名">
				    <el-input v-model="listQuery.name"></el-input>
				  </el-form-item>
				  <el-form-item label="年龄">
				    <el-input v-model="listQuery.age"></el-input>
				  </el-form-item>
				  <el-form-item label="性别">
				    <el-select v-model="listQuery.sex" placeholder="请选择">
						    <el-option label="男" :value="0"></el-option>
						    <el-option label="女" :value="1"></el-option>
						  </el-select>
				  </el-form-item>
				  <el-form-item label="学校">
				  	<el-input v-model="listQuery.schoolName"></el-input>
				  </el-form-item>

				  <el-form-item label="学历">
            <el-select v-model="listQuery.education" placeholder="请选择">
              <el-option label="研究生" value="研究生"></el-option>
              <el-option label="本科" value="本科"></el-option>
              <el-option label="大专" value="大专"></el-option>
              <el-option label="高中" value="高中"></el-option>
              <el-option label="初中" value="初中"></el-option>
              <el-option label="小学" value="小学"></el-option>
            </el-select>
				  </el-form-item>

				  <el-form-item label="专业">
				    <el-input v-model="listQuery.major"></el-input>
				  </el-form-item>
				  <el-form-item label="邮箱">
				    <el-input v-model="listQuery.email"></el-input>
				  </el-form-item>
				  <el-form-item label="手机号码">
				  	<el-row>
						  <el-col :span="10">
						  	<el-input v-model="listQuery.linkPhone" disabled></el-input>
						  </el-col>
						  <el-col :span="14" class="clear_fix">
						  	<el-button class="pull-right" type="primary" @click.prevent="getCode" :disabled="codeTimeBtn">{{codeText}}</el-button>
						  </el-col>
						</el-row>
				  </el-form-item>

				  <el-form-item label="新手机号码">
				    <el-input v-model="listQuery.newPhone" placeholder="需要更改请填写"></el-input>
				  </el-form-item>

				  <el-form-item label="验证码">
				    <el-input v-model="listQuery.code"></el-input>
				  </el-form-item>
				  <el-form-item label="">
				    <el-button type="primary" @click.prevent="saveEdit">保存修改</el-button>
				    <el-button>取消</el-button>
				  </el-form-item>
				  <el-form-item label="">
				    <el-switch
						  v-model="workState"
						  active-color="#13ce66"
						  active-text="待业"
						  inactive-text="已工作"
						  @change="changeWorkType">
						</el-switch>
				  </el-form-item>
				</el-form>
		  </el-col>

		  <el-col :span="12">
		  </el-col>
		</el-row>

		<el-dialog
		  title="提示"
		  :visible.sync="dialogUpdatePhone"
		  width="30%">
		  <p>本次修改有提交新手机号码<span class="c-blue">{{listQuery.newPhone}}</span>，确定修改吗？</p>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogUpdatePhone = false">取 消</el-button>
		    <el-button type="primary" @click="saveEdit">确 定</el-button>
		  </span>
		</el-dialog>
	</div>
</template>
<script>
	import { mapGetters } from 'vuex';
  import { schoolList, getCode } from '@/api/form';
	import { validatPhone } from '@/utils/validate';
  import { saveEdit, changeWorkType } from '@/api/student/index';
	export default {
		name: '',
		props: {
    },
    computed: {
	    ...mapGetters([
	    	'id',
	      'type',
	      'pic',
	      'name',
				'age',
				'sex',
				'schoolName',
				'major',
				'email',
				'major',
				'education',
				'linkPhone'
	    ])
	  },
		data() {
			return {
				codeText: '获取短信验证码',
  			countdown: 60,
  			codeTimeBtn: false,
  			dialogUpdatePhone: false,
				schoolList: [],
				listQuery: {
					id:'',
					pic: '',
					name: '',
					age: '1',
					sex: '',
					schoolName: '',
					major: '',
					email: '',
					major: '',
					education: '',
					linkPhone: '',
					newPhone: '',
					code: ''
				},
				workState: true
			}
		},
		watch: {
			
		},
		mounted() {
			this.listQuery.id = this.id;
			this.getInfo();
		},
		methods: {
			getInfo(){
				for(var i in this.listQuery){
					let no_use = ['code', 'id', 'newPhone']
					if(no_use.indexOf(i) == -1) this.listQuery[i] = this[i];
        }
			},
			getSchoolList(){
    		schoolList().then(res => {
    			this.schoolList = res.data;
    		})
    	},
    	getCode(){
    		let form = {
    			phone: this.listQuery.linkPhone,
    			type: '2'
    		}
    		if(this.listQuery.linkPhone == ''){
    			this.$message.error('手机号码不能为空哦！');
    		}else{
	    		getCode(form).then( rs => {
	    			if(rs.code != -1){
      				this.codeTimeBtn = true;
    					this.downGetCodeTime();
	    			}
	    		})
	    	}
    	},
    	downGetCodeTime(){
	    	let _this = this;
	    	let code_time = setInterval(function(){
	    		_this.codeText = _this.countdown +'s后重新获取';
	    		_this.countdown--;
	    		if(_this.countdown <= 0){
	    			_this.codeTimeBtn = false;
	    			_this.countdown = 60;
	    			_this.codeText = '获取验证码';
	    			clearInterval(code_time);
	    		}
	    	},1000)
	    },
    	saveEdit(){
    		if(this.listQuery.newPhone != '' && !validatPhone(this.listQuery.newPhone)){
    			this.$message.error('请填写正确的手机号码');
    			return false;
    		}else if(validatPhone(this.listQuery.newPhone)){
    			this.dialogUpdatePhone = true;
    			return false;
    		}
    		this.dialogUpdatePhone = false;
    		saveEdit(this.listQuery).then(rs => {
    			if(rs.code != -1){
    				this.$message.success('信息修改成功');
    			}
    		})
    	},
    	changeWorkType(){
    		changeWorkType({id:this.id, type: this.workState ? 0 : 1}).then(rs => {
    		})
    	},
    	handleAvatarSuccess(res, file) {
        this.listQuery.pic = res.url.split('@')[0];
      },
      beforeAvatarUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 2; 
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isLt2M;
      },
		}
	}
</script>
<style rel="stylesheet/scss" lang="scss">
.user-img{
	width: 80px;
	height: 80px;
	text-align: center;
	overflow: hidden;
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
	margin: 0 auto;
	border-radius: 100%;
	box-shadow: 0 0 2px 4px #f7f7f7;
	position: relative;
	.avatar-uploader{
		font-size: 50px;
		border: 1px solid #ccc;
		border-radius: 8px;
		height: 100%;
		width: 100%;
	}
	.change_img-remind{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		line-height: 20px;
		font-size: 14px;
		color: #fff;
		padding-top: 18px;
		text-align: center;
		background-color: rgba(0,0,0,.3);
	}
}
</style>