import Vue from 'vue'
import Vuex from 'vuex'

import vehicleActions from './vehicle/actions';
import vehicleMutations from './vehicle/mutations';
import vehicleState from './vehicle/state';

import CarActions from './Car/actions';
import CarMutations from './Car/mutations';
import CarState from './Car/state';

import BikeActions from './Bike/actions';
import BikeMutations from './Bike/mutations';
import BikeState from './Bike/state';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {

    vehicle: {
      namespaced: true,
      state: vehicleState,
      actions: vehicleActions, 
      mutations: vehicleMutations 
    },

    car: {
      namespaced: true,
      state: CarState,
      actions: CarActions, 
      mutations: CarMutations 
    },

    bike: {
      namespaced: true,
      state: BikeState,
      actions: BikeActions, 
      mutations: BikeMutations 
    },

  }
})
