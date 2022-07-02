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

module.exports = {
    greet,
    isAuthorised
}