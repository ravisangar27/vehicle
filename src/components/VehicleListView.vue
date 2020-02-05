<template>  
    <li class="list-group-item pointer w-100">
          
        <p  class="text-info text-capitalize float-left" 
            @mouseenter="mouseEnter(vehicle, index)" 
            @mouseleave="mouseLeave()"  
            @click="showVehicleModal(vehicle)">
            {{ +index + 1 }}
             <span v-bind:class="[vehicle.statusClass]">{{ vehicle.status }}</span>
            {{ vehicle.model}}
            {{  vehicle.vehicleType}} 
            {{ vehicle.brand }} 
            {{ vehicle.serial_no }}
        </p>
        <button class="btn btn-primary float-right" v-if="vehicle.status == 'FREE'" @click="reserveModalOpen">Reserve</button>
        <b-modal size="xl" ref="reserve-modal" hide-footer title="Vehicle Detail">
            <div class="d-block text-center">
                <loading :can-cancel="true" :active.sync="isLoading" ></loading>   
                <ErrorView :errors="errors"></ErrorView>
                <SuccessView :success="success"></SuccessView>
                <form   @submit="reserveValidation"
                    method="post" 
                    class="text-left">
                    <div class="form-row text-left">
                        <div class="col-md-6 mt-3">
                             <label for="firstName">First Name </label>
                            <input type="text" class="form-control" v-model="firstName" placeholder="First name">
                        </div>
                        <div class="col-md-6 mt-3">
                             <label for="lastName">Last Name *</label>
                            <input type="text" class="form-control" v-model="lastName" placeholder="Last name">
                        </div>
                        <div class="form-group col-md-6 mt-3">
                            <label for="phone">Phone *</label>
                            <input type="text" class="form-control" v-model="phone"  placeholder="00491235896">
                        </div>
                        <div class="form-group col-md-6 mt-3">
                            <label for="mobile">Mobile</label>
                            <input type="text" class="form-control" v-model="mobile" placeholder="0049152144555">
                        </div>
                        <div class="form-group col-md-6 mt-3">
                            <label for="email">Email *</label>
                            <input type="email" class="form-control" v-model="email">
                        </div>
                        <div class="form-group col-md-6 mt-3">
                            <label for="address1">Address</label>
                            <input type="text" class="form-control" v-model="address1" placeholder="1234 Main St">
                        </div>
                        <div class="form-group col-md-6 mt-3">
                            <label for="address2">Address 2</label>
                            <input type="text" class="form-control" v-model="address2" placeholder="Apartment, studio, or floor">
                        </div>
                        <div class="form-group col-md-6 mt-3">
                            <label for="city">City</label>
                            <input type="text" class="form-control" v-model="city">
                        </div>
                        <div class="form-group col-md-6 mt-3">
                            <label for="zipCode">Zip Code</label>
                            <input type="text" class="form-control" v-model="zipCode">
                        </div>
                        <div class="form-group col-md-6 mt-3">
                            <label for="country">Country</label>
                            <v-select  :options='countries'></v-select>
                        </div>
                    </div>
                    <div class="my-3 float-none">
                        <button type="submit" class="btn btn-primary mr-3">
                            Reserve
                        </button>
                        <button class="btn btn-danger" @click="hideReserveModal">
                            <font-awesome-icon class="mr-3 cursor-pointer" icon="window-close"/> Cancel
                        </button>
                    </div>
                </form>
            </div>
        </b-modal>
    </li>
</template>

<script>

import countries from '../assets/js/variousCountryListFormats.js';
import ErrorView from "../components/Error.vue";
import Loading from 'vue-loading-overlay'

export default {
    props: [
        "vehicle",
        "index"
    ],
    components: { ErrorView, Loading },
    data(){
        return {
            firstName: "",
            lastName: "",
            phone: "",
            mobile: "",
            email: "",
            address1: "",
            address2: "",
            city: "",
            zipCode:"",
            country: "",
            countries:countries, 
            errors: [],
            isLoading: false,
            fullPage: true,
            success: ""
        };
    },
    methods: {
        mouseEnter(vehicle, index){
           
            const datas = {
                vehicle: vehicle,
                index: index
            };

            this.$emit("vehicleMouseEnter", datas);
        },

        mouseLeave(){

            this.$emit("vehicleMouseLeave");
        },

        showVehicleModal(vehicle){

            this.$emit("showVehicleModal", vehicle);
        },

        reserveModalOpen(){
            this.$refs['reserve-modal'].show();
        },

        hideReserveModal(){
            this.$refs['reserve-modal'].hide();
        },

        reserveValidation(e){
            e.preventDefault();
            
            this.errors = [];

            let isError = false;

            if (this.lastName === '') {
                this.errors.push('Last name is required.');
                isError = true;
            }

            if (this.phone === '') {
                this.errors.push('Phone is required.');
                isError = true;
            }

            if (this.email === '') {
                this.errors.push('Email is required.');
                isError = true;
            }
           
            if(isError){
                return 0;
            } else 
            {
                this.ReserveAction();
            }
        },

        ReserveAction(){

            let url = "";

            if(this.vehicle == "car"){
                
                url = `https://my-json-server.typicode.com/WAMaurice/rest-db-for-frontend/cars/${this.vehicle .id}`;
            } else {
                
                url = `https://my-json-server.typicode.com/WAMaurice/rest-db-for-frontend/bikes/${this.vehicle .id}`;
            }

            this.isLoading = true;
            this.success = '';

            window.axios.patch(url, {
                status: "RESERVED",
                first_name: this.firstName,
                last_name: this.lastName,
                phone: this.phone,
                mobile: this.mobile,
                email: this.email,
                address1: this.address1,
                address2: this.address2,
                city: this.city,
                zip_code:this.zipCode,
                country: this.country,
            }).then(() => {
                
              
                this.isLoading = false;
                this.success = "You have successfully reserved";
                this.$emit("reserveUpdate", this.index);
                
            }).catch(error  => {
                this.isLoading = false;
                this.errors = error;
            });
        },
         
    }, 
}

import 'vue-select/dist/vue-select.css';

</script>
<style>
   
    .pointer{ cursor: pointer; }
</style>