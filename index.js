const db = require('./db/connection.js');
console.log('hello');
const inquirer = require("inquirer");

// Start server after DB connection
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });

function startPrompt() {
  // "Select from the following prompts"
  // view all departments
  // view all roles
  // view all employees
  // add a department
  // add a role 
  // add an employee
  // update employee role
};

// else if statements

function viewAllDepartments() {
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