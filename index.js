const express = require('express')
const app = express()
const commentRoutes = require('./routes/employee')
const authRoutes = require('./routes/auth')
app.use(express.json()) // it is inbuilt middleware

app.use('/employees',commentRoutes)
app.use('/auth',authRoutes)
app.listen(8080,()=>{
    console.log("server start on 8080 port.")
})