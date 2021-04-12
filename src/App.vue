<template>
  <v-app>
    <v-app-bar app color="teal lighten-2" dark>
      <v-toolbar-title>Covid-19 Dashboard</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <CovidDashboard />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import CovidDashboard from "@/components/CovidDashboard.vue";

@Component({
  name: "App",
  components: { CovidDashboard }
})
export default class App extends Vue {}
</script>
