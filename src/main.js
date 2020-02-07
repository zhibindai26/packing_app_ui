import Vue from 'vue';
import App from './App.vue';
import Router from 'vue-router';
import Home from './Home.vue';
import PackingList from './PackingList.vue';

Vue.config.productionTip = false

Vue.use(Router);

const routes = [
  { path: '/', name: "home", component: Home },
  { path: '/list', name: "packingList", component: PackingList, props: true }
]

const router = new Router({
  routes,
  mode: 'history'
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
