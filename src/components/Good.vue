<template>
   <div>
      <div class='goods-size' v-for='(goods,index) in goodsinfo' :key='index'>
           <div class='image-size'>
               <img :src="'http://202.193.52.12:8080/'+goods.pthumbnail" :alt="goods.name" height="300px" width="300px">
           </div>
           <div class='goods-bottom'>
               <h1>{{'￥'+goods.price1}}</h1>
               <!-- <el-button icon="el-icon-shopping-cart-full" circle @click='add(index)'></el-button> -->
               
               <p>{{goods.name}}</p>
               <p class='add' ><el-button type="danger" icon="el-icon-shopping-cart-full" circle @click='add(index)'></el-button></p>
           </div>
      </div>
        <el-dialog
            title="加入购物车"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
    <span>请输入数量：</span>
    <el-input-number v-model="num" @change="handleChange" :min="1" :max="99" label="描述文字"></el-input-number>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="confirm">确 定</el-button>
  </span>
</el-dialog>
    </div>
</template>

<script>
import axios from 'axios'

  export default {
    name: 'Good',
    data() {
      return {
        dialogVisible: false,
         num:1,
         addindex:null,
        goodsinfo:{}
      }
    },
    methods: {
        handleChange(value) {
        // this.$store.state.addnum=value
      },
      handleClose(done) {
            done().catch(_ => {});
      },
      confirm(){
          this.dialogVisible = false;
          axios({
         method:'GET',
            url:'cart/add?userId='+this.$store.state.userId+'&goodsId='+this.goodsinfo[this.addindex].id+'&num='
            +this.num+'&price='+this.goodsinfo[this.addindex].price1
        }).then(res=>{
            if(res.status>=200&&res.status<=299){
          this.$message({
          message: '已加入购物车',
          type: 'success'
        });
        this.num=1
        }else{
        his.$message.error('添加失败！');

        }
        })

      },
      handleSelect(key, keyPath) {
        // console.log(key, keyPath);
      },
      add(index)
      {
       if(this.$store.state.isLogin==0)
        {
          // this.$router.replace('/order').catch(err=>{})
          this.$message({
          message: '请先登录！',
          type: 'warning'
        });
      //  this.$router.replace('/login').catch(err=>{})
       }
       else{
    // console.log(index)
        this.dialogVisible = true;
        this.addindex=index
        }
         
      }
    },
    created() {
        axios({
         method:'GET',
            url:'/goods/list'
        }).then(res=>{
            this.goodsinfo=res.data;
        })
    }


    
  }
</script>
<style scoped>

 .goods-size{
     width: 300px;
     height: 426px;
     background-color:255, 255, 255;
     margin: 35px;
    float:left;
    border-style: solid;
    border-color: rgb(240, 240, 240);
     margin-top: 80px;
 }
 .image-size{
     width:300px;
     height: 300px;
     background-color: pink;
 }
 h1{
     font-size: 20px;
     color: rgb(224, 18, 34);
 }
 p{
font-size: 15px;
font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
line-height: 0%;
 }
 .goods-bottom{
   padding-right:20px;
   padding-left: 20px;
 }
 .add{
     text-align: center;
 }
 .el-button--danger{background: rgb(223, 48, 51);
 float:right;}
</style>