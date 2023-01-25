import { defineStore } from "pinia";
import { ref } from 'vue';
import type {Location} from '@/types/location'

export const useLocationStore = defineStore('location', () => {

  // State
  const location = ref({
    longitude: 3,
    latitude: 51
  } as Location);


  // Action
  function locate_user(){
    if(!navigator.geolocation){
      return;
    }

    navigator.geolocation.getCurrentPosition((geolocation) => {
      // console.log(geolocation);
      location.value.latitude = geolocation.coords.latitude;
      location.value.longitude = geolocation.coords.longitude;
    },
    (err) => {
      console.log(err);
    })
  }

  return {
    location,
    locate_user
  }
})