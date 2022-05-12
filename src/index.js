import { Project, Task, TaskHandler } from "./task";
import { projectInput } from "./input";
import _ from 'lodash';
import './styles.css';

//import { container } from "webpack";

const test = Task('cock', 'Suck a cock', '2018-07-22');
const seb = Task('seb');
const travis = Task('travis');


const newProject = Project('New Project');


const newProject2 = Project('Newproject2');



TaskHandler.displayProject(newProject);
TaskHandler.displayProject(newProject2);

newProject.addTask(test, seb, travis)
newProject2.addTask(test, test, test)

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
})

