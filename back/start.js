import express from 'express'

const app = express()
const port = 3000

import mongo from 'mongodb'
const url = 'mongodb://root:example@localhost:8000/' // << works :D

const prsr = {
  async connect(){return await new mongo.MongoClient(url).connect()},
   
}

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/devices', async function (req, res) {

  const client = await prsr.connect();
  const database = client.db('devices');
  const tables = await database.listCollections().toArray();

  let output = {}
  for(let i = 0; i < tables.length; i++){
    if(tables[i].name){
      output[i] = tables[i].name;
    }
  }
  res.send(output);

  await client.close();
});

app.post('/devices', async function (req, res) {
  


})

app.get('/devices/:id', async function (req, res) {

  const client = await prsr.connect();
  const database = client.db('devices');
  const table = database.collection(req.params.id);

  let limit = req.query.limit || 1
  var output = await table.find().sort({timestamp:-1}).limit(parseInt(limit)).toArray(); // finds newset data in the table

  res.send(output);
  await client.close();
});

app.put('/devices/:id/', async function (req, res) {

  const client = await prsr.connect();
  const database = client.db('devices');
  const table = database.collection(req.params.id);

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
  
})

app.delete('/devices/:id', function (req, res) {
  
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.get('/testdb', async (req, res) =>{

  const client = await prsr.connect();
  const database = client.db('test');
  const table = database.collection('first');
  
  
  
  const output = await table.find().toArray(); //Finds all inside table and send as array
  res.send(output);
  await client.close();
})



