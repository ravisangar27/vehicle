<template>
    <div>
        <div v-if="errors.length" class="alert alert-danger text-left">
            <div class="container-fluid">
                <ul>
                    <li  v-for="(error, index) in errors" :key="index">
                        {{ error }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: [
            "errors",
        ],
    }
</script>