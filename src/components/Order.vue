<template>
<div class='hahaha'>
    <div v-for='(item,index) in tableData' :key='index' class='haha'>
<el-table
      :data="item.orderDetail"
      style="width: 100%">
      <el-table-column
        prop="goodsName"
        :label="item.orderTime|GMTToStr"
        width="800">
      </el-table-column>
      <el-table-column
        prop="nums"
        label="数量/单价"
        width="180">
        <template slot-scope="scope">{{ scope.row.nums | showprice }}</template>
      </el-table-column>
    </el-table>
    </div>
    <div v-if='tableData===null' v-html='message'></div>
    <div v-else-if='tableData.length===0' v-html='message'></div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    name:'Order',
    data() {
      return {
        tableData:null,
        message: `
        <i class="el-icon-loading"></i>正在请求订单信息`
      };
    },
    methods: {
        
    },
    filters:{
        showprice(price)
        {
            // console.log(price)
            return price.replace(', dealPrice=',' / ￥')
        },
        GMTToStr(time){
    let now = new Date(time),
      Y = now.getFullYear(),
      M = now.getMonth()+1,
      D= now.getDate(),
      h = now.getHours(),
      m = now.getMinutes(),
      s = now.getSeconds();
  M = M<10?'0'+M:M;
  D = D<10?'0'+D:D;
  h = h<10?'0'+h:h;
  m = m<10?'0'+m:m;
  s = s<10?'0'+s:s;
  return Y+'-'+M+'-'+D+' '+h+':'+m+':'+s;
}
    },created() {
        axios({
         method:'GET',
            url:'/order/listByUser?userId='+this.$store.state.userId
        }).then(res=>{
            this.tableData=res.data.sort(function(a, b){return a.orderTime - b.orderTime});;
            if(this.tableData.length==0)
            (this.message=`
            <i class="el-icon-info"></i>暂无订单数据
            `)
        })

    
    }

}
</script>
<style scoped>
.haha{
    margin-bottom: 20px;
    margin-top: 5px;
    border-style: solid;
    border-color: rgb(223, 223, 223);
    border-width: 1px;
}
.hahaha{
    margin-top: 60px;
}
</style>