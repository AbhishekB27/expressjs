const { verifyJWT } = require("../helpers/jwt");

const validateSignup = (req,res,next)=>{
    const { email,password } = req.body;
    if(!email || !password)return res.status(401).send('Invalid Fields')
     return next()
}
const validateLogin = (req,res,next)=>{
    const { email,password } = req.body
    if(!email || !password) return res.send('Invalid fields');
    return next()
}
const isAuthorised = (req,res,next)=>{
    const token = req.headers['auth']
    console.log(token)
    if(verifyJWT(token))return next()
   else return res.status(404).send('Access Denied')
}
const validateEmpoyee = (req,res,next)=>{
    const employee = req.body
    if(!employee.employee_name){
        res.status(400).send('Invalid Fields.')
    }
    else next()
}
module.exports = {
    validateSignup,
    validateLogin,
    isAuthorised,
    validateEmpoyee,
}