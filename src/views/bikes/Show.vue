<template>
	<div class="card">
        <div class="card-header">
            <div class="float-left">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="/admin/bike">Bike</a></li>   
                        <li class="breadcrumb-item active" aria-current="page">Bike show</li>
                    </ol>
                </nav>
            </div>
            <div class="float-right">
          
            </div>
        </div>
        <div class="card-body">
            <b-row v-if="bike.location">
                <b-col>
                    <table class="table text-left">
                    <tbody>
                        <tr>
                            <td>Model</td>
                            <td>{{bike.model}}</td>
                        </tr>
                        <tr>
                            <td>Serial No</td>
                            <td>{{bike.serial_no}}</td>
                        </tr>
                        <tr>
                            <td>Status</td>
                            <td>{{bike.status}}</td>
                        </tr>
                    </tbody>
                    </table>
                </b-col>
                <b-col cols="8">
                    <GmapMap class="locationMap"
                    :center="setPosition(bike.location)"
                    :zoom="10"
                    map-type-id="terrain"
                    style="width: 100%; height: 50vh;">
                        <GmapMarker  
                        :position="setPosition(bike.location)"/>
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
         bike() {
            return this.$store.state.bike.bike;
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
            this.$store.dispatch("bike/fetchById", {
                id: this.id, 
                loader: loader
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