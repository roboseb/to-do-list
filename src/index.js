import { Project, Task, TaskHandler } from "./task";
import { projectInput } from "./input";
import _ from 'lodash';
import './styles.css';

//import { container } from "webpack";

function allStorage() {

    let values = [],
        keys = Object.keys(localStorage),
        i = keys.length;

    while ( i-- ) {
        values.push( localStorage.getItem(keys[i]) );
    }

    return values;
}

const test = Task('cock', 'Suck a cock', '2018-07-22', 'Low');
const seb = Task('seb', 'Seb is awesome', '2022-05-15', 'High');
const travis = Task('travis');


const newProject = Project('New Project');


const newProject2 = Project('Newproject2');





//eval('const ' + allStorage()[1] + '= ' + allStorage()[1] + ';');

Function('const ' + 'testproject' + '= ' + 'hi this is a test' + ';');

function looseJsonParse(obj) {
    return Function('"use strict";return (' + obj + ')')();
}

console.log(testproject);

console.log(allStorage()[1]);






TaskHandler.displayProject(newProject);
TaskHandler.displayProject(newProject2);

newProject.addTask(test, seb, travis);
newProject2.addTask(test, test, test);

const buttons = Array.from(document.querySelectorAll('.project'));

// buttons.forEach(button => {
//     button.addEventListener('click', () => {
//         console.log(`newProject is open? ${newProject.isOpen()}`);
//         console.log(`newProject2 is open? ${newProject2.isOpen()}`);
//     })
// });


//Animate cursor when not clicking a button.
document.addEventListener('mousedown', () => {
    const container = document.getElementById('container');
    container.classList.add('mainclicked');
})
document.addEventListener('mouseup', () => {
    const container = document.getElementById('container');
    container.classList.remove('mainclicked');
});



console.log(allStorage());