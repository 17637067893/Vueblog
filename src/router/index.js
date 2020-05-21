import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

  const routes = [
	  {
	    path: '/',
	    name: 'login',
	  	 component: () => import('../components/login/login.vue')
	  },
	  {
	    path: '/info',
	    name: 'info',
	  	 component: () => import('../components/info.vue')
	  },
	  {
	    path: '/uploadImg',
	    name: 'uploadImg',
	  	 component: () => import('../components/uploadImg.vue')
	  },
	  {
	    path: '/search',
	    name: 'search',
		meta:{
			keepAlive:true
		},
	  	 component: () => import('../components/search.vue')
	  },
	  {
	    path: '/write',
	    name: 'write',
	  	 component: () => import('../components/write.vue')
	  },
	  {
	    path: '/personal',
	    name: 'personal',
	  	 component: () => import('../components/personal.vue')
	  },
	  {
	    path: '/headerInfo',
	    name: 'headerInfo',
	  	 component: () => import('../components/headerInfo.vue')
	  },
	  {
	    path: '/home',
	    name: 'home',
	  	 component: () => import('../views/home.vue')
	  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
