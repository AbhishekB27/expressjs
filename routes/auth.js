const express = require('express')
const router = express.Router();
const fs = require('fs')
const path = require('path')
const { validateSignup,validateLogin } = require('../middlewares/index')
const {createJWT} = require('../helpers/jwt')

router.post('/signup',validateSignup,(req,res)=>{
    try {
        const data = req.body
    const users = JSON.parse( fs.readFileSync(path.join(path.resolve(),'user.json'),{encoding:'utf-8'}) )
    // console.log(quotess[0].hasOwnProperty('id'))
    if(users.find(user=>user.email === data.email)) return res.send('User Already Exist!')
    const user={
        id: users.length === 0 ? 1 : users[users.length -1].id + 1,
        ...data
    }
    fs.writeFileSync(path.join(path.resolve(),'user.json'),JSON.stringify([...users,user]))
    res.send(user)
    } catch (error) {
        res.send(error.message)
    }
})
router.post('/login',validateLogin,(req,res)=>{
    try {
        const {email,password} = req.body
    const users = JSON.parse( fs.readFileSync(path.join(path.resolve(),'user.json'),{encoding:'utf-8'}) )
    // console.log(quotess[0].hasOwnProperty('id'))
    const user = users.find(user=> user.email === email)
    if(!user) return res.send('User Not Found')
    if(user.password != password) return res.send('Incorrect Password.')

    //verified password
    res.json({token :createJWT({id:user.id,email:user.email})})
    } catch (error) {
        res.send(error.message)
    }
})
module.exports = router;