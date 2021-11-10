import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import VueChartJS from '@/views/VueChartJS'

// Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/create',
    name: 'create',
    component: () => import('../components/CreateComponent')
  },
  {
    path: '/view',
    name: 'view',
    component: () => import('../components/ListComponent')
  },
  {
    path: '/edit/:id',
    name: 'edit',
    component: () => import('../components/EditComponent')
  },
  {
    path: '/grades/:id',
    name: 'grades',
    component: () => import('../components/GradeComponent')
  },
  {
    path: '/editGrade/:id',
    name: 'editGrade',
    component: () => import('../components/EditGradeComponent')
  },
  {
    path: '/addGrade/:id',
    name: 'addGrade',
    component: () => import('../components/AddGradeComponent')
  },
  {
    path: '/chartjs',
    name: 'VueChartJS',
    component: VueChartJS
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

// Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes // short for `routes: routes`
})

export default router
