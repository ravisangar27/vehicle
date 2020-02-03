<template>
 
    <div class="card">

        <div class="card-header">
            <div class="float-left">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="/admin/car">Car</a></li>   
                        <li class="breadcrumb-item active" aria-current="page">
                            {{ car.model}} {{ car.brand }} Car Edit
                        </li>
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
                    method="patch" 
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

import ErrorView from "../../components/Error.vue";
import Datepicker from 'vuejs-datepicker';

export default {

	components: { ErrorView, Datepicker },

	data() {
        return {
            brand: "",
            model: "",
            status: "",
            lastTuv: window.moment().format('YYYY/MM/DD'),
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
         car() {
            return this.$store.state.car.car;
        },
	},

	watch : {
        car(){
            console.log(this.car);
            this.brand = this.car.brand;
            this.model = this.car.model;
            this.status = this.car.status; 
            this.lastTuv = this.car.last_tuv;
            this.latitude = this.car.location.latitude;
            this.longitude = this.car.location.longitude;
            console.log(window.moment(this.car.last_tuv).format('DD/MM/YYYY'));
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

            this.$store.dispatch("car/fetchById", {
                    id: this.id,
                    loader: loader
                }).then(() => {
                   
            });
        },
       
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
                this.updateCar();
            }
        },

        updateCar(){
        
        let loader = this.$loading.show({
                canCancel: true,      
        });

        this.success = '';

        window.axios.patch(`https://my-json-server.typicode.com/WAMaurice/rest-db-for-frontend/cars/${this.id}`, {
            brand: this.brand,
            model: this.model,
            status: this.status,
            last_tuv: this.lastTuv,
            latitude: this.latitude,
            longitude: this.longitude,
        }).then(({ data }) => {
            console.log(data);
             this.success = "You have successfully updated";
            loader.hide();
            
        }).catch(error  => {
            this.errors = error;
        });
        },    

 	}
}

</script>