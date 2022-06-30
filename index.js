const { response } = require('express')
const express = require('express')
const app = express()
app.use(express.json()) // it is inbuilt middleware
const fs = require('fs')
const { request } = require('http')
const path = require('path')

//fetch quotes data
let accounts = JSON.parse(fs.readFileSync(path.join(__dirname,'MOCK_DATA.json'),{encoding:'utf-8'}))
// console.log(accounts)
//fetch all acounts
  app.get('/accounts',(request,response)=>{
    response.json(accounts)
  });
  //fetch accounts by id
  app.get('/accounts/:id',(request,response)=>{
    const accountId = Number(request.params.id)
    const getAccount = accounts.find(data=>data.id === accountId)
    if(getAccount === undefined){
        response.status(500).send("Account Does Not Exist.")
    }
    else{
        console.log(getAccount)
        console.log(accountId)
        response.json(getAccount)
    }
  })
  //add account 
  app.post('/accounts',(request,response)=>{
    const incomingRequest = request.body
    // console.log(incomingRequest)
    let newData = {
      id: accounts[accounts.length -1].id + 1,
      ...incomingRequest,
    }
    fs.writeFileSync(path.join(__dirname,'MOCK_DATA.json'),JSON.stringify([...accounts,newData]))
    console.log(newData)
    response.json(newData)
  })
  //update data 
  app.put('/accounts/:id',(request,response)=>{
    try {
      const accountId = Number(request.params.id)
      const incomingRequest = request.body
      const account = accounts.find(data=>data.id == accountId)
      const index = accounts.indexOf(account)
      console.log(account)
      if(!account){
        response.status(500).json("Account Not Found Please! enter valid id")
      }
      else{
        const updateAccount = {...account,...incomingRequest}
        accounts[index] = updateAccount;
        console.log(`${account.first_name}'s Account Updated Successfully.`)
        fs.writeFileSync(path.join(__dirname,'MOCK_DATA.json'),JSON.stringify([...accounts]));
        response.send(accounts)
      }
    } catch (error) {
      response.json(error.message)
    }
  })
  //delete user by id
  app.delete('/accounts/:id',(request,response)=>{
    const accountId = Number(request.params.id)
    const filteredAccount = accounts.filter(data=>data.id != accountId);
    if(!filteredAccount){
      response.status(500).send("Account Not Found.")
    }
    else{
      accounts = filteredAccount
      fs.writeFileSync(path.join(__dirname,'MOCK_DATA.json'),JSON.stringify([...accounts]))
      response.send(accounts)
    }
  })
app.listen(8080,()=>{
    console.log("server start on 8080 port.")
})