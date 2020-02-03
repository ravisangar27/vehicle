<template>
	<tr>	
		<td>{{ +index + 1 }}</td>
		<td>
			<router-link class=""  :to="{ name: 'bike-show', params: { id: bike.id }}"> 
				{{ bike.model }} 
			</router-link>
		</td>
		<td>{{ bike.serial_no }}</td>
		<td>{{ bike.status }}</td>
		<td>
			<GmapMap class="locationMap"
				:center="setPosition(bike.location)"
				:zoom="10"
				map-type-id="terrain"
				style="width: 100%; height: 10vh;">
				<GmapMarker  :position="setPosition(bike.location)"/>
			</GmapMap>
		</td>
		<td>
			<router-link class=""  :to="{ name: 'bike-edit', params: { id: bike.id }}">
				<font-awesome-icon class="mr-3 cursor-pointer"  icon="edit" />
			</router-link>
			<font-awesome-icon class="mr-3 cursor-pointer" icon="trash-alt" @click="(showDeleteBikeModal(bike))" />
		</td>
		 <b-modal ref="bike-delete-modal" hide-footer title="Bike Delete">
			<div class="d-block text-center">
				<b-row>
					<b-col>
						<p class="text-danger">Do you want delete this
							{{ deleteBike.model}}
							{{ deleteBike.serial_no }} Bike
						</p>
						<button class="btn btn-danger mr-3" @click="(deleteBikeAction())"><font-awesome-icon class="mr-3 cursor-pointer" icon="trash-alt"/>Delete</button>
						<button class="btn btn-primary " @click="hideDeleteModal">
							<font-awesome-icon class="mr-3 cursor-pointer" icon="window-close"/>Cancel
						</button>
					</b-col>
				</b-row>
			</div>
    	</b-modal>
	</tr>
</template>

<script>

export default {
	props: [
		"bike",
		"index"
	],
	data() {
		return {
			deleteBike: []
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

		showDeleteBikeModal(bike) {

			this.deleteBike = bike;

			this.$refs['bike-delete-modal'].show();this.$refs['bike-delete-modal'].show();
    	},

		hideDeleteModal(){
			this.$refs['bike-delete-modal'].hide();
		}, 

		deleteBikeAction(){
			 window.axios.delete(`https://my-json-server.typicode.com/WAMaurice/rest-db-for-frontend/bikes/${this.deleteBike.id}`, {
				
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