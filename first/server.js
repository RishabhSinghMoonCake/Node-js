const express = require('express')
const app = express()

const PORT = 8000

app.use(express.json())

data = ['Rishabh']
app.get('/', (request,response)=>{
  response.send(`
      <body style="background:black;color:white;">

        <p>${data}</p>

      </body>
    `)
})


app.get('/dashboard' , (req,res)=>{
  res.send('hi')
})

app.get('/api/data' , (req,res)=>{
  res.send(data)
})

//create -> post
//read -> get
//update -> put
//delete -> delete
//CRUD -> method

app.post('/api/data/', (req,res)=>{
  const newEntry = req.body
  console.log(newEntry)
  data.push(newEntry.name)
  res.sendStatus(201)
})

app.delete('/api/data', (req,res)=>{
  data.pop()
  console.log('deleted the last entry')
  res.sendStatus(203)
})

//this line needs to be at the very bottom
app.listen(PORT, ()=>{
  console.log(`Server has started on ${PORT}`)
})