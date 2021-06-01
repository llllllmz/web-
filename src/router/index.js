import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login'
import Register from '../components/Register'
import Car from '../components/Car'
import Order from '../components/Order'
import Good from '../components/Good'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [{
      path: '',
      redirect: '/good'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/car',
      component: Car
    },
    {
      path: '/order',
      component: Order
    },
    {
      path: '/good',
      component: Good
    }
  ],
  mode: 'history'
})
export default router