<script setup lang="ts">
import { onMounted } from 'vue';
import type {PropType} from 'vue';
import type { Sensor } from '@/types/sensor';
import Chart from '@/components/Chart.vue'




const props = defineProps({
  sensor: {
    type: Object as PropType<Sensor>,
    default: () => {}
  }
})



var data = {
    name: props.sensor.name,
    labels: [],
    datasets: [
      {
        label: props.sensor.type,
        backgroundColor: `#89CFF0`,
        data: []
      },
    ]
  }

  props.sensor.values.forEach( element => {
      data.labels.push(element.time.slice(11,16));
      data.datasets[0].data.push(element.value);
    })


</script>

<template>

  <v-card class="ma-5" height="400" width="600">
    <v-card-text>{{ sensor.name }}</v-card-text>
    <chart height="400" width="700" :data="data"></chart>
  </v-card>

</template>

