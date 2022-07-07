const express = require('express')
const router = express.Router();
const fs = require('fs')
const path = require('path')
const { validateSignup} = require('../middlewares/index')
const { validateLogin } = require('../middlewares/index')
const {createJWT} = require('../helpers/jwt')

router.post('/signup',validateSignup,(req,res)=>{
    try {
        const users = JSON.parse(fs.readFileSync(path.join(path.resolve(),'user.json'),{encoding:'utf-8'}))
        const data = req.body
        // console.log(data)
        if(users.length === 0){
            const user = {
                id: users.length === 0 ? 1 : users[users.length - 1].id + 1,
                ...data
            }
            fs.writeFileSync(path.join(path.resolve(),'user.json'),JSON.stringify([...users,user]))
            res.status(201).send(user)
            console.log('1 User Added Successfully');
        }
        else{
            if(users.find(user=>user.email === data.email)){
                res.status(404).send('User Already Exist')
            }
            else{
                const user = {
                    id: users.length === 0 ? 1 : users[users.length - 1].id + 1,
                    ...data
                }
                fs.writeFileSync(path.join(path.resolve(),'user.json'),JSON.stringify([...users,user]))
                fs.readFile(path.join(path.resolve(),'user.json'),(err,data)=>{
                    if(err)
                    {
                        res.status(404).send(err.message)
                    }
                    else{
                        res.status(200).send(data)
                    }
                });
            }
        }

    } catch (error) {
        res.status(400).send(error.message)
        console.log(error.message)
    }
})
router.post('/login',validateLogin,(req,res)=>{
    try {
      const {email,password} = req.body;
      const users = JSON.parse(fs.readFileSync(path.join(path.resolve(),'user.json'),{encoding:'utf-8'}))
      const user = users.find(data=>data.email === email)
      if(!user)return res.send("User not found.")
      if(user.password != password)return res.send('Password does not match.')
    //verified password
    res.json({token:createJWT({email:user.email,password:user.password})})
    } catch (error) {
        res.send(error.message)
    }
})
module.exports = router;