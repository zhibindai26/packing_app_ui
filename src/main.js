import Vue from 'vue';
import App from './App.vue';
import Router from 'vue-router';
import Home from './Home.vue';
import PackingList from './PackingList.vue';

Vue.config.productionTip = false

Vue.use(Router);

const routes = [
  { path: '/', component: Home },
  { path: '/list', component: PackingList }
]

const router = new Router({
  routes,
  mode: 'history'
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
