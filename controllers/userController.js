const Employee = require('../models/Employee')






const loadLogin = async(req,res)=>{
    res.render('login')
}

const loadDashboard = async(req,res)=>{
    const userSession = req.session
    const employeeDetails = await Employee.findById({ _id: userSession.user_id })
    var currentDate = new Date();

    // Get the month
    var month = currentDate.toLocaleString('default', { month: 'long' });
    
    // Get the year
    var year = currentDate.getFullYear();
    
    // Get the date in a specific format
    var day = ("0" + currentDate.getDate()).slice(-2);
    
    // Format the date as desired
    var formattedDate = day + ' ' + month + ' ' + year;
    
    // console.log(formattedDate); // Output: 14 June 2023
    
    // console.log(employeeDetails);

    const salData = employeeDetails.monthSalary

    res.render('dashboard',{employeeDetails,session: req.session.user_id,date:formattedDate,salData})
}

const loadAbout = async(req,res)=>{
    res.render('about')
}





module.exports={
    loadDashboard,
    loadLogin,
    loadAbout,
}