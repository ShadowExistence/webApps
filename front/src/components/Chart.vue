<script setup lang="ts">
import { Line } from 'vue-chartjs'

import type { PropType } from 'vue';
import type { Sensor } from '@/types/sensor';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
  

import * as chartData from "./ChartData"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)



const props = defineProps({
  data: {
    name: "a",
    labels: [],
    datasets: [
    {
      label: "",
      backgroundColor: String,
      data: [],
    }
    ], 
  },
  default: () => {}
})



const options = {
  responsive: true,
}



</script>

<template>
  <Line :data="data" :options="options" />
</template>
  