const mysql = require('mysql2');
const inquirer = require('inquirer')

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: 'Piggys121212!',
    database: 'employeedb'
})

connection.connect(err => {
    if (err) throw err
    questions()
})

function questions() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'main',
            message: 'What would you like to do?',
            choices: ['view all', 'add new employee', 'update employees role', 'terminate employee', 'view all employees', 'view all departments', 'view all roles']
        }

    ]).then(answer => {
        if (answer.main === 'view all') {
            viewAll()
        } else if (answer.main === 'add new employee') {
            addNewEmployee()
        } else if (answer.main === 'update employees role') {
            updateEmployeesRole()
        } else if (answer.main === 'terminate employee') {
            terminate()
        } else if (answer.main === 'view all employees') {
            viewAllEmployees()
        } else if (answer.main === 'view all departments') {
            viewAllDepartments()
        } else if (answer.main === 'view all roles') {
            viewAllRoles()
        }
    })
}

function viewAll() {
    connection.query('SELECT * FROM department INNER JOIN employee ON role_id = department.id INNER JOIN role ON department_id = employee.id;', (err, res) => {
        if (err) throw err;
        console.table(res)
        questions()
    })
}

function addNewEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'department',
            message: 'What department will your employee be working in?'
        }
    ]).then(answer => {
        connection.query('INSERT INTO department SET ?',
            {
                name: answer.department
            }
        )
        inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'What is the role title for your employee?'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary for your employee?'
            },
            {
                type: 'input',
                name: 'departmentId',
                message: 'What is the ID for your employee?'
            },

        ]).then(answer2 => {
            connection.query('INSERT INTO role SET ?;', {
                title: answer2.title,
                salary: answer2.salary,
                department_id: answer2.departmentId
            })
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'first',
                    message: 'What is the first name of your employee?'
                },
                {
                    type: 'input',
                    name: 'last',
                    message: 'What is the last name of your employee?'
                },
                {
                    type: 'input',
                    name: 'roleId',
                    message: 'What is the ID for your employee?'
                },

            ]).then(answer3 => {
                connection.query('INSERT INTO employee SET ?',
                    {
                        first_name: answer3.first,
                        last_name: answer3.last,
                        role_id: answer3.roleId
                    }
                )
                questions()
            })
        })
    })
}

function updateEmployeesRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'What is the id of the employee you are updating?'
        },
        {
            type: 'input',
            name: 'role',
            message: 'What is the new role of the employee you are updating?'
        }
    ]).then(answer => {
        connection.query('UPDATE role SET ? WHERE ?',
            [
                {
                    title: answer.role
                },
                {
                    department_id: answer.id
                }
            ]
        )
        questions()
    })
}

function viewAllEmployees() {
    connection.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err;
        console.table(res)
        questions()
    })
}

function viewAllDepartments() {
    connection.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        console.table(res)
        questions()
    })
}

function viewAllRoles() {
    connection.query('SELECT * FROM role', (err, res) => {
        if (err) throw err;
        console.table(res)
        questions()
    })
}