const { response } = require('express')
const express = require('express')
const app = express()
app.use(express.json()) // it is inbuilt middleware
const fs = require('fs')
const path = require('path')
const {greet,isAuthorised,isValid} = require('./middleware/index')
const shortid = require('shortid')

//fetch quotes data
let quotes = JSON.parse(fs.readFileSync(path.join(__dirname,'data.json'),{encoding:'utf-8'}))
// console.log(accounts)

//fetch all quotes
  app.get('/quotes',(request,response)=>{
    response.json(quotes)
  });
  //add quote
  app.post('/quote',(request,response)=>{
    const quote = request.body
    const newQuote ={
      id: quotes[quotes.length-1].id + 1,
      ...quote
    }
    fs.writeFileSync(path.join(__dirname,'data.json'),JSON.stringify([...quotes,newQuote]))
    response.send(newQuote)
    // console.log(newQuote)
  });
  //add data in quoteData.json
  app.post('/quotes',isValid,(req,res)=>{
    console.log("Good😊")
  })
  
app.listen(8080,()=>{
    console.log("server start on 8080 port.")
})