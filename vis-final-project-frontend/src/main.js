import Vue from 'vue';
import App from './App.vue';
import router from './router';
import echarts from 'echarts';
import axios from 'axios';
import Vuex from 'vuex'
import store from './store/store'
import {
  Card,
  Main,
  Container,
  Header,
  Timeline,
  TimelineItem,
  DatePicker,
  Message, Button,
  Tag

} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Card);
Vue.use(Main);
Vue.use(Container);
Vue.use(Header);
Vue.use(Timeline);
Vue.use(TimelineItem);
Vue.use(DatePicker);
Vue.use(Button)
Vue.use(Tag)

import 'leaflet/dist/leaflet.css';
Vue.config.productionTip = false;

Vue.prototype.$echarts = echarts;
Vue.prototype.$http = axios;
Vue.prototype.$message = Message
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
