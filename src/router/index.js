import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'dashboard',
    component: () => import( /* webpackChunkName: "about" */ '../views/Dashboard.vue'),
    children: [
      {
        // 当 /user/:id/profile 匹配成功，
        // UserProfile 会被渲染在 User 的 <router-view> 中
        path: 'borrow',
        component: () => import( /* webpackChunkName: "about" */ '../views/Borrow/Borrow.vue')
      },
      {
        // 当 /user/:id/profile 匹配成功，
        // UserProfile 会被渲染在 User 的 <router-view> 中
        path: 'giveback',
        component: () => import( /* webpackChunkName: "about" */ '../views/Giveback/Giveback.vue')
      },

    ],
    redirect: 'borrow'
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/Login.vue')
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
