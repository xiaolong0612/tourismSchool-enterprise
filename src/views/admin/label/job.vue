<template>
	<div class="p30" style="min-height:calc(100vh - 84px)">
    <el-alert
      title="最多添加15条"
      type="warning"
      show-icon
      class="mb20">
    </el-alert>
		<el-switch
		  style="display: inline-block"
		  v-model="userType"
		  active-color="#13ce66"
		  inactive-color="#ff4949"
		  active-text="岗位"
		  inactive-text="企业"
		  @change="changeType">
		</el-switch>
		<el-form :inline="true" :rules="rules" :model="form" ref="form" class="mt15">
		  <el-form-item prop="name">
		    <el-input v-model="form.name" placeholder="请填写"></el-input>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" :disabled="add_disabled" @click="onAdd('form')" size="small">添加</el-button>
		  </el-form-item>
		</el-form>
		<div>
			<el-tag
			  v-for="tag in tags"
			  class="mr15 mb15"
			  :key="tag.id"
			  closable
			  :type="tag.type"
			  @close="handleClose(tag.id)">
			  {{tag.name}}
			</el-tag>
		</div>
	</div>
</template>

<script>
  import { mapGetters } from 'vuex';
	import { listLabel, newLabel, delLabel } from '@/api/admin/label';
	export default {
    name: 'label',
    computed: {
      ...mapGetters([
        'name',
        'id',
        'age'
      ])
    },
    data() {
    	const labelLength = (rule, value, callback) => {
	      if (value.length > 6) {
	        callback(new Error('标签名称太长了哦'))
	      } else {
	        callback()
	      }
	    }
    	return{
    		text: '',
    		userType: false,
        add_disabled: false,
    		listQuery: {
    			pageNo: 1,
    			pageSize: 100,
    			type: 0,
    			name:'',
    		},
    		form: {
    			name: '',
    			type: 0,
    			creatorId: ''
    		},
    		rules: {
          name: [
            { required: true, message: '请输入标签名称', trigger: 'blur' },
            { required: true, trigger: 'change', validator: labelLength }
          ],
        },
        typeList: ['success','info','warning','danger'],
    		tags:[]
    	}
    },
    mounted(){
    	this.form.creatorId = this.id;
      this.listLabel();
    },
    methods: {
    	changeType(type){
    		if(type){
          this.listQuery.type = 1;
          this.form.type = 1;
        }else{
          this.listQuery.type = 0;
          this.form.type = 0;
        }
    		this.listLabel();
    	},
    	listLabel(){
    		listLabel(this.listQuery).then(res => {
          if(typeof res.code != 'undefined'){
            if(res.code == -1){
              this.add_disabled = true;
              return;
            }
          }
    			for(let i in res.list){
    				let index = Math.floor((Math.random()*this.typeList.length));
    				this.$set(res.list[i], 'type', this.typeList[index]);
    			}
          if(res.list.length > 20) this.add_disabled = true;
          else this.add_disabled = false;

          this.tags = res.list;
          if(this.tags.length > 15){
            this.add_disabled = true;
          }else{
            false
          }
    		})
    	},
    	onAdd(formName){

    		this.$refs[formName].validate((valid) => {
          if (valid) {
            newLabel(this.form).then(res => {
              this.form.name = '';
		    			if(res.success) this.listLabel();
		    		})
          } else {
            this.$message.error('错了哦，请重新填写');
            return false;
          }
        });
    		
    	},
    	handleSelect(val){
    		this.text = ''
    	},
    	handleClose(id){
    		delLabel({id: id}).then(res => {
    			if(res.success) this.listLabel();
    		})
    	}
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
	
	
</style>