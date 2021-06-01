<template>
  <div id="app">
    <Nav/>
    <!-- <router-link to='/good'>首页</router-link> -->
    <router-view></router-view>
  </div>
</template>

<script>
import Nav from './components/Nav'
import Good from './components/Good'
import Login from './components/Login'
import Register from './components/Register'
import Car from './components/Car'
import Order from './components/Order'
export default {
  name: 'App',
  components: {
    Nav,Good,Login,Car,Register,Order
  }
}
</script>

<style>
</style>
