import Vue from 'vue';
import VueRouter from 'vue-router';
//import Index from '@pages/Index';
//import Form from '@pages/Form';
import CountDown from '@pages/CountDown';
import CustIndex from '@pages/CustIndex';
import Manager from '@pages/Manager';
Vue.use(VueRouter);
const routes = [
  {
    path: '/',
    name: 'CountDown',
    component: CountDown,
  },
  {
    path: '/custing',
    name: 'CustIndex',
    component: CustIndex,
  },
  {
    path: '/manager',
    name: 'Manager',
    component: Manager,
  },
  /**
  {
    path: '/',
    name: 'Index',
    component: Index,
  },,
  {
    path: '/addrecord',
    name: 'Form',
    component: Form,
  },*/
]

const router = new VueRouter({
  mode: process.env.NODE_ENV === 'production' ? 'hash' : 'history',
  base: __dirname,
  routes: routes
})

export default router