<template>
	<div class="card">
        <div class="card-header">
            <div class="float-left">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="/admin/car">Bike</a></li>   
                        <li class="breadcrumb-item active" aria-current="page">Car show</li>
                    </ol>
                </nav>
            </div>
            <div class="float-right">
          
            </div>
        </div>
        <div class="card-body">
            <b-row v-if="car.location">
                <b-col>
                    <table class="table text-left">
                    <tbody>
                        <tr>
                            <td>Brand</td>
                            <td>{{car.brand}}</td>
                        </tr>
                        <tr>
                            <td>Last Tuv</td>
                            <td> {{ car.last_tuv | moment("YYYY-MM-DD") }}</td>
                        </tr>
                        <tr>
                            <td>Model</td>
                            <td>{{car.model}}</td>
                        </tr>
                        <tr>
                            <td>Status</td>
                            <td>{{car.status}}</td>
                        </tr>
                    </tbody>
                    </table>
                </b-col>
                <b-col cols="8">
                    <GmapMap class="locationMap"
                    :center="setPosition(car.location)"
                    :zoom="10"
                    map-type-id="terrain"
                    style="width: 100%; height: 50vh;">
                        <GmapMarker  
                        :position="setPosition(car.location)"/>
                    </GmapMap>
                </b-col>
            </b-row>
        </div>
    </div>
</template>

<script>

export default {
	
	data() {
		return {
			 id: this.$route.params.id,
		};
	},

	computed: {
         car() {
            return this.$store.state.car.car;
        },
	},

	watch : {
	
	},

	mounted() {    
         this.fetchById();
	}, 

	methods:{

         fetchById(){

            let loader = this.$loading.show({
                canCancel: true,      
            });

            this.$store.dispatch("car/fetchById", {
                    id: this.id,
                    loader:loader
            });
        },
	
		setPosition(location){

            var position = {};
            
            if(location){
                position.lat = location.latitude; 
			    position.lng = location.longitude;
            }

			return position; 
		},

	}
}

</script>