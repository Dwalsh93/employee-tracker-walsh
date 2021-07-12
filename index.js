const db = require('./db/connection.js');
console.log('hello');
const inquirer = require("inquirer");
const cTable = require('console.table');

// Start server after DB connection
db.connect(err => {
  if (err) throw err;
  console.log('Database connected.');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

function startPrompt() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'prompts',
      message: 'Select from the following prompts',
      choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update Employee']
    }

  ]).then(function (userResponse, err) {
    if (userResponse.prompts === 'View All Departments') {
      viewAllDepartments();
    }
    else if (userResponse.prompts === 'View All Roles') {
      viewAllRoles();
    }
    else if (userResponse.prompts === 'View All Employees') {
      viewAllEmployees();
    }
    else if (userResponse.prompts === 'Add a Department') {
      addNewDepartment();
    }
    else if (userResponse.prompts === 'Add a Role') {
      addNewRoles();
    }
    else if (userResponse.prompts === 'Add an Employee') {
      addNewEmployee();
    }
    else if (userResponse.prompts === 'Update Employee') {
      updateEmployeeRole();
    }
    else { throw err; }

  })
};

function viewAllDepartments() {
  //we need sql syntax
  //sql queries
  const sql = `SELECT * FROM department`;
  db.query(sql, (err, res) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    const table = cTable.getTable(res) 
    console.log(table)
  });
  // console.table
  // sales 
  // engineers
  // marketing
};

function viewAllRoles() {
  // console.table
  // Social Media Manager
  // Engineer
  // Cashier
};

function viewAllEmployees() {
  // console.table 
  // John Snow
  // Sam Tulley
  // Sansa Stark
  // Theon Greyjoy
  // Arya Stark
  // The Hound 
};

function addNewDepartment() {
  // capture value 
  // inquire: "what department are you adding?"  
};

function addNewRoles() {
  // inquire: "What department is the role connected to? multiple choice: 1 - Marketing, 2 - Eng, 3 - Sales"
  //on the BACK end, the actual VALUE connected to the multiple choice should be the dept_id
  //so if theuser chooses Marketing, what they've selected in the back end is 1
  //inquirer for the choices you can have the "name" (which is what the user sees) but you can also assign it a value (back end)
  // message: "Please choose which department the role belongs to.",
  // choices: [
  //   { name: "Student", value: 7 },
  //   { name: "Professor", value: 8 },
  //   { name: "Chaos", value: 9 },
  //   { name: "Ghosts", value: 10 },
  //   { name: "House Elves", value: 11 }

  // "what new role would you like to add?"
  // "what is the salary for this role"
};

function addNewEmployee() {
  // inquire: "New Employee Name"
  // "What role does this employee play?"
  // "What is this employee's salary?"
  // use addnewroles as a reference.
};

function updateEmployeeRole() {
  // see addnewroles as reference 
};