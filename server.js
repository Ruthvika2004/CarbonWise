require('dotenv').config()
const express=require('express')

const cors=require('cors')

const mongoose=require('mongoose')
const  projectRoutes = require('./routes/projects')


// starting/ creating express app
const app=express()

//ruthvika
const routes = require('./routes/routes'); // Import the routes file

app.use(express.json()); // Middleware to parse JSON bodies
app.use('/', routes);
//ruthvika


// middleware

app.use(express.json())

app.use(cors())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
  })

// routes
app.use('/api/projects', projectRoutes)

//connect to db
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
  //listen foir requests
app.listen(process.env.PORT,()=>{
  console.log(' conncected to db, listening!!',process.env.PORT)
})


})
.catch((error)=>{
  console.log(error)
})



