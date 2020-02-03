<template>
	<tr>	
		<td>{{ +index + 1 }}</td>
		<td><router-link :to="{ name: 'car-show', params: { id: car.id }}"> {{ car.model }} </router-link> </td>
		<td>{{ car.brand }}</td>
		<td>{{ car.last_tuv }}</td>
		<td>{{ car.status }}</td>
		<td>
			<GmapMap class="locationMap"
				:center="setPosition(car.location)"
				:zoom="10"
				map-type-id="terrain"
				style="width: 100%; height: 10vh;">
				<GmapMarker  :position="setPosition(car.location)"/>
			</GmapMap>
		</td>
		<td>
			<router-link class=""  :to="{ name: 'car-edit', params: { id: car.id }}">
				<font-awesome-icon class="mr-3 cursor-pointer"  icon="edit" />
			</router-link>
			<font-awesome-icon class="mr-3 cursor-pointer" icon="trash-alt" @click="(showDeleteCarModal(car))" />
		</td>
		 <b-modal ref="car-delete-modal" hide-footer title="Car Delete">
			<div class="d-block text-center">
				<b-row>
					<b-col>
						<p class="text-danger">Do you want delete this
							{{ deleteCar.model}}
							{{ deleteCar.brand }} Car
						</p>

						<button class="btn btn-danger mr-3" @click="(deleteCarAction())"><font-awesome-icon class="mr-3 cursor-pointer" icon="trash-alt"/>Delete</button>
						<button class="btn btn-primary " @click="hideDeleteModal">Cancel</button>
					</b-col>
				</b-row>
			</div>
    	</b-modal>
	</tr>
</template>

<script>

export default {
	props: [
		"car",
		"index"
	],
	data() {
		return {
			deleteCar: []
		};
	},

	computed: {
	
	},

	watch : {
	
	},

	mounted() {    
	
	}, 

	methods:{
	
		setPosition(location){

			let position = {};

			position.lat = location.latitude; 
			position.lng = location.longitude;
				
			return position; 
		},

		showDeleteCarModal(car) {

			this.deleteCar = car;

			this.$refs['car-delete-modal'].show();this.$refs['car-delete-modal'].show();
    	},

		hideDeleteModal(){
			this.$refs['car-delete-modal'].hide();
		}, 

		deleteCarAction(){
			 window.axios.delete(`https://my-json-server.typicode.com/WAMaurice/rest-db-for-frontend/cars/${this.deleteCar.id}`, {
				
			}).then(({ data }) => {
				console.log(data);
				
			}).catch(error  => {
				
				if(error.response){
					console.log(error.response);
				}
			});
		}

	}
}

</script>