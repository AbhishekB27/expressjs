const express = require('express')
const app = express()
app.use(express.json()) // it is inbuilt middleware
const fs = require('fs')
const path = require('path')

//fetch quotes data
app.get('/quotes',(req,res)=>{
    const data = JSON.parse( fs.readFileSync(path.join(__dirname,'data.json'),{encoding:'utf-8'}) )
    // console.log(data)
    res.send(data)
})
//fetch quotes by id
app.get('/quotes/:quoteId',(req,res)=>{
   try {
    let { quoteId } = req.params
    console.log(quoteId)
    const data = JSON.parse( fs.readFileSync(path.join(__dirname,'data.json'),{encoding:'utf-8'}) )
    // console.log(data)
    const quotes = data.find(data=>data.id == quoteId )
    console.log(quotes)
    if(quotes){
        res.send(quotes)
    }
    else{
        res.send('Quote not found enter valid id')
        console.log('Quote not found enter valid id')
    }
   } catch (error) {
    res.send(error.message)
   }
})
app.post('/quotes',(req,res)=>{
    try {
        const data = req.body
    const quotess = JSON.parse( fs.readFileSync(path.join(__dirname,'data.json'),{encoding:'utf-8'}) )
    const quote={
        id: quotess[quotess.length -1].id + 1,
        ...data
    }
    fs.writeFileSync(path.join(__dirname,'data.json'),JSON.stringify([...quotess,quote]))
    res.send(quote)
    } catch (error) {
        res.send(error.message)
    }
})

//delete quotes by id
app.delete('/quotes/:id',(req,res)=>{
    const {id} = req.params
    const quotess = JSON.parse( fs.readFileSync(path.join(__dirname,'data.json'),{encoding:'utf-8'}) )
    const quotes = quotess.filter(data=>data.id !=id);
    fs.writeFileSync(path.join(__dirname,'data.json'),JSON.stringify([...quotes]))
    res.send(quotes)
})
app.listen(8080,()=>{
    console.log("server start on 8080 port.")
})