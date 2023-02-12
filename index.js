const inquirer = require("inquirer");
const generateTeam = require("./src/template.js");
const Manager = require("./lib/Manager.js");
const Engineer = require("./lib/Engineer.js");
const Intern = require("./lib/Intern.js");
const fs = require("fs")
const path = require("path");
const OUTPUT_DIR = path.resolve(__dirname, "dist");
const outputPath = path.join(OUTPUT_DIR, "team.html");


let officeRoster = [];

function startMenu() {
    inquirer.prompt([{
        type: "list",
        name:"member_list",
        message:"add role",
        choices: ["manager",
                "engineer",
                "intern",
                "finished"
            ]
    }])

    .then(response =>{
        console.log(response)
        if(response.member_list=="manager") {
            addManager()
        }
        else if(response.member_list==="engineer") {
            addEngineer()
        }
        else if(response.member_list==="intern") {
            addIntern()
        }
        else if(response.option==="finished") {
            createTeam()
        }
    })
}

function createTeam() {
    console.log("done")
   fs.writeFileSync(outputPath, generateTeam(officeRoster), "UTF-8")
 }

function addIntern() {
    inquirer.prompt([{
        type: 'input',
        name: 'name',
        message: 'enter interns name'
    },{
        type: 'input',
        name: 'intern_id',
        message: 'enter interns id'
    },{
        type: 'input',
        name: 'intern_email',
        message: 'enter interns email'
    },{
        type: 'input',
        name: 'intern_school',
        message: 'enter interns school'
    }])
    .then((answer) => {
        const newIntern = new Intern(
            answer.name,
            answer.intern_id,
            answer.Intern_email,
            answer.intern_school
        );
        officeRoster.push(newIntern);
        startMenu()
})
}

function addManager() {
    inquirer.prompt([{
        type: 'input',
        name: 'name',
        message: 'enter managers name'
    },{
        type: 'input',
        name: 'id',
        message: 'enter employee ID'
    },{
        type: 'input',
        name: 'email',
        message: 'enter employees email'
    },{
        type: 'input',
        name: 'officeNumber',
        message: 'enter managers office number'
    }])
    .then((answer) => {
    const newManager = new Manager(
        answer.name,
        answer.id,
        answer.email,
        answer.officeNumber
    );
    officeRoster.push(newManager);
    startMenu()
    })
}

function addEngineer() {
    inquirer.prompt([{
        type: 'input',
        name: 'engineer_name',
        message: 'enter engineers name'
    },{
        type: 'input',
        name: 'engineer_id',
        message: 'enter engineers id'
    },{
        type: 'input',
        name: 'engineer_email',
        message: 'enter engineers email'
    },{
        type: 'input',
        name: 'github',
        message: 'enter engineers github'
    }])
    .then((answer) => {
        const newEngineer = new Engineer(
            answer.engineer_name,
            answer.engineer_id,
            answer.engineer_email,
            answer.github
        );
        officeRoster.push(newEngineer);
        startMenu()
})
}

startMenu()

