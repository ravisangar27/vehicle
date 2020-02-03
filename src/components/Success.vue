<template>
    <div>
        <div v-if="successLocal" class="alert alert-success text-left">
            <div class="container-fluid">
                <h5>{{ successLocal }}</h5>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: [
            "success",
        ],
        data(){
            return {
                successLocal:''
            };
        },
     watch : {
        success(){
            this.successLocal = this.success;
             setTimeout(() => {
                  this.successLocal = '';
            },5000);
        }
     } 
    }
</script>