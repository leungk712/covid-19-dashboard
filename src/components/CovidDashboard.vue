<template>
  <v-container class="dashboard-container" fluid>
    <v-row justify="center" align="center" class="dashboard-global-row">
      <v-col cols="12">
        <p class="display-2">
          Global Covid-19 Statistics
          <v-icon x-large>fas fa-chart-bar</v-icon>
        </p>
        <h3 class="ml-1">Last Updated: {{ formatDate(globalData.Date) }}</h3>
        <v-divider />
      </v-col>
      <v-col cols="4">
        <v-card class="dashboard-global-card" outlined>
          <v-icon x-large color="green lighten-2">fas fa-virus</v-icon>
          <h1>New Confirmed Cases:</h1>
          <p class="display-1">{{ formatStatistic(globalData.NewConfirmed) }}</p>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card class="dashboard-global-card" outlined>
          <v-icon x-large>fas fa-skull</v-icon>
          <h1>New Confirmed Deaths:</h1>
          <p class="display-1">{{ formatStatistic(globalData.NewDeaths) }}</p>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card class="dashboard-global-card" outlined>
          <v-icon x-large color="primary">fas fa-shield-virus</v-icon>
          <h1>New Confirmed Recovered:</h1>
          <p class="display-1">{{ formatStatistic(globalData.NewRecovered) }}</p>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card class="dashboard-global-card" outlined>
          <v-icon x-large color="green lighten-2">fas fa-virus</v-icon>
          <h1>Total Confirmed Cases:</h1>
          <p class="display-1">{{ formatStatistic(globalData.TotalConfirmed) }}</p>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card class="dashboard-global-card" outlined>
          <v-icon x-large color="grey darken-1">fas fa-skull</v-icon>
          <h1>Total Confirmed Deaths:</h1>
          <p class="display-1">{{ formatStatistic(globalData.TotalDeaths) }}</p>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card class="dashboard-global-card" outlined>
          <v-icon x-large color="primary">fas fa-shield-virus</v-icon>
          <h1>Total Confirmed Recovered:</h1>
          <p class="display-1">{{ formatStatistic(globalData.TotalRecovered) }}</p>
        </v-card>
      </v-col>
    </v-row>
    <p class="display-2">Countries Covid-19 Statistics</p>
    <v-data-table
      :headers="headers"
      :items="countriesData"
      class="elevation-1 py-2"
      multi-sort
      :search="search"
    >
      <template v-slot:top>
        <v-text-field
          v-model="search"
          label="Search"
          class="mx-4"
        />
      </template>
      <template v-slot:item.NewConfirmed="{ item }">
        <span>{{ formatStatistic(item.NewConfirmed) }}</span>
      </template>
      <template v-slot:item.NewDeaths="{ item }">
        <span>{{ formatStatistic(item.NewDeaths) }}</span>
      </template>
      <template v-slot:item.NewRecovered="{ item }">
        <span>{{ formatStatistic(item.NewRecovered) }}</span>
      </template>
      <template v-slot:item.TotalConfirmed="{ item }">
        <span>{{ formatStatistic(item.TotalConfirmed) }}</span>
      </template>
      <template v-slot:item.TotalDeaths="{ item }">
        <span>{{ formatStatistic(item.TotalDeaths) }}</span>
      </template>
      <template v-slot:item.TotalRecovered="{ item }">
        <span>{{ formatStatistic(item.TotalRecovered) }}</span>
      </template>
    </v-data-table>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { namespace, State } from "vuex-class";
import { StatisticsState } from "@/models";
import StatisticsModule from "@/store/modules/statistics";

const statistics = namespace(StatisticsModule.name);

@Component({
  name: "CovidDashboard"
})
export default class CovidDashboard extends Vue {
 // ===== Store ===== //
 @State("statistics") public statistics!: StatisticsState;
 @statistics.Action("getCovidStatistics") public getCovidStatistics!: () => void;

 // ===== Data ===== //
 public search = "";
 public headers = [
   {
     text: "Country",
     value: 'Country'
   },
   {
     text: "Country Code",
     value: "CountryCode"
   },
   {
     text: "New Confirmed",
     value: "NewConfirmed"
   },
   {
     text: "New Deaths",
     value: "NewDeaths"
   },
   {
     text: "New Recovered",
     value: "NewRecovered"
   },
      {
     text: "Total Confirmed",
     value: "TotalConfirmed"
   },
   {
     text: "Total Deaths",
     value: "TotalDeaths"
   },
   {
     text: "Total Recovered",
     value: "TotalRecovered"
   }
 ];
 public globalItems = [
   {
     icon: "fas fa-virus",
     iconColor: "green lighten-2",
     title: "New Confirmed Cases",
     data: "NewConfirmed"
   },
   {
     icon: "fas fa-skull",
     iconColor: "grey darken-1",
     title: "New Confirmed Deaths",
     data: "NewDeaths"
   },
   {
     icon: "fas fa-shield-virus",
     iconColor: "primary",
     title: "New Confirmed Recovered",
     data: "NewRecovered"
   },
   {
     icon: "fas fa-virus",
     iconColor: "green lighten-2",
     title: "Total Confirmed Cases",
     data: "TotalConfirmed"
   },
   {
     icon: "fas fa-skull",
     iconColor: "grey darken-1",
     title: "Total Confirmed Deaths",
     data: "TotalDeaths"
   },
   {
     icon: "fas fa-shield-virus",
     iconColor: "primary",
     title: "New Confirmed Recovered",
     data: "TotalRecovered"
   },
 ]

 // ===== Methods ===== //
 public formatDate(date: string) {
   return new Date(date).toLocaleString('en-US', { timeZone: 'UTC' });
 }
 public formatStatistic(stat: number) {
   return stat.toLocaleString('en-US');
 }

 // ===== Computed ===== //
 get globalData() {
   return this.statistics.globalData;
 }

 get countriesData() {
   return this.statistics.countriesData;
 }

 // ===== Lifecycle Hooks ===== //
 private created() {
   this.getCovidStatistics();
 }
};
</script>

<style scoped>
  .dashboard-container {
    width: 95%;
  }
  .dashboard-global-row {
    margin: 40px 0;
    border: 1px solid #eee;
    border-radius: 5px;
  }
  .dashboard-global-card {
    text-align: center;
    padding: 32px 0;
  }
</style>
