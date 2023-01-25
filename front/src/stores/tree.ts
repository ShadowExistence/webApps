import { defineStore } from "pinia";
import { ref, computed } from 'vue'
import type { Tree } from '@/types/tree'
import { Trees } from '@/APIs/dust'
import { useLocationStore } from "./location";
import { distance_points } from "@/helpers/location_helper";
import type { Sensor } from '@/types/sensor'
import { elements } from "chart.js";

export const useTreeStore = defineStore('', () => {

  // State
  const trees = ref([] as Tree[]);
  const loading = ref(false);
  const loadingSingle = ref(false);
  const single = ref({} as Tree);
  const sensors = ref([] as Sensor[]);
  const sensorsMap = new Map()

  // Action
  async function fetch_trees(){
    console.log("Fetching All Trees")
    loading.value = true;
    Trees.fetch_all()
    .then((res) => {
      console.log(res)
      trees.value = res.data.data
      loading.value = false;
    })
    .catch((err) => {
      console.log(err);
      loading.value = false;
    })
  }

  async function fetch_single(id:string | string[]){
    console.log("Fetching Single Tree")
    sensors.value = []
    loadingSingle.value = true;
    Trees.fetch_one(id)
    .then(async (res) => {
      console.log(res.data)
      single.value = await res.data
      for(const sensor of single.value.sensors)
      {
        Trees.fetch_sensor([sensor.id, '24h']) // await makes loading time long, idk how to make loading single wait for it to finish
          .then(async res => {
            sensors.value.push(res.data);
            sensorsMap.set(sensor.id, res.data)
            console.log(res);
          })
          .catch(err => {
            console.log(err)
            loadingSingle.value = false
          })
      }
      loadingSingle.value = false
    console.log("loading set to false")
      
    })
    .catch((err) => {
      console.log(err);
      loadingSingle.value = false
    })
    
  }



  // Getters

  const closest_tree = computed(() =>{
    if(loading.value || trees.value.length === 0 ){
      return {};
    }
    const locationStore = useLocationStore();

    // difault way
    // let closestTree = trees.value[0];
    // let closestDistance = distance_points(closestTree.location, locationStore.location);

    // trees.value.forEach((tree) =>{
    //   const treeDisatnce = distance_points(tree.location, locationStore.location);
    //   if(treeDisatnce < closestDistance){
    //     closestDistance = treeDisatnce;
    //     closestTree = tree;
    //   }
    // })

    //return closestTree;
    
    // nico way
    const distances = trees.value.map((tree) => {
      return distance_points(tree.location, locationStore.location);
    })
    
    const closest = distances.reduce((indexClosestTree, currentDistance, currentIndex) => {
      if(currentDistance < distances[indexClosestTree]) return currentIndex;
      else return indexClosestTree
    },
    0 //initial index of closest tree
  );
  return trees.value[closest];
    
    
  })


  return {
    trees,
    loading,
    loadingSingle,
    fetch_trees,
    closest_tree,
    fetch_single,
    single,
    sensors,
    sensorsMap
  }
});