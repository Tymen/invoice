<template>
  <div class="home d-flex justify-center">
    <v-btn class="bigbtn" to="/template/create">Maak Factuur</v-btn>
    <v-dialog
      v-model="dialog"
      persistent
      max-width="290"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          dark
          v-bind="attrs"
          v-on="on"
          class="bigbtn"
        >
          change folder
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="headline">
          change save location
        </v-card-title>
        <v-card-text><v-btn v-on:click="fileSelector()">select savelocation</v-btn></v-card-text>
        <v-card-text><v-btn v-on:click="chromeSelector()">select chrome</v-btn></v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >
            cancel
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >
            done
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
// @ is an alias to /src
import { EventBus } from "../../event-bus"
const { ipcRenderer } = require('electron');
const fs = require('fs')
export default {
  name: 'Home',
  components: {
  },
  data () {
    return {
      dialog: false,
    }
  },
  watch:{
  },
  methods: {
    fileSelector() {
      console.log(ipcRenderer.send("selectFolder"))
    },
    chromeSelector() {
      console.log(ipcRenderer.send("selectChrome"))
    },
  },
  created() {
    const path = './appSettings.json'
    try {
      if (fs.existsSync(path)) {
        console.log("file exists")
      }else {
        this.dialog = true;
      }
    } catch(err) {
      console.error(err)
    }
    EventBus.$emit("routeChange", "Home")
  }
}
</script>
<style scoped>
  .home {
    min-height: inherit!important;
    align-items: center;
  }
  .bigbtn.v-btn {
    background-color: #2B2B2B!important;
    color: white!important;
    height: 200px!important;
    border-radius: 10px!important;
    width: 200px;
    margin: 10px;
  }
  .bigbtn.v-btn:hover {
    border: solid 2px #2B2B2B!important;
    background-color: #363636!important;
  }
  .file-select > .select-button {
  padding: 1rem;

  color: white;
  background-color: #2EA169;

  border-radius: .3rem;

  text-align: center;
  font-weight: bold;
}

/* Don't forget to hide the original file input! */
.file-select > input[type="file"] {
  display: none;
}
</style>
