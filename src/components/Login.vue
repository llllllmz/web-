<template>
   
<el-container style="height: 400px; border: 0px solid #eee; margin-top: 80px;">
    
  <el-aside width="500px">
  </el-aside>
  
  <el-container>
      <el-header></el-header>
  <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>登录</span>
    <el-button style="float: right; padding: 3px 0" type="text" @click='registerClick'>没有账号？去注册</el-button>
  </div>
  <div>
  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
 <el-form-item label="用户名"  prop="user">
    <el-input v-model.number="ruleForm.user"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="pass">
    <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
  </el-form-item>
 
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
  </el-form>
</div>
</el-card>
  </el-container>
</el-container>
</template>
<script>
import axios from 'axios';
export default {
    name:'Login',
    data() {
        
      var checkUser = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('用户名不能为空'));
        }
        setTimeout(() => {
              callback();

        }, 1000);
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {

          callback();
        }
      };
      return {
        ruleForm: {
          pass: '',
          user: this.$store.state.user
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          user: [
            { validator: checkUser, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
        axios({
            method:'GET',
            url:'/user/login?name='+this.ruleForm.user+'&password='+this.ruleForm.pass
        }).then(res=>{
            if(res.data==='invalid'){
                this.$message.error('登录失败！请检查用户名和密码');
            }
            else if(res.status<200||res.status>299){
                this.$message('网络请求失败!');
                }
            else{
                this.$store.state.userId=res.data;
                this.$store.state.user=this.ruleForm.user
                this.$store.state.isLogin=1;
                this.$router.replace('/good').catch(err=>{})
            this.$message({
            message: '登录成功',
            type: 'success'
        });
            }
        })
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    registerClick(){
        this.$router.replace('/register').catch(err=>{})
    }
    }
  }
</script>
<style scoped>
.text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }
</style>