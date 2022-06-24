console.log("Hello I m ExpressJs")
const express = require('express')
const app = express()

app.get('/',(req,res)=>{
    res.send("<h1 style='color:limegreen'>Hello This Is Home Page.</h1>")
});

app.get('/about',(req,res)=>{
    res.send("<h1 style='color:lawngreen'>Hello This Is About Page.</h1>")
})
app.get('/contact',(req,res)=>{
    res.send("<h1 style='color:pink'>Hello This Is Contact Page.</h1>")
})
app.listen(8080)
