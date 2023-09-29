const express = require('express')
const route = express()

const userController = require('../controllers/userController')
const userAuth = require('../middleware/userAuth')
const session = require('express-session')
const cookieParser=require('cookie-parser')
const config = require('../config/config')




//session
route.use(cookieParser());

route.use(
  session({
    secret: config.secretKey,
    saveUninitialized: true,
    resave: true,
    cookie: {
      maxAge: config.maxAge,
    },
  })
);







route.get('/profile',userController.loadDashboard)

route.get('/',userController.loadLogin)

route.get('/about',userController.loadAbout)



route.post('/',userAuth.verifyLogin)



module.exports = route