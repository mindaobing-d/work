import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import axios from "axios"
import { DatetimePicker, Toast } from 'mint-ui'
import 'mint-ui/lib/style.css';
Vue.prototype.axios = axios;
Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
