import { Project, Task, TaskHandler } from "./task";
import { projectInput } from "./input";
import {romance, Items} from "./romance"
import _ from 'lodash';
import './styles.css';
export {taskList}
//import { LoaderOptionsPlugin } from "webpack";

//import { container } from "webpack";

let projectList = {};
let taskList = [];

const cock = Task('cock', 'New Project', 'Suck a cock', '2018-07-22', 'Low');
const seb = Task('seb', 'New Project', 'Seb is awesome', '2022-05-15', 'High');
const travis = Task('travis', 'Newproject2');

taskList.push(cock);
taskList.push(seb);
taskList.push(travis);

projectList['New Project'] = Project('New Project');
projectList['Newproject2'] = Project('Newproject2');


//Add projects from local storage to project list.
Object.keys(localStorage).forEach(key => {
    if (key.startsWith('proj_')) {
        projectList[key.slice(5)] = Project(localStorage[key]);
    }
});

//Display all projects in project list.
for (const proj in projectList) {    
    TaskHandler.displayProject(projectList[proj]);
}

//Add tasks from local storage to task list.
Object.keys(localStorage).forEach(key => {
    if (key.startsWith('task_')) {
    
        const localTask = JSON.parse(localStorage[key]);
        const newTask = Task(localTask.taskName, 
                            localTask.taskProj,
                            localTask.taskDesc,
                            localTask.taskDate,
                            localTask.taskPriority,
                            localTask.taskValue,
                            localTask.checked);
        taskList.push(newTask);    
    }
});

//Add tasks to their relevant projects.
taskList.forEach(task => {    
    const taskProject = task.getProject();
    projectList[taskProject].addTask(task);
  
});

//Set points from local storage if it exists.
if (localStorage['points'] !== undefined) {
    TaskHandler.updatePoints(parseInt(localStorage['points']));
}

//Animate cursor when not clicking a button.
document.addEventListener('mousedown', () => {
    const container = document.getElementById('container');
    container.classList.add('mainclicked');
})
document.addEventListener('mouseup', () => {
    const container = document.getElementById('container');
    container.classList.remove('mainclicked');
});