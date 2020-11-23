<template>
  <div class="about">
    <div v-if="show" class="selector">
      <v-col
        class="d-flex"
        cols="12"
        sm="6"
      >
      <div class="select-title">
        <p>Select Template</p>
      </div>
      <div class="sub-selector">
        <v-select
          :items="this.getTemplates"
          outlined
          v-model="template"
        ></v-select>
        <v-btn class="submit-template" v-on:click="selectTemplate()">Submit</v-btn>
      </div>
      </v-col>
    </div>
    <div v-else class="">
    <v-btn v-on:click="test()">test</v-btn>
    <v-btn to="/">home</v-btn>
    </div>
  </div>
</template>
<script>
import {mapActions, mapGetters} from "vuex"
import { EventBus } from "../../../event-bus"
const domain = "template"
export default {
  data: () => {
    return {
      show: true,
      template: '',
    }
  },
  computed: {
    ...mapGetters(domain, ["getTemplates", "getTemplate"]),
  },
  methods: {
    ...mapActions(domain, ["create", "get", "set"]),
    test () {
      this.create({resource: domain, data: "Test"})
    },
    selectTemplate(){
      this.set({resource: domain, data: this.template})
      this.show = false;
      console.log(this.template);
    }
  },
  created() {
    EventBus.$emit("routeChange", "Create")
    this.get({resource: domain})
    this.template = this.getTemplates[0]
    console.log(this.getTemplates)
  }
}
</script>
<style scoped>
  .selector {
    display: flex;
    width: 100%;
    height: inherit;
    min-height: inherit;
    justify-content: center;
    align-items: center;
  }
  .d-flex {
    flex-direction: column;
  }
  .about {
    height: inherit!important;
    min-height: inherit!important;
  }
  .submit-template {
    height: 56px!important;
    margin-left: 10px;
    background-color: #2B2B2B!important;
    color: white!important;
  }
  .submit-template:hover {
    background-color: #363636!important;
  }
  .select-title {
    width: 100%;
    border-bottom: #535353 solid 2px;
    color: white;
    margin-bottom: 10px;
  }
  .select-title p {
    margin: 0;
    font-size: 20px;
  }
  .sub-selector {
    display: flex;
  }
</style>