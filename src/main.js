import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import myCore from '@/Plugins/myCore'; // импортируем свой плагин

Vue.use(BootstrapVue)
Vue.config.productionTip = true;

Vue.use(myCore) // начинаем использовать плагин


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
