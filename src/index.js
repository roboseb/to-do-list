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

const solve = Task("Solve a Rubik's cube", 'New Project', "I've been trying way too hard for to long to solve one.", '2018-07-22', 'Low', 40);
const seb = Task('Meet Seb', 'New Project', 'Wow he is such a cool guy really wanna meet him', '2022-05-15', 'High', 60);
const test = Task('Test', "Newproject2", "Hi, I'm a test task. Because of this, I have a way longer description than any task you would probably normally make. I also don't have any info other than a name and a description to show that you can offer any data you'd like to make a task. You don't even actually need a name for your task! Try making one withought and you'll just see an element with only a check button. You will need to have a priority though, so technically it can't be 100% empty. Hey look! the task and donetasks panels expand when they're overflowing! Pretty cool! OK, enough fun, go check out the tour project and play around with the romance panel! Yes, this is a dating simulator as well as a to-do manager. Like the art? Check me out @sebart. Just kidding. I don't post art online like some sort of anarcho-socialist. :) \n\n Wow, look at that little scrolling indicator go, neat. Assuming I got it working anyway. Hey, go listen to Pur by Yameii Online. I've listened to it ten times in a row and my therapist says I'm making really great progress.");

taskList.push(solve);
taskList.push(seb);
taskList.push(test);

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