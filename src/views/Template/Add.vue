<template>
  <div class="about">
    <h1>Add</h1>
    <v-btn to="/">home</v-btn>
  </div>
</template>
<script>
import { EventBus } from "../../../event-bus"
export default {
  created() {
    EventBus.$emit("routeChange", "Add")
  }
}
</script>