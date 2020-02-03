<template>
  <div id="app">
    <router-view name="side-menu"></router-view>
    <router-view></router-view>
  </div>
</template>
<script>

export default {


  data() {

    return {
    };

    }
 
}
import 'vue-loading-overlay/dist/vue-loading.css';
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.cursor-pointer{
  cursor: pointer;
}
</style>
