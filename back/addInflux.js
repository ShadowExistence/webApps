import {InfluxDB, Point} from '@influxdata/influxdb-client'
import dotenv from "dotenv"
import { createClient, commandOptions } from 'redis';
// import Promise from "promise"
 
dotenv.config();

// Redis Login
const redisClient = createClient({
  socket: {
    host: process.env.REDISCLIENT,
    port: process.env.REDISPORT
  }
});
redisClient.on('error', (err) => console.log('Redis Client Error', err));
await redisClient.connect();

// Redis POP
async function redisPOP(){

  const data = await redisClient.BRPOP(commandOptions({isolated: true}), 'mylist', 0)
  .then((res)=>{
    const output = JSON.parse(res.element)
    // console.log(output)
    return output
  })
  .catch((err) =>{
    console.log(err);
  })
  return data
}


const token = 'XiQ0pMR8RBadf1uG76zObLYPZOwrwctYTKshc2OyJtEh8FhU__eA4t1ceFcDr-h8vZgGu3BdglZ7oNXbChN_vA=='
const org = 'Vives'
const bucket = 'data'

const client = new InfluxDB({url: 'http://localhost:8086', token: token})


async function write(){


  const writeClient = client.getWriteApi(org, bucket)

  const data = await redisPOP()
  
  // console.log(data);
  
  const tempPoint = new Point('sensors')
    // .timestamp(data.timestamp)
    .tag('sensor', data.id)
    .timestamp(data.date * 1000000)
    .intField('temperature', data.temp)
    .intField('humidity1', data.humidity.hum1)
    .intField('humidity2', data.humidity.hum2)
    .intField('humidity3', data.humidity.hum3)
    .intField('humidity4', data.humidity.hum4)
  
  writeClient.writePoint(tempPoint);
  await writeDB(data)
  console.log(tempPoint)

  writeClient
    .close()
    .then(() => {
        console.log('FINISHED')
    })
    .catch(e => {
        console.error(e)
        console.log('Finished ERROR')
    })

}

import mongo from 'mongodb'
const url = 'mongodb://root:example@localhost:8000/' // << works :D

const prsr = {
  async connect(){return await new mongo.MongoClient(url).connect()},
   
}

async function writeDB(data){
  const client = await prsr.connect();
  const database = client.db('devices');
  const table = database.collection(data.id);
  
  // create a document to insert

     const doc = {
      sensor_id: data.id,
      timestamp: data.date,
      temp: data.temp,
      hum1: data.humidity.hum1,
      hum2: data.humidity.hum2,
      hum3: data.humidity.hum3,
      hum4: data.humidity.hum4,

    }
  await table.insertOne(doc)
  
  await client.close();

}

while(true){
  await write();
}