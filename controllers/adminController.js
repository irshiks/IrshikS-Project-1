const Employee = require("../models/Employee");

const Designation = require("../models/DesiModel");
const { log } = require("handlebars");
// const DesiModel = require("../models/DesiModel");

const loadDashboard = async (req, res) => {
  res.render("dashboard");
};

const loadAddEmployee = async (req, res) => {
  const Desi = await Designation.find({});
  res.render("addEmployee", { Desi });
};

const loadEmployeeDetails = async (req, res) => {
  const employeeDetails = await Employee.find({}).sort({ _id: -1 });
  res.render("employeeDetails", { employeeDetails });
};

const loadAddDepartment = async (req, res) => {
  res.render("addDepartment");
};

const loadAbout = async (req, res) => {
  res.render("about");
};

const addDesi = async (req, res) => {
  const { desi } = req.body;

  await new Designation({
    desi,
  })
    .save()
    .then(() => {
      res.redirect("/admin");
    });
};

const loadLogin = async (req, res) => {
  res.render("adminLogin");
};

const getDesi = async () => {
  const desi = await Designation.find({});
  console.log(desi);
  return desi;
};

const addEmployee = async (req, res, next) => {
  try {
    const image = req.files;
    console.log(req.body.name);

    const userData = await Employee.findOne({ email: req.body.email });
    const userData1 = await Employee.findOne({ mobile: req.body.mobile });

    if (userData || userData1) {
      const Desi = await getDesi();
      res.render("addEmployee", {
        message: "This account already exist",
        Desi,
      });
    } else {
      const employee = new Employee({
        name: req.body.name,
        salary: req.body.salary,
        email: req.body.email,
        mobile: req.body.mobile,
        address: req.body.address,
        pin: req.body.pin,
        state: req.body.state,
        country: req.body.country,
        birthday: req.body.birthday,
        ifsc: req.body.ifsc,
        bank: req.body.bank,
        acc: req.body.acc,
        image: req.file.filename,
        desi: req.body.desi,
        isAdmin: false,
      });

      await employee.save().then(() => console.log("Employee Saved"));

      next();
    }
  } catch (error) {
    console.log(error.message);
  }
};

const loadEmployeeProfile = async (req, res) => {
  const profile = await Employee.findOne({ _id: req.query.id });

  res.render("profile", { profile, id: req.query.id });
};

const loadAddSalary = async (req, res) => {
  const user = await Employee.findById(req.query.id);
  res.render("addSalary", { id: req.query.id, salary: user.salary });
};

const addSalary = async (req, res) => {
  try {
    const { salary, month, Incentive, deduction,healthInsurance,socialSecurity, id } = req.body;

    const salData = {
      month, Incentive, deduction ,salary,socialSecurity,healthInsurance
    }

    // Update the employee's data using $push
    Employee.findByIdAndUpdate(id, {
      $push: {  
        monthSalary: salData,
        
      },
    })
      .then((data) => {
        console.log(data);
        res.redirect(`/admin/employeeProfile?id=${id}`);
      })
      .catch((error) => console.log(error));
  } catch (error) {} 
};  
module.exports = {
  loadDashboard,
  loadAddEmployee,
  loadEmployeeDetails,
  loadAddDepartment,
  loadAbout,
  addEmployee,
  addDesi,
  loadEmployeeProfile,
  loadLogin,
  loadAddSalary,
  addSalary,
};
