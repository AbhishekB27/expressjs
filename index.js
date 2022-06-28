const express = require('express')
const app = express()
app.use(express.json()) // it is inbuilt middleware
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
    try {
        const { id } = req.params
        const data = JSON.parse( fs.readFileSync(path.join(__dirname,'data.json'),{encoding:"UTF-8"}) )
    
        const todo = data.find((item)=>item.id ==  id)
        
        if(todo){
            return res.send(todo)
        }
        else{
            return res.send("Item Not Found")
        }
    } catch (error) {
        return res.send(error.message)
    }
})
// for adding new todo
app.post('/todos',(req,res)=>{
    const data  = req.body
    const todos = JSON.parse( fs.readFileSync(path.join(__dirname,'data.json'),{encoding:"UTF-8"}) )
    const todo = {
        ...data,
        id: todos.length + 1
    }
    fs.writeFileSync(path.join(__dirname,'data.json'),JSON.stringify([...todos,todo]))
    console.log(todo)
    res.send(todo)
})
//delete a todo by id
app.delete('/todos/:id',(req,res)=>{
    const {id}  = req.params
    const todos = JSON.parse( fs.readFileSync(path.join(__dirname,'data.json'),{encoding:"UTF-8"}) )
    const newTodo = todos.filter(data=>data.id != id)
    fs.writeFileSync(path.join(__dirname,'data.json'),JSON.stringify([...newTodo]))
    // console.log(newTodo)
    res.send(newTodo)
})
app.listen(8080,()=>{
    console.log("server start on 8080 port.")
})