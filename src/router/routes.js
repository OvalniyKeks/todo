
const routes = [
  {
    name: 'Main', path: '/', component: () => import('../page/Main.vue')
  },
  {
    name: 'ActionTask', path: '/task/:type?/:id?', component: () => import('../page/ActionTask.vue')
  }
]

export default routes
