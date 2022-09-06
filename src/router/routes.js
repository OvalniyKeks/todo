
const routes = [
  {
    name: 'Main', path: '/', component: () => import('../page/Main.vue')
  },
  {
    name: 'ActionTask', path: '/task/:type?/:id?', component: () => import('../page/ActionTask.vue')
  },


  // Always leave this as last one,
  // but you can also remove it
  // {
  //   path: '*',
  //   component: () => import('pages/Error404.vue')
  // }
]

export default routes
