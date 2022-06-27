const express = require('express')
const app = express()

app.get('/Home/product/:name',(req,res)=>{
    // res.send('Hello I m Home Page.') 
    res.send(`You searched for ${req.params.name}`)
    console.log(req.params.name)   
})
app.get('/About',(req,res)=>{
    res.send('Hello I m About Page.')    
})
app.get('/Contact',(req,res)=>{
    res.send('Hello I m Contact Page.')  
    console.log(req.query) // it give you query object  
    console.log(req.path)
})
app.listen(8080,()=>{
    console.log("server start on 8080 port.")
})