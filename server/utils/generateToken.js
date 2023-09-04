const jwt = require('jsonwebtoken') 
 
 
 const generateToken = (res, userInfo) => {
    const payload = { id: userInfo._id }

    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn: '30d'})

    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000  // 30 days in milliseconds
    })
 }

 module.exports = generateToken;