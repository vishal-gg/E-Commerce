const jwt = require('jsonwebtoken') 
 
 
 const generateToken = (res, userInfo) => {
    const payload = { id: userInfo._id }

    const token = jwt.sign(payload, b2b8f1396ced2bbf0095173020a2f8448a4d844a7cd3e33f56d28bb44f1f8d31, {expiresIn: '30d'})

    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000  // 30 days in milliseconds
    })
 }

 module.exports = generateToken;