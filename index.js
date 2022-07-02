const { response } = require('express')
const express = require('express')
const app = express()
app.use(express.json()) // it is inbuilt middleware
const fs = require('fs')
const path = require('path')
const {greet,isAuthorised} = require('./middleware/index')
const shortid = require('shortid')

//fetch quotes data
let accounts = JSON.parse(fs.readFileSync(path.join(__dirname,'MOCK_DATA.json'),{encoding:'utf-8'}))
// console.log(accounts)
//fetch all acounts
  app.get('/accounts',isAuthorised,(request,response)=>{
    response.json(accounts)
  });
  //add api-key
  app.post('/accounts',(request,response)=>{
    try {
      const users = JSON.parse(fs.readFileSync(path.join(__dirname,'user.json'),{encoding:'utf-8'}))
      console.log(users)
      const {email} = request.body;
      const user = {
      email,
      api_key:shortid.generate()
    }
    users.push(user)
    fs.writeFileSync(path.join(__dirname,'user.json'),JSON.stringify([...users]))
    response.send(users)
    } catch (error) {
      response.send(error.message)
    }
  })
app.listen(8080,()=>{
    console.log("server start on 8080 port.")
})