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
    <div v-else class="main-create-body">
    <div class="form-main">
      <v-row>
        <v-col
          cols="12"
          md="4"
          v-for="(item, itemId) in this.getTemplate" :key="itemId"
        >
          <v-text-field 
            v-if="item.type === 'text'"
            :label="item.title"
            v-model="data[item.name]"
            outlined
            required
          ></v-text-field>
          <v-select
            v-else-if="item.type === 'docType'"
            :items="types"
            :label="item.title"
            outlined
            v-model="data.type"
          ></v-select>
          <v-text-field 
            v-if="item.type === 'identifier'"
            :label="item.title"
            v-model="data[item.name]"
            outlined
            required
          ></v-text-field>
          <div
            v-if="item.type === 'total'"
            class="display-none"
          ></div>
          <div 
            v-if="item.type === 'tax'"
            class="display-none"
          ></div>
          <v-text-field 
            v-if="item.type === 'table'"
            :label="item.title"
            v-model="data[item.name]"
            outlined
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <div>
        <p>Add Items</p>
        <v-btn class="add" v-on:click="addTableRow()">add</v-btn>
      </div>
      <v-row class="table-row" v-for="(item, itemId) in this.tableData" :key="itemId">
      <v-col
          cols="12"
          md="4"
          v-for="(tableItem, tableId) in item" :key="tableId"
      >
          <v-text-field 
          :label="tableId"
          v-model="tableData[itemId][tableId]"
          outlined
          required
          ></v-text-field>
      </v-col>
      </v-row>
    </div>
    <v-btn class="submit" v-on:click="test()">submit</v-btn>
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
      tableData: [],
      data: {},
      types: ["Offerte", "Factuur"],
      tabletKey: ""
    }
  },
  computed: {
    ...mapGetters(domain, ["getTemplates", "getTemplate"]),
  },
  methods: {
    ...mapActions(domain, ["create", "get", "set"]),
    addTableRow() {
      for (var key of Object.keys(this.getTemplate)){
        if (this.getTemplate[key].type === "table") {
          this.tableKey = key
          this.tableData.push(this.getTemplate[key].variables);
        }
      }
    },
    test () {
      this.data["tableData"] = this.tableData;
      this.create({resource: domain, data: this.data, selectedTemplate: this.template})
    },
    selectTemplate(){
      this.set({resource: domain, data: this.template})
      for (var key of Object.keys(this.getTemplate)){
        this.data[this.getTemplate[key].name] = ""
      }
      this.data.type = "Offerte"
      this.show = false;
      console.log(this.getTemplate);
    },
  },
  async created() {
    this.tableData = [];
    EventBus.$emit("routeChange", "Create")
    await this.get({resource: domain})
    this.template = this.getTemplates[0]
  },
  mounted() {
    this.tableData = [];
    this.addTableRow();
  }
}

    // "7": {
    //     "type": "table",
    //     "title": "table",
    //     "name": "table",
    //     "variables": {
    //         "description": "title",
    //         "amount": {
    //             "type": "hours",
    //             "data": "amount"
    //         },
    //         "price": "price"
    //     }
    // },
    // <v-text-field 
    // v-if="tableId == 'amount'"
    // :label="tableData[itemId][tableId]['type']"
    // v-model="tableData[itemId][tableId]['data']"
    // outlined
    // required
    // ></v-text-field>
</script>
<style scoped>
  .table-row {
    border-bottom: 2px solid #535353!important;
    padding-top: 25px;
  }
  .submit {
    background-color: #2B2B2B!important;
    color: white!important;
    border-radius: 10px!important;
    width: 100%;
    min-height: 35px!important;
    margin: 10px;
  }
  .submit:hover {
    border: solid 2px #2B2B2B!important;
    background-color: #363636!important;
  }
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
  .main-create-body {
    padding: 0 15%;
  }
  .form-main {
  }
  .display-none {
    display: none;
  }
</style>