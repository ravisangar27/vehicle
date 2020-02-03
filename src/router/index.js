import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Admin from '../views/Admin.vue'

import SideMenu from '../components/SideMenu.vue'

import Car from '../views/cars/Car.vue'
import CarIndex from '../views/cars/Index.vue'
import CarCreate from '../views/cars/Create.vue'
import CarEdit from '../views/cars/Edit.vue'
import CarShow from '../views/cars/Show.vue'

import Bike from '../views/bikes/Bike.vue'
import BikeIndex from '../views/bikes/Index.vue'
import BikeCreate from '../views/bikes/Create.vue'
import BikeEdit from '../views/bikes/Edit.vue'
import BikeShow from '../views/bikes/Show.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    components: {
      default: Home
    }
  },
  {
    path: '/admin',
    name: 'admin',
    components: {
      default: Admin, 
      'side-menu': SideMenu
  },
    children:[
    {
      path: 'car',
      name: 'car',
      component: Car,
      children:[
        { path: '', name: 'car-index', component: CarIndex}, 
        { path: 'create', name: 'car-create', component: CarCreate}, 
        { path: 'edit/:id', name: 'car-edit', component: CarEdit},
        { path: 'show/:id', name: 'car-show', component: CarShow}
      ]
    },
    {
      path: 'bike',
      name: 'bike',
      component: Bike,
      children:[
        { path: '', name: 'bike-index', component: BikeIndex}, 
        { path: 'create', name: 'bike-create', component: BikeCreate}, 
        { path: 'edit/:id', name: 'bike-edit', component: BikeEdit},
        { path: 'show/:id', name: 'bike-show', component: BikeShow}
      ]
    }
    ]
  },
 ]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
