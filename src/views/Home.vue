<template>
  <div class="home d-flex justify-center">
    <v-btn to="/template/create">Maak Factuur</v-btn>
    <v-btn to="/template/add">Voeg template toe</v-btn>
  </div>
</template>

<script>
// @ is an alias to /src
import { EventBus } from "../../event-bus"
export default {
  name: 'Home',
  components: {
  },
  watch:{
  },
  created() {
    EventBus.$emit("routeChange", "Home")
  }
}
</script>
<style scoped>
  .home {
    min-height: inherit!important;
    align-items: center;
  }
  .v-btn {
    background-color: #2B2B2B!important;
    color: white!important;
    height: 200px!important;
    border-radius: 10px!important;
    width: 200px;
    margin: 10px;
  }
  .v-btn:hover {
    border: solid 2px #2B2B2B!important;
    background-color: #363636!important;
  }
</style>
