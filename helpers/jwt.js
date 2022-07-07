const jwt = require('jsonwebtoken')
const secret_key = 'abhiaws@12345';
const createJWT = (payload)=>{
   const token = jwt.sign(payload,secret_key,{expiresIn:'86400s'})
   return token
}
const verifyJWT = (token)=>{
    try {
        const isVerified = jwt.verify(token,secret_key)
    if(isVerified)return true
    else return false
    } catch (error) {
        return false
    }
}
const decodeJWT = (token)=>{
    const decode = jwt.decode(token)
    console.log(decode)
}
module.exports = {
    createJWT,
    verifyJWT,
    decodeJWT,
}