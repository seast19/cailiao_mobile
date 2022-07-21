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
      redirect: { name: "sendInfo" },
    },
    {
      path: 'send/info',
      name: "sendInfo",
      component: () => import(/* webpackChunkName: "about" */ '../views/send/info.vue')
    },
    {
      path: 'send/send',
      name: "sendSend",
      component: () => import(/* webpackChunkName: "about" */ '../views/send/send.vue')
    },
    {
      path: 'send/detail',
      name: "sendDetail",
      component: () => import(/* webpackChunkName: "about" */ '../views/send/detail.vue')
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

// 设置title
router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title == undefined ? '材料管理' : to.meta.title
  next()
})

export default router
