<template>
 
    <div class="card">
        <div class="card-header">
            <div class="float-left">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="/admin/bike">Bike</a></li>   
                        <li class="breadcrumb-item active" aria-current="page">
                           
                        </li>
                    </ol>
                </nav>
            </div>
        </div>
        <div class="card-body">
            <ErrorView :errors="errors"></ErrorView>
            <SuccessView :success="success"></SuccessView>
            <form   @submit="bikeValidation"
                    method="post" 
                    class="text-left">
                <div class="form-group">
                    <label for="model">Model</label>
                    <input type="text" v-model="model" class="form-control" id="model" aria-describedby="model" placeholder="Enter model">
                </div>
                <div class="form-group">
                    <label for="status">Status</label>
                    <select class="form-control" id="status" v-model="status">
                        <option value="FREE">FREE</option>
                        <option value="MAINTENANCE">MAINTENANCE</option>
                        <option value="RESERVED">RESERVED</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="serialNo">Serial No</label>
                    
                    <input type="text" v-model="serialNo" class="form-control" id="serialNo" aria-describedby="serialNo" placeholder="Enter serial no">
                </div>
                <div class="form-group">
                  <div class="row">
                    <div class="col">
                        <label for="latitude">latitude</label>
                        <input type="text" class="form-control" id="latitude" aria-describedby="latitude" placeholder="Enter latitude" v-model="latitude">
                    </div>
                    <div class="col">
                        <label for="longitude">longitude</label>
                        <input type="text" class="form-control" id="longitude" aria-describedby="longitude" placeholder="Enter longitude" v-model="longitude">
                    </div>
                  </div>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    </div>
</template>


<script>

import ErrorView from "../../components/Error.vue";


export default {

	components: { ErrorView },

	data() {
        return {
            model: "",
            status: "",
            serialNo: window.moment().format('YYYY/MM/DD'),
            latitude: "",
            longitude: "",
            errors: [],
            id: this.$route.params.id,
            selectedDate: '', 
            formats: {
                title: 'MMMM YYYY',
                weekdays: 'W',
                navMonths: 'MMM',
                input: ['L', 'YYYY-MM-DD', 'YYYY/MM/DD'],
                dayPopover: 'L',
                data: ['L', 'YYYY-MM-DD', 'YYYY/MM/DD']
            },
            success: ""
        };
	},

	computed: {
         bike() {
            return this.$store.state.bike.bike;
        },
	},

	watch : {
        bike(){
            this.model = this.bike.model;
            this.status = this.bike.status; 
            this.serialNo = this.bike.serial_no;
            this.latitude = this.bike.location.latitude;
            this.longitude = this.bike.location.longitude;
        }
            
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
                    loader:loader
                }).then(() => {
                    
            });
        },
       
        bikeValidation(e){
            e.preventDefault();

            this.errors = [];

            let isError = false;

            if (this.model === '') {
                this.errors.push('Model is required.');
                isError = true;
            }

            if (this.status === '') {
                this.errors.push('Status is required.');
                 isError = true;
            }

            if (this.serialNo === '') {
                this.errors.push('Last Tuv is required.');
                 isError = true;
            }

            if(isNaN(this.latitude)){
                this.errors.push("latitude is not a number");
                isError = true;
            }

            if(isError){
                return 0;
            } else 
            {
                this.updateBike();
            }
        },

        updateBike(){
        
        // $('button').prop('disabled', true);
        
            let loader = this.$loading.show({
                canCancel: true,      
            });

            this.success = '';
        
            window.axios.patch(`https://my-json-server.typicode.com/WAMaurice/rest-db-for-frontend/bikes/${this.id}`, {
                model: this.model,
                status: this.status,
                serial_no: this.serialNo,
                latitude: this.latitude,
                longitude: this.longitude,
            }).then(() => {
                
                this.success = "You have successfully updated";
                loader.hide();
                
            }).catch(error  => {
                
                loader.hide();
                this.errors = error;
            });
        },    

 	}
}

</script>