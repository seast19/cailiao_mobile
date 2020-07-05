import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'dashboard',
    component: () => import( /* webpackChunkName: "about" */ '../views/Dashboard.vue'),
    children: [{
        path: 'borrow',
        component: () => import( /* webpackChunkName: "about" */ '../views/Borrow/Borrow.vue')
      },
      {
        path: 'giveback',
        component: () => import( /* webpackChunkName: "about" */ '../views/Giveback/Giveback.vue')
      },
      {
        path: 'search',
        component: () => import( /* webpackChunkName: "about" */ '../views/Search/Search.vue')
      },
      {
        path: 'setting',
        component: () => import( /* webpackChunkName: "about" */ '../views/Setting/Setting.vue')
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
