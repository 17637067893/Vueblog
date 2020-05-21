import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import obj from '@/api/index'
import axios from 'axios'
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://39.105.146.1:3000';
// axios.defaults.baseURL = 'http://localhost:3000';
// axios.interceptors.request.use(
//  config => {
//   config.baseURL = 'http://localhost:8080'
//   config.withCredentials = true // 允许携带token ,这个是解决跨域产生的相关问题
//   config.timeout = 6000
//   let token = sessionStorage.getItem('access_token')
//   let csrf = store.getters.csrf
//   if (token) {
//    config.headers = {
//     'access-token': token,
//     'Content-Type': 'application/x-www-form-urlencoded'
//    }
//   }
//   if (config.url === 'refresh') {
//    config.headers = {
//     'refresh-token': sessionStorage.getItem('refresh_token'),
//     'Content-Type': 'application/x-www-form-urlencoded'
//    }
//   }
//   return config
//  },
//  error => {
//   return Promise.reject(error)
//  }
// )
Vue.prototype.$ajax = obj
Vue.prototype.$ajax1 = axios

Vue.use(ViewUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
