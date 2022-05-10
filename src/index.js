import { Project, Task, TaskHandler } from "./task";
import _ from 'lodash';
import './styles.css';

const test = Task('cock', 'Suck a cock');
const seb = Task('seb');
const travis = Task('travis');

const newProject = Project('New Project');
const newProject2 = Project('Newproject2');


TaskHandler.displayProject(newProject);
TaskHandler.displayProject(newProject2);



newProject.addTask(test, seb, travis)
newProject2.addTask(test, test, test)

const buttons = Array.from(document.querySelectorAll('.project'));

buttons.forEach(button => {
    button.addEventListener('click', () => {
        console.log(`newProject is open? ${newProject.isOpen()}`);
        console.log(`newProject2 is open? ${newProject2.isOpen()}`);
    })
});

