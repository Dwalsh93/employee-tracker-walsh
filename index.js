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
  const sql = `SELECT * FROM department`;
  db.query(sql, (err, res) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    const table = cTable.getTable(res)
    console.log(table)
  });

};

function viewAllRoles() {
  const sql = `SELECT * FROM roles`;
  db.query(sql, (err, res) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    const table = cTable.getTable(res)
    console.log(table)
  });
};

function viewAllEmployees() {
  const sql = `SELECT * FROM employee`;
  db.query(sql, (err, res) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    const table = cTable.getTable(res)
    console.log(table)
  });
};

function addNewDepartment() {
  inquirer.prompt([
    {
      type: "input",
      name: "departmentName",
      message: "What department will you create?"
    }
  ]).then(function (userResponse, err) {
    dbConnect.query(
      "INSERT INTO department SET ?",
      {
        name: answer.addNewDepartment,
      },
      function (err) {
        if (err) throw err;
        console.log("Department Created");
        startPrompt();
      }
    );
  });
}

function addNewRoles() {
  dbConnect.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    inquierer.prompt([
      {
        type: "input",
        message: "What Role will you create?",
        name: "newRole"
      },
      {
        type: "input",
        message: "Please enter the salary for this role",
        name: "salary"
      },
      {
        type: "parentList",
        message: "What department will this role be added to?",
        choices: function () {
          let choicesArray = [];
          res.forEach(res => { choicesArray.push(res.name) });
          return choicesArray;
        },
        name: "department"
      }
    ]).then(function (userResponse, err) {
      const dept = answer.department;
      dbConnect.query('SELECT * FROM department', (err, res) => {

        if (err) throw (err);
        let filteredDept = res.filter(res => {
          return res.name == dept;
        });

        let id = filteredDept[0].id;
        dbConnect.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
          [
            answer.newRole,
            parseInt(answer.salary),
            id
          ],
          function (err) {
            if (err) throw err;
            console.log('(`${(answer.newRole).toUpperCase()} has been added successfully.')
          })
        viewAllRoles();
      });
    });
  });

    function addNewEmployee() {
      // inquire: "New Employee Name"
      // "What role does this employee play?"
      // "What is this employee's salary?"
      // use addnewroles as a reference.
    };

    function updateEmployeeRole() {
      // see addnewroles as reference 
    };