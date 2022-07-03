const { verifyJWT } = require("../helpers/jwt");

const validateSignup = (req,res,next)=>{
    const { name,email,password } = req.body;
    if(!name || !email || !password){
        return res.send('Invalid Fields')
    }
     return next()
}
const validateLogin = (req,res,next)=>{
    const { email,password } = req.body
    if(!email || !password) return res.send('Invalid fields');
    return next()
}
const isAuthorised = (req,res,next)=>{
    const token = req.headers['auth']
    if(verifyJWT(token)) return next()
    else return res.send('Access Denied')
}
module.exports = {
    validateSignup,
    validateLogin,
    isAuthorised,
}