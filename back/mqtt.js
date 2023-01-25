import {connect} from 'mqtt'
import dotenv from "dotenv"
import { createClient } from 'redis';


dotenv.config();

// Redis Login
const redisClient = createClient({
  socket: {
    host: process.env.REDISCLIENT,
    port: process.env.REDISPORT
  }
});
await redisClient.connect();


async function addRedis(json){

  redisClient.LPUSH('mylist', json)
  .then((res) =>{
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  })

}
redisClient.on('error', (err) => console.log('Redis Client Error', err));



// mqtt login
const options = {
  username: process.env.NAME,
  password: process.env.PASS,
  port: 8883
}
const mqttClient  = connect(`mqtts://${process.env.BROKER}`, options)

const topic = `#`

console.log("trying to connect...");

mqttClient.on('connect', () => {
  console.log('Connected')
  mqttClient.subscribe(topic, () => {
    console.log(`subscribed to topic: ${topic}`)
  })
})
mqttClient.on('error', (e) => {
  console.log(e)
})

mqttClient.on('message', (topic, message) =>{
  console.log(`recived message`);

  var payload = message.toString();
  payload = JSON.parse(payload)
  const decoded = payload.uplink_message.decoded_payload
  const obj = {
    id: payload.end_device_ids.device_id,
    temp: decoded.internalTemperature,
    date:  timestamp(payload.received_at),
    humidity:{
      hum1: decoded.moistureLevel_1,
      hum2: decoded.moistureLevel_2,
      hum3: decoded.moistureLevel_3,
      hum4: decoded.moistureLevel_4
    }
  }
  console.log(obj);
  addRedis(JSON.stringify(obj));
})

function timestamp(str){
  return new Date(str).getTime();
}


