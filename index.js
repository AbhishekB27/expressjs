const express = require('express')
const app = express()
const quoteRoutes = require('./routes/quotes')
const authRoutes = require('./routes/auth')
app.use(express.json()) // it is inbuilt middleware

app.use('/quotes',quoteRoutes)
app.use('/auth',authRoutes)
app.listen(8080,()=>{
    console.log("server start on 8080 port.")
})