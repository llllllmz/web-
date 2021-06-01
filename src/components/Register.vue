<template>

<el-container style="height: 400px; border: 0px solid #eee; margin-top: 80px;">
    
  <el-aside width="500px">
  </el-aside>
  
  <el-container>
      <el-header></el-header>
  <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>注册</span>
    <el-button style="float: right; padding: 3px 0" type="text" @click='loginClick'>已有账号？去登录</el-button>
  </div>
  <div>
  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
 <el-form-item label="用户名" prop="user">
    <el-input v-model.number="ruleForm.user"  placeholder="用户名以字母开头,且只能包含数字和字母"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="pass">
    <el-input type="password" v-model="ruleForm.pass" autocomplete="off" placeholder="请输入新密码"></el-input>
  </el-form-item>
  <el-form-item label="确认密码" prop="checkPass">
    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" placeholder="请再次输入新密码"></el-input>
  </el-form-item>
 
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
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
    
    name:'Register',
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
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          pass: '',
          checkPass: '',
          user: ''
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
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
            url:'/user/register?name='+this.ruleForm.user+'&password='+this.ruleForm.pass
        }).then(res=>{
            if(res.data==='OK')
           { this.$message({
          message: '恭喜你！注册成功',
          type: 'success'
        })
        this.$router.replace('/login').catch(err=>{})
        this.$store.state.user=this.ruleForm.user;
        }
            else if(res.data==='isexist')
             this.$message.error('注册失败！该用户名已存在');
            else 
             this.$message('网络请求失败!');
        })

          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      loginClick(){
           this.$router.replace('/login').catch(err=>{})
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