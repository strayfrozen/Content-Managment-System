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

        }
    ]).then(answer => {
        connection.query('')
        inquirer.prompt([
            {

            }
        ]).then(answer => {
            connection.query('')
            inquirer.prompt([
                {

                }
            ]).then(answer => {
                connection.query('')
                questions()
            })
        })
    })
}