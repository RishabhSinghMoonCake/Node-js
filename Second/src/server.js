import express from 'express'
import path,{dirname} from 'path'
import { fileURLToPath } from 'url'

import authRoutes from './routes/authRoutes.js'
import todoRoutes from './routes/todoRoutes.js'

const app = express()
const PORT = process.env.PORT || 5000

//Get the file path from the url of the current module

const __filename = fileURLToPath(import.meta.url)
//Get the directory name from the file path

const __dirname = dirname(__filename)
//middleware
app.use(express.json())

//serves the html file form the public directory
//tells express to serve all files form the public folder as static assets

app.use(express.static(path.join(__dirname,'../public')))

//Routes
app.use('/auth' , authRoutes)
app.use('/todos' , todoRoutes)

//serving up the HTML file from the directory
app.get('/', (req,res)=>{
  res.sendFile(path.join(__dirname,'public','index.html'))
})

app.listen(PORT, ()=>{
  console.log(`Server has started on port => ${PORT}`)
})