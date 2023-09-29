const bcrypt = require('bcrypt')
const employeeModel = require('../models/Employee');
const { log } = require('handlebars');







const verifyAdminLogin = async (req, res, next) => {
    try {
      const email = req.body.email;
      console.log(email);  
      const userData = await employeeModel.findOne({ email });
    
      if (userData.isAdmin) {
        const password = req.body.password
        
        
  
        if (password==userData.mobile) {
          if (userData) {
            req.session.user_id = userData._id;
            req.session.user_name = userData.name;
            next();
          } else {
            console.log('1');
            res.render("adminLogin");
          }
        } else {
            console.log('4');
          res.render("adminLogin", { message: "Invalid password" });
        }
      } else {
        console.log('3');
        res.render("adminLogin", { message: "Account not found" });
      }
    } catch (error) {
      console.log(error.message);
    }
  };






  module.exports={
    verifyAdminLogin,

  }