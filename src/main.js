import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import './plugins/bootstrap-vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import ErrorView from './components/Error.vue'
import SuccessView from './components/Success.vue'
import router from './router'
import store from './store'
import vSelect from 'vue-select'
import loading from 'vue-loading-overlay'
import VueMoment from 'vue-moment'

// fontawesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCar } from '@fortawesome/free-solid-svg-icons'
import { faMotorcycle } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { faWindowClose} from '@fortawesome/free-solid-svg-icons'

library.add(faUserSecret);
library.add(faCar);
library.add(faMotorcycle);
library.add(faEdit);
library.add(faTrashAlt);
library.add(faWindowClose);

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('v-select', vSelect)
Vue.component('ErrorView', ErrorView)
Vue.component('SuccessView', SuccessView)

Vue.config.productionTip = false

window.axios = require('axios');

Vue.use(VueMoment);
Vue.use(loading);
 
window.loadingVue = loading;
window.moment = require('moment');

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCV3rsTAn8aQZ_uNN56mzfA2M_6tSU6Q6s',
    libraries: 'places', // This is required if you use the Autocomplete plugin
   
  },

  installComponents: true
});

 new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')






