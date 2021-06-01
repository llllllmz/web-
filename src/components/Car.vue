<template>
<div>
<el-table
    ref="multipleTable"
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%; margin-top: 60px;"
    @selection-change="handleSelectionChange"
    @current-change="handleCurrentChange">

    <el-table-column
      type="selection"
      width="55">
    </el-table-column>

    <el-table-column
      label=""
      width="100">
      <template   slot-scope="scope">            
        <img :src="'http://202.193.52.12:8080/'+scope.row.thumbnail"  min-width="80" height="80" />
    </template>
    </el-table-column>

    <el-table-column
      prop="name"
      label="商品"
      width="550">
    </el-table-column>

    <el-table-column
      label="单价"
       width="175"
       align='center'
      show-overflow-tooltip
      >
      <template slot-scope="scope">
        ￥<span>{{ scope.row.price }}</span>
      </template>
    </el-table-column>

    <el-table-column
      label="数量"
      width="250"
      align='center'
      show-overflow-tooltip
      >
      <template slot-scope="scope">
        <el-input-number v-model="scope.row.num" :min="1" :max="99" label="描述文字"></el-input-number>
      </template>
    </el-table-column>

    <el-table-column
      label="小计"
       width="175"
       align='center'
      show-overflow-tooltip
      >
      <template slot-scope="scope">
        ￥<span>{{ scope.row.price*scope.row.num }}</span>
      </template>
    </el-table-column>

    <el-table-column
      label="操作"
       width="180"
       align='center'
      show-overflow-tooltip
      >
      <template>
        <a href='javascrit:;' @click='delet'>删除</a>
      </template>
    </el-table-column>

  </el-table>
         <div class='ddd'>
       <el-button type="danger" round @click='maidan' v-if='tableData.length'>去结算</el-button>
       </div>
       <div class='heihei'>合计：<span class='sum'>{{sum}}</span></div>
   </div>
</template>
<script>
  import axios from 'axios';
  export default {
    name:'Car',
    data() {
      return {
        tableData: [],
        // num:0,
        cardlist:'',
        multipleSelection: []
      }
    },
    computed:{
        sum(){
            let s=0;
            for(let item of this.multipleSelection)
            {
                s+=item.price*item.num
            }
            return '￥'+s;
        }
    },

    methods: {
        maidan(){
            if(this.cardlist=='')
            {
                this.$alert('请选择要购买的商品！','提示', {
                   confirmButtonText: '确定',
                    callback: action => {}
                    });
            }
            else{
            console.log(this.cardlist)
                axios({
                method:'GET',
                url:'/order/addCastOrder?userId='+this.$store.state.userId+'&cartList='+this.cardlist
                }).then(res=>{
                this.$alert('结算成功！','提示', {
                  confirmButtonText: '确定',
                     callback: action => {
                  }
                  });
                axios({
                method:'GET',
                    url:'cart/listByUser?userId='+this.$store.state.userId
                }).then(res1=>{
            this.tableData=res1.data.sort(function(a, b){return a.num*a.price - b.num*b.price});
        })
            

        })
            
        
        }
        },
         handleCurrentChange(val) {
        this.currentRow = val;
        console.log(val)
          }, 
       handleSelectionChange(val) {
        this.multipleSelection = val;
        let basic='';
        for(var o of val)
        {
            basic+=o.cardid+','
        }
        basic = basic.substr(0, basic.length - 1);
        console.log(basic);
        this.cardlist=basic
      },
      delet(){
          setTimeout(()=>{ 
          axios({
            method:'GET',
            url:'/cart/deleteById?userId='+this.$store.state.userId+'&cartId='+this.currentRow.cardid
        }).then(res=>{
            if(res.status>=200&&res.status<=299)
            {
                this.$message('删除成功！');
                console.log('dll');
                console.log(res.data)
                axios({
         method:'GET',
            url:'cart/listByUser?userId='+this.$store.state.userId
        }).then(resul=>{
            // console.log(resul.data)
            this.tableData=resul.data.sort(function(a, b){return a.num*a.price - b.num*b.price});
            // console.log(this.tableData+'哈哈')
        })
        
      }
      }),100})
    }},
    created() {
        axios({
         method:'GET',
            url:'cart/listByUser?userId='+this.$store.state.userId
        }).then(res=>{
            this.tableData=res.data.sort(function(a, b){return a.num*a.price - b.num*b.price});
            // console.log(this.tableData+'哈哈')
        })
        // console.log("haha")
    }
  }
</script>
<style scoped>
.heihei{
    float:right;
    margin:30px;
}
.ddd{
    margin:20px;
    margin-right: 80px;
    float:right
}
.el-button--danger{background: rgb(230, 67, 71);}
.sum{
color:red;
}
</style>