import axios from 'axios'

const Api = axios.create({
  baseURL: 'https://dust.devbitapp.be/api',

});

export const Trees = {
  resource: 'trees',

  fetch_all(){
    return Api.get(`/${this.resource}/`); // Promise
  },
  fetch_one(id:string | string[]){
    return Api.get(`/${this.resource}/${id}`);
  },
  fetch_sensor(id:string[]){
    return Api.get(`/sensors/${id[0]}?period=${id[1]}`);
  }
}