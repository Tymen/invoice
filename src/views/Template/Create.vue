<template>
  <div class="about">
    <h1>Create</h1>
    <v-btn v-on:click="test()">test</v-btn>
    <v-btn to="/">home</v-btn>
  </div>
</template>
<script>
import {mapActions} from "vuex"
const domain = "template"
export default {
  methods: {
    ...mapActions(domain, ["create"]),
    test () {
      this.create({resource: domain, data: "Test"})
    }
  }
}
</script>