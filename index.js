const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path')

app.get('/todos',(req,res)=>{
    const { count } = req.query
    console.log(req.query)
    const data = JSON.parse( fs.readFileSync(path.join(__dirname,'data.json'),{encoding:"UTF-8"}) )
    if(!count){
        return res.send(data)
    }
    else{
        return res.send(data.slice(0,count))
    }
})
app.get('/todos/:id',(req,res)=>{
    const { id } = req.params
    const data = JSON.parse( fs.readFileSync(path.join(__dirname,'data.json'),{encoding:"UTF-8"}) )
    return res.send(data.find((item)=>item.id == id))

})
app.listen(8080,()=>{
    console.log("server start on 8080 port.")
})