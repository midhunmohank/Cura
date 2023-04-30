const passport = require('passport')
const models = require('../models/user_credentials.model')
const auth = require('../middleware/auth')
const JwtStrategy = require('passport-jwt').Strategy
const jwt = require('jsonwebtoken')

require('dotenv').config();

/**
 * Extracts token from: header, body or query
 * @param {Object} req - request object
 * @returns {string} token - decrypted token
 */
const jwtExtractor = req => {

  let token = null
  if (req.headers.authorization) {
    token = req.headers.authorization.replace('Bearer', '').trim()
  } else if (req.body.token) {
    token = req.body.token.trim()
  } else if (req.query.token) {
    token = req.query.token.trim()
  }else if(req.header('x-auth-token')){
    token = req.header('x-auth-token')
  }else if(req.header('x-access-token')){
    token = req.header('x-access-token')
  }

  if (token) {
    
    // Decrypts token
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
   
  } 
  return token
}

/**
 * Options object for jwt middlware
 */


const jwtOptions = {
  jwtFromRequest: jwtExtractor,
  secretOrKey: process.env.JWT_SECRET
}

/**
 * Login with JWT middleware
 */
const jwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {
  try{
    const user = await models.findOne({_id : payload.UserCredential});

    return !user ? done(null, false) : done(null, user)

  }catch(err){
    return done(err, false)
  }
})

passport.use(jwtLogin)

