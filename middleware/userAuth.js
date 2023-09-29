const bcrypt = require('bcrypt')
const employeeModel = require('../models/Employee');
const { log } = require('handlebars');







const verifyLogin = async (req, res, next) => {
    try {
      const email = req.body.email;
      console.log(email);  
      const userData = await employeeModel.findOne({ email });
    
      if (userData) {
        const password = req.body.password
        
        
  
        if (password==userData.mobile) {
          if (userData) {
            req.session.user_id = userData._id;
            req.session.user_name = userData.name;
            res.redirect("/profile");
          } else {
            console.log('1');
            res.render("login");
          }
        } else {
            console.log('2');
          res.render("login", { message: "Invalid password" });
        }
      } else {
        console.log('3');
        res.render("login", { message: "Account not found" });
      }
    } catch (error) {
      console.log(error.message);
    }
  };






  module.exports={
    verifyLogin,

  }