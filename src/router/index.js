import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Add from '../views/Template/Add.vue'
import Create from '../views/Template/Create.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/template/add',
    name: 'Add',
    component: Add
  },
  {
    path: '/template/create',
    name: 'Create',
    component: Create
  }
]

const router = new VueRouter({
  routes
})

export default router
