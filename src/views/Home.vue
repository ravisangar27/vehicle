<template>
  <div class="container-fluid mt-5">
     <div class="row">
      <div class="col-sm">
        <div class="card">
          <div class="card-header">
            Vehicle List
          </div>
          <ul class="list-group list-group-flush">
            <VehicleListView 
              :key="index"
              v-for="(vehicle, index) in setVehicles" 
              :vehicle="vehicle"
              :index="index"
              @vehicleMouseEnter='vehicleMouseEnter'
              @vehicleMouseLeave='vehicleMouseLeave'
              @showVehicleModal='showVehicleModal'
              @reserveUpdate = 'reserveUpdate'>
            </VehicleListView>
          </ul>
        </div>
      </div>
      <div class="col-sm-8">
        <GmapMap
        :center="center"
        :zoom="6"
        map-type-id="terrain"
        style="width: 100%; height: 75vh;">
          <GmapMarker  :key="index"
            v-for="(vehicle, index) in setVehicles"
            :position="vehicle.location"
            :clickable="true"
            :draggable="true"
            @click="(showVehicleModal(vehicle))">
              <gmap-info-window :key="index" :opened="true" :options="setInfoOption(vehicle, index)">
              </gmap-info-window>
            </GmapMarker> 
        </GmapMap>
      </div>
    </div>
    <b-modal size="xl" ref="vehicle-modal" hide-footer title="Vehicle Detail" @shown="refreshMap">
      <div class="d-block text-center">
        <b-row>
          <b-col>
            <table class="table text-left">
              <tbody>
                <tr>
                  <td>Vehicle Type</td>
                  <td>{{vehicle.vehicleType}}</td>
                </tr>
                <tr>
                  <td>Model</td>
                  <td>{{vehicle.model}}</td>
                </tr>
                <tr v-if="vehicle.vehicleType == 'bike'">
                  <td>Serial No</td>
                  <td>{{vehicle.serial_no}}</td>
                </tr>
                <tr v-if="vehicle.vehicleType == 'car'">
                  <td>Brand</td>
                  <td>{{vehicle.brand}}</td>
                </tr>
                 <tr v-if="vehicle.vehicleType == 'car'">
                  <td>Last Tuv</td>
                  <td> {{ vehicle.last_tuv | moment("YYYY-MM-DD") }}</td>
                </tr>
                <tr>
                  <td>Status</td>
                  <td>{{vehicle.status}}</td>
                </tr>
              </tbody>
            </table>
          </b-col>
          <b-col cols="8">
            <GmapMap class="locationMap"
              :center="vehicle.location"
              :zoom="10"
              map-type-id="terrain"
              style="width: 100%; height: 50vh;">
                <GmapMarker  
                  :position="vehicle.location"/>
            </GmapMap>
          </b-col>
        </b-row>
      </div>
      <b-button class="mt-3" variant="outline-danger" block @click="hideVehicleModal">Close Me</b-button>
    </b-modal>
  </div>
</template>

<script>


import VehicleListView from "../components/VehicleListView.vue";

export default {

  components: { VehicleListView },

  data() {
    return {
      center: {
        lat: 51.462074,
        lng: 6.75815
      },
      setVehicles: [], 
      windowHeight: '500px', 
      vehicle: [], 
      isMouseOver: false, 
      mouseOverMarkerIndex: '', 
      reCenter: {
        lat: 51.462074,
        lng: 6.75815
      }

    };
  },

  computed: {
    vehicles() {
      return this.$store.state.vehicle.vehicles;
    },
  },

  watch : {
    vehicles(){
      this.mergeVehicle();
    },
  },

  mounted() {    
    this.fetch();
  }, 

  methods:{

    fetch(){

      let loader = this.$loading.show({
        canCancel: true,     
      });

      this.$store.dispatch('vehicle/fetch', {
        loader: loader
      }).then(() => {});    
    },

    mergeVehicle(){

        let setVehicles = {};
        let i = 0;
        const statusClass = {
              FREE: 'text-success',
              MAINTENANCE : 'text-warning',
              RESERVED : 'text-danger'
        };
        
        for (const property in this.vehicles) {
         
          this.vehicles[property].forEach(function(el) {

            const vehicle = Object.assign({}, el);
            const vehicleType = (property == 'cars')? 'car' : 'bike';
            vehicle.vehicleType = vehicleType;
            vehicle.statusClass = statusClass[vehicle.status];
            vehicle.location.lat = vehicle.location.latitude; 
            vehicle.location.lng = vehicle.location.longitude;

            setVehicles[i] = vehicle;

            i++;

            return vehicle;
          }); 
         
        }
      
      this.setVehicles = setVehicles;
      
    },

    setInfoOption(vehicle, index){

      let infoOptions = {};

      infoOptions.content = '<h5 class="text-info">'+(+index + 1)+'&nbsp;<span class="'+vehicle.statusClass+'">'+vehicle.status+'</span</h5>'
                            +'<p class="text-info">'+vehicle.model
                            +'<span> &nbsp;'+vehicle.vehicleType+'</p>';

      return infoOptions;
    }, 

    showVehicleModal(vehicle) {

      this.vehicle = vehicle;

      setTimeout(function(){ 
    
        this.$gmapDefaultResizeBus.$emit('resize') 

      }.bind(this), 1500);

      this.$refs['vehicle-modal'].show();

      setTimeout(function(){

        this.$gmapDefaultResizeBus.$emit('resize')

      }.bind(this), 1000);
      
      this.$gmapDefaultResizeBus.$emit('resize')

    },
    hideVehicleModal() {
        this.$refs['vehicle-modal'].hide()
    }, 
    vehicleMouseEnter(){
      
    
    },

    vehicleMouseLeave(){

     
    },

    refreshMap(){

      setTimeout(function(){ 

        this.$gmapDefaultResizeBus.$emit('resize') 
      }.bind(this), 2000);

      setTimeout(function(){ 

        this.$gmapDefaultResizeBus.$emit('resize') 
      }.bind(this), 5000);

    },

    reserveUpdate(index){

      this.setVehicles[index].status = "RESERVED";
    } 
  }
}

</script>
