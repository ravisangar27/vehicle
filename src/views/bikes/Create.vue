<template>
    <div class="card">
        <div class="card-header">
            <div class="float-left">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="/admin/bike">Bike</a></li>   
                        <li class="breadcrumb-item active" aria-current="page">Bike Create</li>
                    </ol>
                </nav>
            </div>
            <div class="float-right">
          
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
	components: { ErrorView},
	data() {
        return {
            model: "",
            status: "",
            serialNo: "",
            latitude: "",
            longitude: "",
            errors: [],
            success: ""
        };
	},

	methods:{
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
                this.addBike();
            }
        },

        addBike(){
        
            let loader = this.$loading.show({
                canCancel: true,      
            });

            this.success = '';
        
            window.axios.post("https://my-json-server.typicode.com/WAMaurice/rest-db-for-frontend/bikes", {
                model: this.model,
                status: this.status,
                serial_no: this.serialNo,
                latitude: this.latitude,
                longitude: this.longitude,
            }).then(({ data }) => {
                console.log(data);
                 this.success = "You have successfully created";
                loader.hide();
            }).catch(error  => {
                 loader.hide();
                this.errors = error;
            });
        },    

 	}
}

</script>