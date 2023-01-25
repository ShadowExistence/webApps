<script setup lang="ts">
import { useTreeStore } from '@/stores/tree'
import { onMounted } from '@vue/runtime-core'
import { useLocationStore} from '@/stores/location'
import Header from '@/components/Header.vue'

// Create store
const treeStore = useTreeStore();
const locationStore = useLocationStore();

onMounted(() => {
    treeStore.fetch_trees();
    locationStore.locate_user();
})
</script>


<template>
    <Header/>
   <v-main>
    <v-card class=" d-flex flex-column align-center mb-6 ma-10 pa-5" outlined tile>
        
        <v-btn  v-if="!treeStore.loading" v-for="tree in treeStore.trees" :key="tree.id" 
        class="ma-10" color="grey darken-2" :to="`/${tree.id}`"
        width="200">
        {{ tree.name }}
        </v-btn>

        <div v-else>
            Please Wait for API 
        </div>
        <h2>Closest tree:</h2>
        
        <v-btn width="200" class="ma-5" color="grey darken-2" :to="`/${treeStore.closest_tree.id}`">{{ treeStore.closest_tree.name }}</v-btn>
    </v-card>
   </v-main>
</template>

