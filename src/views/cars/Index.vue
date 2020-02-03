<template>
  <div class="card">
    <div class="card-header">
      <div class="float-left">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item active" aria-current="page">Car Detail</li>
          </ol>
        </nav>
      </div>
      <div class="float-right"> 
        <router-link class="btn btn-primary" to="/admin/car/create"> Create </router-link>
      </div>
    </div>
    <div class="card-body">
      <table class="table table-striped table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Model</th>
            <th scope="col">Brand</th>
            <th scope="col">Last Tuv</th>
            <th scope="col">Status</th>
            <th scope="col">Location</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <CarDetail :key="index"
                v-for="(car, index) in cars" 
                :car="car"
                :index="index">
          </CarDetail>
        </tbody>
      </table>
    </div>
  </div>
       
</template>

<script>

import CarDetail from "./Detail.vue";

export default {

  components: { CarDetail },

  data() {
    return {
      
    };
  },

  computed: {
    cars() {
      return this.$store.state.car.cars;
    },
  },

  watch : {
    cars(){
      console.log(this.cars);
      
      //this.mergeVehicle();
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
        this.$store.dispatch('car/fetch', {
          loader:loader
        });
    },

   
  
    // setPosition(location){
     
    //   var position = {}

    //   position.lat = location.latitude; 
    //   position.lng = location.longitude;
           
    //   return position;
    // },

    // setInfoOption(vehicle, index){

    //   var  infoOptions = {};

    //   infoOptions.content = '<h5 class="text-info">'+(+index + 1)+'&nbsp;<span class="'+vehicle.statusClass+'">'+vehicle.status+'</span</h5>'
    //                         +'<p class="text-info">'+vehicle.model
    //                         +'<span> &nbsp;'+vehicle.vehicleType+'</p>';

    //   return infoOptions;
    // }, 

    
  }
}

</script>