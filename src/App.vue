<template>
  <v-app id="inspire">

    <v-app-bar app>

      <v-toolbar-title>PDF Editor</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {
  },
  data: () => ({
  }),
};
</script>
