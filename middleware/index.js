const { reset } = require("nodemon")
const fs = require('fs')
const path = require('path')

const greet = (request,response,next)=>{
    console.log("Hello Everyone!. I m middleware.")
    console.log(request.url)
    next()
}

const isAuthorised = (req,res,next)=>{
let users = JSON.parse(fs.readFileSync(path.join(path.resolve(),'user.json'),{encoding:'utf-8'}))
    // console.log(req.headers)
    const {authorization:key} = req.headers
    const user = users.find(u=>u.api_key == key)
    if(user){
        next()
        console.log(user)   
    } 
    else res.send("unauthorized")
}
// check author is valid or not
const isValid = (req,res,next)=>{
    const incomingRequest = req.body
    // console.log(incomingRequest)
    const author_name = `${incomingRequest.first_name} ${incomingRequest.last_name}`
    // console.log(author_name)
    const quotes = JSON.parse(fs.readFileSync(path.join(path.resolve(),'data.json'),{encoding:'utf-8'}))
    const quote = quotes.filter(data => data.author == author_name)
    // console.log(quote)
    if(quote.length != 0){
        res.send(quote)
        console.log(`${author_name} has ${quote.length} quotes.`)
        next()
    }else{
        res.status(500).send("Author Does Not Exist.")
        console.log("Bad😟")
    }
    
}
module.exports = {
    greet,
    isAuthorised,
    isValid
}