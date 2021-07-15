const db = require('./db/connection.js');
console.log('hello');
const inquirer = require("inquirer");
const cTable = require('console.table');
var PORT = 3001

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


  function addEmployee() {
    dbConnect.query("SELECT * FROM role", (err, res) => {
      if (err) throw err;
      inquirer.prompt([
        {
          type: "input",
          message: "What is the employee's first name?",
          name: "first_name",
        },
        {
          type: "input",
          message: "What is the employee's last name?",
          name: "last_name"
        },
        {
          type: "rawList",
          message: "Which Role does the employee belong to?",
          choices: function () {
            let choicesArray = [];
            res.forEach(res => {
              choicesArray.push(res.title);
            });
            return choicesArray;
          },
          name: "role"
        }
      ]).then(function (answer) {
        const role = answer.role;
        dbConnect.query('SELECT * FROM role', (err, res) => {

          if (err) throw (err);
          let filteredRole = res.filter(res => {
            return res.title == role;
          });

          let id = filteredRole[0].id;
          dbConnect.query("INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, ?)",
            [
              answer.first_name,
              answer.last_name,
              id
            ],
            function (err) {
              if (err) throw err;
              console.log(`You have added this employee: ${(answer.first_name)} ${(answer.last_name)} successfully.`)
            });
          viewEmployees();
        });
      });
    });
  }

  function updateEmployee() {
    dbConnect.query("SELECT * FROM employee", (err, res) => {
      if (err) throw err;
      inquirer.prompt([
        {
          type: "rawList",
          message: "Which employee would you like to update? Please enter their last name.",
          choices: function () {
            chosenEmployee = [];
            res.forEach(res => {
              chosenEmployee.push(res.last_name);
            });
            return chosenEmployee;
          },
          name: "employee"
        }
      ]).then(function (answer) {
        const changeEmployee = answer.employee;

        console.log("Employee Chosen: " + changeEmployee);

        dbConnect.query("SELECT * FROM role", (err, res) => {
          if (err) throw err;
          inquirer.prompt([
            {
              type: "rawList",
              message: "What is this employees new role?",
              choices: function () {
                newRole = [];
                res.forEach(res => {
                  newRole.push(res.title);
                  //push new role into the role title db
                });
                return newRole;
              },
              name: "newRole"
            }
          ]).then(function (update) {
            const updatedRole = update.newRole;
            console.log("Updated Role: " + updatedRole);

            dbConnect.query('SELECT * FROM role WHERE title = ?', [updatedRole], (err, res) => {
              if (err) throw (err);

              let roleID = res[0].id;
              console.log("ROLE id : " + roleID);

              let params = [roleID, changeEmployee];

              dbConnect.query("UPDATE employee SET role_id = ? WHERE last_name = ?", params,
                (err, res) => {
                  if (err) throw (err);
                  console.log(`You have updated ${changeEmployee}'s role to ${updatedRole}.`)
                });
              viewEmployees();
            });
          });
        });
      });
    });
  };
};
startPrompt();