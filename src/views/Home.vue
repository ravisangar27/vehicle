<template>
  <div class="card">
    <div class="card-header">
      <h4 class="text-info"> Vehicles overview </h4>
    </div>
    <div class="card-body">
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm">
            <b-card no-body class="mb-1">
              <b-card-header header-tag="header" class="p-1" role="tab">
                <b-button block href="#" v-b-toggle.status-filter variant="info">Filter</b-button>
              </b-card-header>
              <b-collapse id="status-filter"  accordion="status-filter" role="tabpanel">
                <b-card-body>
                  <div class="row">
                    <div class="col float-left">
                      <h4 class="text-danger">Vehicle Status</h4>
                      <ul class="list-group list-group-flush text-danger">
                        <li class="list-group-item pointer w-100" v-for="(status, index) in statuses" :key="index">
                          <label  class="cursor-point text-left float-left">
                            <input type="checkbox"
                                  class="form-check-input"
                                  :value="status"
                                  v-model="statusFilterValue">
                            {{ status }}
                          </label>
                        </li>
                      </ul>
                      <h4 class="text-success">Vehicle Type</h4>
                      <ul class="list-group list-group-flush text-success">
                        <li class="list-group-item pointer w-100" v-for="(vehicleType, index) in vehicleTypes" :key="index">
                          <label  class="cursor-point text-left float-left">
                            <input type="checkbox"
                                  class="form-check-input"
                                  :value="vehicleType"
                                  v-model="vehicleTypeFilterValue">
                            {{ vehicleType }}
                          </label>
                        </li>
                      </ul>
                    </div>
                    <div class="col">
                      <h4 class="text-primary">Vehicle Model</h4>
                      <ul class="list-group list-group-flush text-primary">
                        <li class="list-group-item pointer w-100" v-for="(model, index) in models" :key="index">
                          <label  class="cursor-point text-left float-left">
                            <input type="checkbox"
                                  class="form-check-input"
                                  :value="model"
                                  v-model="modelFilterValue">
                            {{ model }}
                          </label>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                </b-card-body>
              </b-collapse>
            </b-card>
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
                <div class="alert alert-info" role="alert">
                  if map is not fully load, please drag the map. it's will be working fine.
                </div>
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
    </div>
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
      setVehicleCore: [],
      windowHeight: '500px', 
      vehicle: [], 
      isMouseOver: false, 
      mouseOverMarkerIndex: '', 
      reCenter: {
        lat: 51.462074,
        lng: 6.75815
      }, 
      statuses: [
        'FREE',
        'MAINTENANCE',
        'RESERVED' 
      ],
      statusFilterValue: [],
      vehicleTypes: [
        'car',
        'bike'
        ],
      vehicleTypeFilterValue: [],
      models: [],
      modelFilterValue: [],

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

    statusFilterValue(){
      this.VehicleFilter();
    },

    vehicleTypeFilterValue(){
      this.VehicleFilter();
    }, 

    modelFilterValue(){
       this.VehicleFilter();
    }
  },

  mounted() {    
    this.fetch();
    this.statusFilterValue = this.statuses;
    this.vehicleTypeFilterValue = this.vehicleTypes;
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

      let setVehicles = [];
      
      const statusClass = {
            FREE: 'text-success',
            MAINTENANCE : 'text-warning',
            RESERVED : 'text-danger'
      };
      let models = [];
    
      for (const property in this.vehicles) {
        this.vehicles[property].forEach(function(el) {

          const vehicle = Object.assign({}, el);
          const vehicleType = (property == 'cars')? 'car' : 'bike';
          vehicle.vehicleType = vehicleType;
          vehicle.statusClass = statusClass[vehicle.status];
          vehicle.location.lat = vehicle.location.latitude; 
          vehicle.location.lng = vehicle.location.longitude;
           
          if(!(models.includes(vehicle.model))){
              models.push(vehicle.model);
          }

          setVehicles.push(vehicle);
          return vehicle;
        }); 
         
      }
        
      this.modelFilterValue = models;
      this.models = models;  
      this.setVehicles = setVehicles;
      this.setVehicleCore = setVehicles;
      
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
    }, 

    VehicleFilter() { 

      const setVehicleCore = this.setVehicleCore;

      if(setVehicleCore.length > 0){
        this.setVehicles = setVehicleCore.filter(vehicle => {
          return this.statusFilterValue.includes(vehicle.status);
        }); 
      }

      if(setVehicleCore.length > 0){
        this.setVehicles = setVehicleCore.filter(vehicle => {
          return this.vehicleTypeFilterValue.includes(vehicle.vehicleType);
        }); 
      }

      if(setVehicleCore.length > 0){
        this.setVehicles = setVehicleCore.filter(vehicle => {
          return this.modelFilterValue.includes(vehicle.model);
        }); 
      }             
    },
  }
}

</script>
