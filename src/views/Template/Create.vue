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
    <v-alert
      type="error"
      :value="alert"
      transition="scale-transition"
    >
      table needs to contain numbers
    </v-alert>
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
            class="white--text"
          ></v-text-field>
          <v-select
            v-else-if="item.type === 'docType'"
            :items="types"
            :label="item.title"
            outlined
            v-model="data.type"
            class="white--text"
          ></v-select>

          <div
            v-if="item.type === 'total'"
            class="display-none"
          ></div>
          <div 
            v-if="item.type === 'tax'"
            class="display-none"
          ></div>
        </v-col>
      </v-row>
      <div>
        <v-btn class="add" v-on:click="addTableRow()">Add Item</v-btn>
        <v-btn class="add" v-on:click="removeTableRow()">Remove Last Item</v-btn>
      </div>
      <v-row class="table-row" v-for="(item, itemId) in this.tableData" :id="itemId" :key="itemId">
      <v-col
          cols="12"
          md="4"
          v-for="(tableItem, tableId) in item" :key="tableId"
      >
          <v-text-field 
          :label="tableId"
          v-model="item[tableId]"
          outlined
          required
          class="white--text"
          ></v-text-field>
      </v-col>
      </v-row>
    </div>
    <v-btn class="submit" v-on:click="submit()">create document</v-btn>
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
      rows: 0,
      alert: false,
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
          this.tableData.push({})
          let data = this.tableData[this.tableData.length -1]
          for (var i of Object.keys(this.getTemplate[key].variables)){
            data[this.getTemplate[key].variables[i]] = "";
          }
        }
      }
    },
    removeTableRow() {
      this.tableData.pop()
    },
    isNumeric(num){
      return !isNaN(num)
    },
    async submit () {
      let valid = true;
      for(let i=0; i < this.tableData.length; i++){
        if(!this.isNumeric(this.tableData[i].price)){
          this.alert = true;
          valid = false
        }
      }
      if (valid){
        this.alert = false
        this.data["tableData"] = this.tableData;
        await this.create({resource: domain, data: this.data, selectedTemplate: this.template})
        this.$router.push('/')
      }
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
.add {
  margin: 5px;
}
  .submit {
    background-color: rgba(255, 255, 255, 0.75)!important;
    color: rgb(0, 0, 0)!important;
    border-radius: 10px!important;
    width: 100%;
    padding: 30px!important;
    min-height: 35px!important;
    margin: 10px;
    transition: .2s;
  }
  .submit:hover {
    background-color: #ffffff!important;
    color: black !important;
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
    background-color: #c5c5c5!important;
    transition: .2s;
    color: rgb(0, 0, 0)!important;
  }
  .submit-template:hover {
    background-color: #ffffff!important;
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
  .display-none {
    display: none;
  }
</style>