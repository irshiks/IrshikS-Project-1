const express = require("express");
const route = express();
const adminController = require("../controllers/adminController");
const multer = require('../config/multer')
const adminAuth = require('../middleware/adminAuth')
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




route.get("/", adminController.loadLogin);

route.get("/addEmploye",adminController.loadAddEmployee);

route.get("/employeeDetails", adminController.loadEmployeeDetails);

route.get("/addDepartment", adminController.loadAddDepartment);

route.get("/about", adminController.loadAbout);

route.get('/employeeProfile',adminController.loadEmployeeProfile)

route.get('/addSalary',adminController.loadAddSalary)

 
// post 

route.post('/addEmployee',multer.upload,adminController.addEmployee,adminController.loadAddEmployee)

route.post ('/addDepartment',adminController.addDesi)

route.post('/addSalary',adminController.addSalary)

route.post('/',adminAuth.verifyAdminLogin,adminController.loadEmployeeDetails)

module.exports = route;