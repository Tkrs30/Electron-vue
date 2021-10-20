import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/components/LandingPage').default
    },
    {
      path: '/page1',
      name: 'welcome-page-1',
      component: require('@/components/Page1Page').default
    },
    {
      path: '/page2',
      name: 'welcome-page-2',
      component: require('@/components/Page2Page').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
