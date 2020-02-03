<template>
  <div class="biked">
    <div class="biked-header">
      <div class="float-left">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item active" aria-current="page">Bike Detail</li>
          </ol>
        </nav>
      </div>
      <div class="float-right"> 
        <router-link class="btn btn-primary" to="/admin/bike/create"> Create </router-link>
      </div>
    </div>
    <div class="biked-body">
      <table class="table table-striped table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Model</th>
            <th scope="col">Serial no</th>
            <th scope="col">Status</th>
            <th scope="col">Location</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <BikeDetail :key="index"
                v-for="(bike, index) in bikes" 
                :bike="bike"
                :index="index">
          </BikeDetail>
        </tbody>
      </table>
    </div>
  </div>
       
</template>

<script>

import BikeDetail from "./Detail.vue";

export default {

  components: { BikeDetail },

  data() {
    return {
      
    };
  },

  computed: {
    bikes() {
      return this.$store.state.bike.bikes;
    },
  },

  watch : {
    bikes(){
      console.log(this.bikes);
      
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
        this.$store.dispatch('bike/fetch', {
          loader: loader
        });
    },
  }
}

</script>