const jwt = require('jsonwebtoken')
const localStorage = require('localStorage')

module.exports = (req, res, next) => {
  try {
    token = localStorage.getItem('Authentication').replace(/["]+/g, '')
    const decoded = jwt.verify(token, process.env.JWT_KEY)
    req.userData = decoded
    next();
  } catch (e) {
      res.status(401).json( { message: "Auth Failed" } )
  }
}
