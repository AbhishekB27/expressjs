const jwt = require('jsonwebtoken')
const secret_key = 'Abhishek12345'
const createJWT = (payload)=>{
    return jwt.sign(payload,secret_key,{expiresIn:"86400s"})
}
const verifyJWT = (token)=>{
    try {
        const isVerified = jwt.verify(token,secret_key)
        if(isVerified) return true;
        else return false;
    } catch (error) {
        return false
    }
}
const decodeJWT = (token)=>{
    jwt.decode(token)
}
module.exports = {
    createJWT,
    verifyJWT,
    decodeJWT,
}