import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui';
import router from './router/index.js'
import Axios from 'axios'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css';
Vue.prototype.$axios = Axios
Axios.defaults.baseURL = '/api'
Axios.defaults.headers.post['Content-Type'] = 'application/json';

Vue.prototype.$store = store
Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 };
Vue.use(ElementUI)
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})