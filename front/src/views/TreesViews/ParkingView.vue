<script setup lang="ts">


import type { Trees } from '@/APIs/dust'
import Header from '@/components/Header.vue'
import { useTreeStore } from '@/stores/tree'
import { onMounted, ref } from '@vue/runtime-core'
import { useLocationStore} from '@/stores/location'
import { useRoute } from 'vue-router'
import Chart from "@/components/Chart.vue"
import SensorChart from "@/components/SensorChart.vue"
import type { Sensor } from '@/types/sensor'


const router = useRoute();
// Create store
const treeStore = useTreeStore();
const locationStore = useLocationStore();

const id = ref("");

onMounted(() => {
  treeStore.fetch_single(router.params.id);
  locationStore.locate_user();

})

const test:boolean = true

function toggleChart(id:number){
  treeStore.sensors[id].show = !treeStore.sensors[id].show
}



</script>


<template>  
  <Header></Header>  
  <v-main class="d-flex flex-column align-center " >
    <v-card class="pa-2 ma-5">
      <h1 v-if="!treeStore.loading" > {{ treeStore.single.name}} </h1> <!-- {{ treeStore.trees[0].name }}-->
    </v-card>


    <v-card v-if="(!treeStore.loadingSingle)" class="d-flex flex-wrap ma-5 pa-5" width="1600">
      <v-card v-for="(sensor,i) in treeStore.sensors" :key="sensor.id" @click="toggleChart(i)"
      class="ma-5 align-self-start">
        <v-card-text>{{ sensor.name }}</v-card-text>
        
        <sensor-chart  :sensor="sensor" v-show="sensor.show"></sensor-chart>
       
      </v-card>
    </v-card>
    <v-cards v-else>
      <h2>Getting all the data</h2>
      <v-progress-circular
      indeterminate
      color="primary"
    ></v-progress-circular>
    </v-cards>
    
  </v-main>
</template>