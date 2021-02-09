const jwt = require('jsonwebtoken')

function getToken(values) {
    return jwt.sign({...values}, process.env.JWT_SECRET, { expiresIn: '1d' })
}

function verifyToken(req,res,next) {
    const authHeader = req.headers['authorization']
    const token = authHeader.split(' ')[1]

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err){
            return res.status(403).json({ message : 'You are not authorized' })
        }
        req.user = user
        next()
    })
}

module.exports = {
    getToken,
    verifyToken
}