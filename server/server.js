const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(8000,()=>{
  console.log("Server is running at port 8000");
})