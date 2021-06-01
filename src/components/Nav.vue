<template>
<el-menu
  :default-active="$route.path"
  class="el-menu-demo"
  mode="horizontal"
  background-color="#545c64"
  text-color="#fff"
  active-text-color="#ffd04b">
  <el-menu-item index="/good" @click=goodClick ><i class="el-icon-goods"></i>商城首页</el-menu-item>
  <el-menu-item index="/order" @click=orderClick><i class="el-icon-tickets"></i>订单</el-menu-item>
  <el-menu-item index="/car" @click=carClick><i class="el-icon-shopping-cart-2"></i>购物车</el-menu-item>
  <el-menu-item index="/login" @click=loginClick  v-if="$store.state.isLogin==0"><i class="el-icon-user"></i>登录</el-menu-item>
  <el-submenu index="1" v-else>
    <template slot="title"><i class="el-icon-user-solid"></i>{{$store.state.user}}</template>
    <el-menu-item index="1-1" @click=exitClick>退出登录</el-menu-item>
  </el-submenu>
</el-menu>
</template>
<script>
  export default {
    name: 'Nav',
    data() {
      return {
      };
    },
    methods: {
      goodClick()
      {
        this.$router.replace('/good').catch(err=>{})
      },
      orderClick(){
        if(this.$store.state.isLogin==0)
        {
          this.$router.replace('/order').catch(err=>{})
          this.$message({
          message: '请先登录！',
          type: 'warning'
        });
        setTimeout(()=>{ 
       this.$router.replace('/login').catch(err=>{})
       },1);
        }else{
          this.$router.replace('/order').catch(err=>{})
        }
        
      },
      carClick(){
        
        if(this.$store.state.isLogin==0)
        {
          this.$router.replace('/car').catch(err=>{})
          
          this.$message({
          message: '请先登录！',
          type: 'warning'
        });
        setTimeout(()=>{ 
       this.$router.replace('/login').catch(err=>{})
       },1);
        
        }else{
          this.$router.replace('/car').catch(err=>{})
        }
      },
      loginClick(){
        this.$router.replace('/login').catch(err=>{})
      },
      exitClick(){
        this.$store.state.isLogin=0
        // this.$store.state.user=null
        // this.$store.state.userId=null
        this.$router.replace('/login').catch(err=>{})
            this.$message({
          message: '已退出登录！',
          type: 'warning'
        });
      }
    }
  }
</script>
<style scoped>
.el-menu-demo{
  position:fixed;
  top:0;
  width:100%;
  z-index:2
}
</style>