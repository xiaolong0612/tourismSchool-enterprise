<template>
	<div class="bg-gray pb100">
		<div class="user-bg">
			<div class="breadcrumb-wrap container">
				<el-breadcrumb separator="/">
				  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
				  <el-breadcrumb-item :to="{ path: '/user/resume/list' }">简历列表</el-breadcrumb-item>
				  <el-breadcrumb-item>简历详情</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
		</div>
		<div class="section user-wrap small_container panel_white ">
			<div class="about_intro">
        <el-row>
        		<el-col :span="10">
        				<div class="user-img" :style="'background-image:url()'">
        					<el-upload
									  class="avatar-uploader"
									  :action="gpath.user_hp"
									  :show-file-list="false"
									  :on-success="handleAvatarSuccess"
									  :before-upload="beforeAvatarUpload">
									  <img v-if="user_info.pic" :src="user_info.pic" class="avatar" style="width:100%;">
									  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
									</el-upload>
        				</div>
        				
            </el-col>
        		<el-col :span="14">
                <h4>
                    <span v-if="!is_edit">{{user_info.linkName}}</span>
                    <el-input v-if="is_edit" v-model="user_info.linkName" placeholder="请填写姓名"></el-input>
                </h4>
                <ul class="border_bottom_list">
										<!-- 基本信息 -->
                    <li class="clearfix">
                    	<strong class="list_title">tel : </strong>
                    	<span v-if="!is_edit">{{user_info.linkPhone}}</span>
                    	<el-input v-if="is_edit" v-model="user_info.linkPhone"></el-input>
                    </li>
                    <li class="clearfix">
                    	<strong class="list_title">年龄:</strong>
                    	<span>{{age}}</span>
                   	</li>
                    <li class="clearfix">
                    	<strong class="list_title">在职状态: </strong>
                    	<a v-if="!is_edit" href="#">{{user_info.working}}</a>
                    	<el-select v-if="is_edit" v-model="user_info.working" placeholder="请选择">
									      <el-option label="待业" value="待业"></el-option>
									      <el-option label="在职" value="在职"></el-option>
									    </el-select>
                    </li>
                </ul>
								<el-form label-width="80px" label-position="left" class="mt25">

							    <el-form-item label="个性标签" >
							      <div class="small_container">
											<el-tag 
												v-for="tag in user_info.labelName"
												:closable="is_edit"
												:key="tag"
												@close="handleTagClose(tag)">{{tag}}</el-tag>
											<el-input
												style="width:80px"
												v-if="is_edit"
											  class="input-new-tag"
											  v-model="labelValue"
											  ref="saveTagInput"
											  size="small"
											  placeholder="New tag"
											  @keyup.enter.native="handleInputConfirm"
											  @blur="handleInputConfirm"
											></el-input>
										</div>
							    </el-form-item>

							    <el-form-item label="期望工作" class="mb0">
							      <div class="expect_wrap">
												<el-row>
													<el-col :span="12">
														<icon-svg icon-class="ffan_lingdai" />
														<span v-if="!is_edit">{{user_info.expectJob}}</span>
					                  <el-input v-if="is_edit" v-model="user_info.expectJob" placeholder="期望岗位"></el-input>
													</el-col>
													<el-col :span="12">
														<icon-svg icon-class="dibiao" />
														<span v-if="!is_edit">{{user_info.expectAddress}}</span>
					                  <el-input v-if="is_edit" v-model="user_info.expectAddress" placeholder="期望地点"></el-input>
													</el-col>
													<el-col :span="12">
														<icon-svg icon-class="bill-copy" />
														<span v-if="!is_edit">{{user_info.expectIncome}}</span>
														<el-input v-if="is_edit" v-model="user_info.expectIncome" placeholder="期望薪资"></el-input>
													</el-col>
												</el-row>
											</div>
							    </el-form-item>

							  </el-form>


            </el-col>
        </el-row>
      </div>
		</div>

		<div class="small_container section panel_white mb40">
			<div class="section_title">
				<h4>我的经验</h4>
				<div></div>
				<p>以前的工作有助于经验的收集</p>
			</div>
			<div>
				<el-table
			    :data="user_info.workList"
			    :show-header="false"
			    style="width: 100%">
			    <el-table-column
			      property="companyName">
			    </el-table-column>
			    <el-table-column>
			      <template slot-scope="scope">
			        <el-popover trigger="hover" placement="top">
			          <p>工作描述: {{ scope.row.workContent }}</p>
			          <span slot="reference">{{ scope.row.workJob }}</span>
			        </el-popover>
			      </template>
			    </el-table-column>
			    <el-table-column
			      property="endDate">
			      <template slot-scope="scope">
			      	<span>{{scope.row.endDate}}</span>
			      </template>
			    </el-table-column>
			    <el-table-column
			    	v-if="is_edit"
			    	width="100px">
			    	<template slot-scope="scope">
				    	<i 
				    		class="el-icon-edit mr15 c-blue"
				    		@click="editRow(scope.$index, user_info.workList, 'work')"></i>
				    	<i class="el-icon-delete c-danger"
				    		@click="deleteRow(scope.$index, user_info.workList, 'work')"></i>
				    </template>
			    </el-table-column>
			  </el-table>
			</div>
			<div class="t-center mt10">
				<el-button icon='el-icon-plus' size="mini" type="primary" @click="dialogAddWork = true" class="addbtn" v-if="is_edit">添加</el-button>
			</div>
		</div>

		<div class="small_container section panel_white mb40">
			<div class="section_title">
				<h4>我的教育</h4>
				<div></div>
				<p>教育的根源很苦，但果实甜美集</p>
			</div>
			<div>
				<el-table
			    :data="user_info.eduList"
			    :show-header="false"
			    style="width: 100%">
			    <el-table-column property="schoolName"></el-table-column>
			    <el-table-column property="major"></el-table-column>
			    <el-table-column property="qualificate"></el-table-column>
			    <el-table-column property="graduateYear"></el-table-column>
			    <el-table-column
			      property="endDate">
			      <template slot-scope="scope">
			      	<span>{{scope.row.endDate}}</span>
			      </template>
			    </el-table-column>
			    <el-table-column
			    	v-if="is_edit"
			    	width="100px">
			    	<template slot-scope="scope">
				    	<i class="el-icon-edit mr15 c-blue"></i>
				    	<i class="el-icon-delete c-danger"></i>
				    </template>
			    </el-table-column>
			  </el-table>
			</div>
			<div class="t-center mt10">
				<el-button icon='el-icon-plus' size="mini" type="primary" @click="dialogAddEdu = true" class="addbtn" v-if="is_edit">添加</el-button>
			</div>
		</div>

		<div class="section honor_wrap">
			<div class="container">
				<div class="section_title">
					<h4>荣誉</h4>
					<div></div>
					<p>荣誉应该是结果，而不是行为的动机。</p>
				</div>
				<el-row>
				  <el-col :span="8" v-for="(o, index) in 3" :key="o">
				    <el-card style="background-image:url(/static/img/zhengshu.jpg)">
					      <div style="padding-top:100%;overflow:hidden;">
					        <div class="bg-color" style="margin-top:-100%;">
					        	<div class="honor_text">
					        		<p>2017年6月12</p>
					        		<p>厦门大学所奖</p>
					        	</div>
					        </div>
					    </div>
				    </el-card>
				  </el-col>
				</el-row>
			</div>
		</div>

		<div class="fixed-edit">
			<ul>
				<transition name="el-zoom-in-center">
					<li style="background:#67c23a" @click="saveResume" v-if="is_edit">保<br>存</li>
				</transition>
				<transition name="el-zoom-in-center">
					<li style="background:#eb9e05" @click="closeEdit" v-if="is_edit">取<br>消</li>
				</transition>
				<transition name="el-zoom-in-center">
					<li style="background:#409eff" @click="is_edit = true" v-if="!is_edit">编<br>辑</li>
				</transition>
			</ul>
		</div>

		<el-dialog title="添加工作经历" :visible.sync="dialogAddWork" width="500px">
		  <el-form label-width="80px">

		    <el-form-item label="职位">
		      <el-input v-model="formData.work.workJob" auto-complete="off"></el-input>
		    </el-form-item>

		    <el-form-item label="公司名称">
		      <el-input v-model="formData.work.companyName" auto-complete="off"></el-input>
		    </el-form-item>

		    <el-form-item label="任职时间">
		      <el-date-picker
			      v-model="formData.work.time"
			      type="daterange"
			      range-separator="至"
			      start-placeholder="开始日期"
			      end-placeholder="结束日期"
			      style="width:100%">
			    </el-date-picker>
		    </el-form-item>

		    <el-form-item label="工作描述">
		      <el-input type="textarea" v-model="formData.work.workContent" auto-complete="off"></el-input>
		    </el-form-item>

		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="dialogAddWork = false">取 消</el-button>
		    <el-button type="primary" @click="addExp('work')">确 定</el-button>
		  </div>
		</el-dialog>

		<el-dialog title="添加教育经历" :visible.sync="dialogAddEdu" width="500px">
		  <el-form label-width="80px">

		    <el-form-item label="专业" >
		      <el-input v-model="formData.edu.major" auto-complete="off"></el-input>
		    </el-form-item>

		    <el-form-item label="学校名称" >
		      <el-input v-model="formData.edu.schoolName" auto-complete="off"></el-input>
		    </el-form-item>

		    <el-form-item label="学历" >
		      <el-input v-model="formData.edu.qualificate" auto-complete="off"></el-input>
		    </el-form-item>

		    <el-form-item label="毕业时间" >
		      <el-input v-model="formData.edu.graduateYear" auto-complete="off"></el-input>
		    </el-form-item>

		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="dialogAddEdu = false">取 消</el-button>
		    <el-button type="primary" @click="addExp('edu')">确 定</el-button>
		  </div>
		</el-dialog>
	</div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { parseTime } from '@/utils/index';
  import { getResumeDetails, saveResume, updateResume } from '@/api/student/resume';
  export default {
    computed: {
      ...mapGetters([
        'name',
        'id',
        'age'
      ])
    },
  	data() {
  		return {
  			is_edit: false,
  			is_edit_exp: false,
  			inputVisible: false,
  			labelValue: '',
  			user_info: {
  				studentId: '',
  				pic: "",
  				linkName: '',
  				linkPhone: '',
  				certificate: '',
  				selfIntro: '',
  				skillDescript: '',
  				pic: '',
  				labelName: [],
  				working: '',
  				expectAddress: '',
  				expectIncome: '',
  				expectJob: '',
  				work: [],
  				edu: []
  			},
  			dialogAddWork: false,
  			dialogAddEdu: false,
  			list: {},
  			formData: {
  				work: {
						workJob: '1',
						companyName: '1',
						time: '',
						workContent: ''
					},
					edu: {
						major: '',
						schoolName: '1',
						qualificate: '1',
						graduateYear: '11'
					}
				},
  			user_label: false
  		}
  	},
  	mounted(){
  		this.is_add();
  	},
  	methods: {
  		is_add(){
  			if(this.$route.params.id == 0){
  				this.is_edit = true;
  			}else{
  				this.getInfo();
  			};
  		},
  		getInfo(){
  			let id = this.$route.params.id;
  			getResumeDetails({id}).then(res => {
  				let data = res.resume;
  				for(var label in this.user_info){
  					if(label == 'labelName'){
  						this.user_info[label] = data[label] == '' ? [] : data[label].split(',');
  					}else if(label == 'work'){
  						let workList;
  						workList = typeof data.workList == 'undefined' ? [] : data.workList
  						this.user_info['workList'] = JSON.parse(JSON.stringify(workList));
  						this.user_info.wrok = JSON.parse(JSON.stringify(workList));
  					}else if(label == 'edu'){
  						let eduList;
  						eduList = typeof data.eduList == 'undefined' ? [] : data.eduList
  						this.user_info['eduList'] = JSON.parse(JSON.stringify(data.eduList));
  						this.user_info.edu = JSON.parse(JSON.stringify(eduList));
  					}else{
  						this.user_info[label] = data[label];
  					}
  				}
  			})
  		},
  		saveResume(){
  			this.user_info.studentId = this.id;
  			if(this.$route.params.id == 0){
	  			saveResume(this.formToString()).then(res => {
	  				if(res.success){
	  					this.$message.success('添加成功');
			        this.$router.back(-1);
	  				}
	  			})
	  		}else{
	  			this.updata();
	  		}
  		},
  		updata(){
  			this.user_info['id'] = this.$route.params.id;
  			updateResume(this.formToString()).then(res => {
  				this.$message.success('编辑成功');
	        this.$router.back(-1);
  			})
  		},
  		formToString(){
  			let data = JSON.parse(JSON.stringify(this.user_info));
  			data.labelName = this.user_info.labelName.join(',');
  			data.work = JSON.stringify(this.user_info.workList);
  			data.edu = JSON.stringify(this.user_info.eduList);
  			delete data.workList;
  			delete data.eduList;
  			return data
  		},
  		closeEdit(){
  			if(this.$route.params.id != 0){
  				this.is_edit = false;
  				this.getInfo();
  			}else{
  				this.$router.back(-1);
  			}
  		},
  		addExp(position){
  			if(position == 'work'){
  				this.user_info.work.push({
  					workJob: this.formData.work.workJob,
						companyName: this.formData.work.companyName,
						beginDate: parseTime(this.formData.work.time[0], '{y}-{m}-{d}'),
						endDate: parseTime(this.formData.work.time[1], '{y}-{m}-{d}'),
						workContent: this.formData.work.workContent
  				})
  				this.user_info.workList = this.user_info.work
  				this.dialogAddWork = false;
  			}else{
  				this.user_info.edu.push(this.formData.edu);
  				this.user_info.eduList = this.user_info.edu;
  				this.dialogAddEdu = false;
  			}
      	this.is_edit_exp = false;
  			console.log(this.user_info)
  		},
  		handleTagClose(tag){
  			this.user_info.labelName.splice(this.user_info.labelName.indexOf(tag), 1);
  		},
  		handleInputConfirm(){
  			if(this.user_info.labelName.length == 5){
  				this.$message.warning('sorry，不可以太贪心哦！最多只可以添加5条。');
  				return;
  			}
  			let inputValue = this.labelValue;

  			if(inputValue.length >= 5){
  				this.$message.warning('sorry，字符太多了哦，快删除几个字符')
  				return;
  			}

        if (inputValue) {
          this.user_info.labelName.push(inputValue);
        }
        this.labelValue = '';
  		},
  		handleAvatarSuccess(res, file) {
  			this.is_edit = true;
        this.user_info.pic = res.url.split('@')[0];
  			console.log(res.url);
  			console.log(this.user_info)
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        // if (!isJPG) {
        //   this.$message.error('上传头像图片只能是 JPG 格式!');
        // }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      deleteRow(index, rows) {
      	console.log(rows)
        rows.splice(index, 1);
      },
      editRow(index, rows, type){
      	this.is_edit_exp = true;
      	if(type == 'work'){
      		this.dialogAddWork = true;
      		for(let label in this.formData[type]){
      			if(label == 'time') this.formData[type][label] = [rows[index].beginDate, rows[index].endDate];
      			else this.formData[type][label] = rows[index][label];
	      	}
	      	console.log(this.formData)
      	}
      	else{
      		this.dialogAddEdu = true;
      		for(let label in this.formData[type]){
	      		this.formData[type][label] = rows[index][label];
	      	}
      	}
      }
  	}
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "src/styles/mixin.scss";
	.user-bg{
		height: 445px;
		width: 100%;
		background: url(/static/img/background/长城.jpg) center top 98% no-repeat;
		background-size: cover;
		.breadcrumb-wrap{
			padding: 80px 0 0;
		}
	}
	.section_title{
		text-align: center;
		margin-bottom: 50px;
		>div{
			border-bottom: solid 2px #457aff;
	    margin: 10px auto;
	    max-width: 50px;
		}
	}
	.user-wrap{
    margin-top: -250px;
    margin-bottom: 40px;
    padding: 25px;
    background-color: #FFFFFF;
    .about_intro {
	    text-align: left;
	    margin: 0 auto;
	    max-width: 100%;
	    .user-img{
				width: 325px;
				height: 345px;
				line-height: 345px;
				text-align: center;
				overflow: hidden;
				background: url(/static/img/default-img/user.jpg) center no-repeat;
				background-size: cover;
				border-radius: 8px;
				position: relative;
				.avatar-uploader{
					font-size: 50px;
					border: 1px solid #ccc;
					border-radius: 8px;
					height: 100%;
					width: 100%;
				}
	    }
	    h4{
	    	text-transform: uppercase;
		    color: #333333;
		    font-weight: 800;
		    letter-spacing: 1px;
		    margin-bottom: 10px;
		    margin-top: 5px;
		    font-size: 20px;
		    height: 30px;
	    }
	    h5{
	    	margin-bottom: 10px;
		    color: #555;
		    font-size: 17px;
		    font-weight: 500;
	    }
	    .border_bottom_list{
	    	li{
	    		line-height: 46px;
	    		padding: 0;
	    		.el-input{
	    			width: 50%;
	    		}
	    		.el-select{
	    			.el-input{
	    				width: 100%;
	    			}
	    		}
	    	}
	    }
		}
	}
	.expect_wrap{
		color: #555;
		font-size: 14px;
		.el-input{
			width: 60%
		}
	}
	.skill_wrap{
		p{
			line-height: 25px;
			margin-bottom: 5px;
		}
		.el-progress{
			margin-bottom: 25px;
		}
	}
	.honor_wrap{
		.el-card{
			width: 85%;
			margin: 0 auto;
			background-size: 55%;
			background-position: center;
			background-repeat: no-repeat;
			position: relative;
			@include transition;
			&:hover{
				background-size: 75%;
				.el-card__body{
					background-color: rgba(0,0,0,.8);
				}
				.honor_text{
					bottom: 10px;
					opacity: 1;
				}
			}
			.el-card__body{
				@include transition;
			}
			.honor_text{
				position: absolute;
				bottom: 0;
				left: 20px;
				width: 100%;
				line-height: 25px;
				color: #fff;
				opacity: 0;
				@include transition;
			}
		}
		img{
			width: 100%;
			height: 100%;
		}
	}
	.fixed-edit{
		position: fixed;
		bottom: 30%;
		right: 0;
		li{
			display: block;
			font-size: 14px;
			color: #fff;
			text-align: center;
			padding: 10px 15px;
			margin-bottom: 10px;
			border-radius: 4px 0 0 4px;
		}
	}

.border_bottom_list {
  padding: 0;
  margin: 0;
  list-style: none;
  li {
    text-transform: capitalize;
    padding: 12px 0;
    font-size: 16px;
    border-bottom: 1px solid #f7f7f7;
    .list_title {
      display: block;
      min-width: 95px;
      font-weight: 500;
      letter-spacing: 0;
      float: left;
      color: #000000;
    }
  }
}
</style>