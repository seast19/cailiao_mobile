import Vue from 'vue'
import VueRouter from 'vue-router'
import { checkLogin } from './guards'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  
  beforeEnter: checkLogin,
  
  component: () => import(/* webpackChunkName: "about" */ '../views/Dashboard.vue'),
  children: [
    {
      path: '',
      redirect:'send'
    }, {
      path: 'send',
      name: "send",
      component: () => import(/* webpackChunkName: "about" */ '../views/send/send.vue')
    },
    {
      path: 'receive',
      name: 'receive',
      component: () => import(/* webpackChunkName: "about" */ '../views/Giveback/Giveback.vue')
    },
    {
      path: 'total',
      name: "total",
      component: () => import(/* webpackChunkName: "about" */ '../views/total/total.vue')
    },
    {
      path: 'setting',
      name: 'setting',
      component: () => import(/* webpackChunkName: "about" */ '../views/Setting/Setting.vue')
    }

  ],
  // redirect: '/'
},
{
  path: '/login',
  name: 'login',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
}
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
