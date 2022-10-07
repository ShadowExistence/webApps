const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/devices', function (req, res) {

  res.send(`Devices`)
});

app.post('/devices', function (req, res) {
  
})

app.get('/devices/:id', function (req, res) {
  res.send(`Requested id: ${req.params.id}`)
});

app.put('/devices/:id', function (req, res) {
  
})

app.delete('/devices/:id', function (req, res) {
  
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})