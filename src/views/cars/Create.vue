<template>
 
    <div class="card">

        <div class="card-header">
            <div class="float-left">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="/admin/car">Car</a></li>   
                        <li class="breadcrumb-item active" aria-current="page">Car Create</li>
                    </ol>
                </nav>
            </div>
            <div class="float-right">
          
            </div>
        </div>
        <div class="card-body">
            <ErrorView :errors="errors"></ErrorView>
            <SuccessView :success="success"></SuccessView>
            <form   @submit="carValidation"
                    method="post" 
                    class="text-left">
                <div class="form-group">
                    <label for="brand">Brand</label>
                    <input type="text" v-model="brand" class="form-control" id="brand" aria-describedby="brand" placeholder="Enter brand">
                </div>
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
                    <label for="lastTuv">Last Tuv</label>
                     <datepicker format="yyyy/MM/dd" :input-class="['form-control']" v-model="lastTuv"></datepicker>
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




import Datepicker from 'vuejs-datepicker';

export default {
	components: { Datepicker},
	data() {
        return {
        brand: "",
        model: "",
        status: "",
        lastTuv: "",
        latitude: "",
        longitude: "",
        errors: [],
        success: ''
        };
	},

	methods:{
        carValidation(e){
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

            if (this.brand === '') {
                this.errors.push('Brand is required.');
                 isError = true;
            }

            if (this.lastTuv === '') {
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
                this.addCar();
            }
        },

        addCar(){
        
        let loader = this.$loading.show({
            canCancel: true,      
        });

        this.success = '';

        window.axios.post("https://my-json-server.typicode.com/WAMaurice/rest-db-for-frontend/cars", {
            brand: this.brand,
            model: this.model,
            status: this.status,
            last_tuv: this.lastTuv,
            latitude: this.latitude,
            longitude: this.longitude,
        }).then(({ data }) => {
            console.log(data);
            loader.hide();
            this.success = "You have successfully created";
        }).catch(error  => {
            
            this.errors =error;
        });
        },    

 	}
}

</script>