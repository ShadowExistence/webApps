<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { useTreeStore } from '@/stores/tree'
import { onMounted } from '@vue/runtime-core'
import { useLocationStore} from '@/stores/location'


// Create store
const treeStore = useTreeStore();
const locationStore = useLocationStore();



onMounted(() => {
    treeStore.fetch_trees();
    locationStore.locate_user();
})
</script>
