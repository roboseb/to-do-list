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

//New Project tasks.
const solve = Task("Solve a Rubik's cube", 'New Project', "I've been trying way too hard for to long to solve one.", '2018-07-22', 'Low', 40);
const seb = Task('Meet Seb', 'New Project', 'Wow he is such a cool guy really wanna meet him', '2022-05-15', 'High', 60);
const test = Task('Test', "New Project", "Hi, I'm a test task. Because of this, I have a way longer description than any task you would probably normally make. I also don't have any info other than a name and a description to show that you can offer any data you'd like to make a task. You don't even actually need a name for your task! Try making one withought and you'll just see an element with only a check button. You will need to have a priority though, so technically it can't be 100% empty. Hey look! the task and donetasks panels expand when they're overflowing! Pretty cool! OK, enough fun, go check out the tour project and play around with the romance panel! Yes, this is a dating simulator as well as a to-do manager. Like the art? Check me out @sebart. Just kidding. I don't post art online like some sort of anarcho-socialist. :) \n\n Wow, look at that little scrolling indicator go, neat. Assuming I got it working anyway. Hey, go listen to Pur by Yameii Online. I've listened to it ten times in a row and my therapist says I'm making really great progress.");

//Site tour tasks.
const projectsTour = Task("Project panel", 'Site tour', "You can do a lot in the project panel. Adding and removing projects is easy, try it out! Open a project by clicking on it. Click on a different project to switch to that one, or click on an open project to close it.", '', '', 40);
const tasksTour = Task("Task panel", 'Site tour', "The tasks panel has two sections, one for tasks you've yet to complete, and the other for completed tasks. Click 'Add Task' to do just what it says. Click the circle near a task to mark it complete. Click on a task to expand or condense it. When expanded, you have a button to remove the task.", '', '', 30);
const tasksTour2 = Task("Task panel 2", 'Site tour', "Tasks don't need much info. You can add details such as a description, a due date, and a  point value. Tasks you add will be either low or high priority, which is then displayed in their colour. All scrollable elements have an indicator showing whether their content is overflowing. \n\nNote: tasks and projects must have unique names. Project names are limited in size, and point values are also limited.", '', '', 20);
const romanceTour = Task("Romance panel", 'Site tour', "The romance panel is where things really start to spice up. You should have some points from completing default tasks by now. You can interact with the shop and inventory panels by clicking on their buttons. Inside the shop, hover over items to see their names and prices. Pick one you can afford, and click! Now switch to the inventory panel and click on it again to give it to Loretta. Try to find the gifts she likes the most based on her reaction!", '', '', 50);
const dataTour = Task("Local data", 'Site tour', "This site store data from your tasks, projects, points, and romance panel. You can click 'Delete local data' in the project panel to see options relating to different data you can remove.", '', '', 35);

//const projects = Task("Project panel", 'Site tour', "", '', '', 40);


const newProject = Project('New Project');
const tour = Project('Site tour');




//Create default projects and tasks if page has not been visited.
if (!localStorage['pagevisited']) {
    localStorage['pagevisited'] = true;

    localStorage['proj_New Project'] = newProject.getTitle();
    localStorage['proj_Site tour'] = tour.getTitle();

    localStorage["task_Solve a Rubik's cube"] = JSON.stringify(solve);
    localStorage['task_Meet Seb'] = JSON.stringify(seb);
    localStorage["task_Test"] = JSON.stringify(test);

    localStorage["task_Project panel"] = JSON.stringify(projectsTour);
    localStorage["task_Task panel"] = JSON.stringify(tasksTour);
    localStorage["task_Task panel 2"] = JSON.stringify(tasksTour2);
    localStorage["task_Romance panel"] = JSON.stringify(romanceTour);
    localStorage["task_Local data"] = JSON.stringify(dataTour);
}


//Add projects from local storage to project list.
Object.keys(localStorage).forEach(key => {
    if (key.startsWith('proj_')) {
        projectList[key.slice(5)] = Project(localStorage[key]);
    }
});

console.log(projectList);

//Display all projects in project list.
for (let i = 0; i < Object.keys(projectList).length; i++) {    
    console.log(Object.keys(projectList)[i]);
    
    TaskHandler.displayProject(projectList[Object.keys(projectList)[i]]);
    

    // console.log(projectList[proj]);
    // console.log(projectList[proj].getTitle());
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

    if (projectList[taskProject] !== undefined) {
        projectList[taskProject].addTask(task);
    }
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

//Add functionality to reset buttons.
const Reset = (() => {
    const panelButton = document.getElementById('openresetbtn');
    const taskButton = document.getElementById('taskresetbtn');
    const romanceButton = document.getElementById('romanceresetbtn');
    const pointButton = document.getElementById('pointresetbtn');

    const resetButtons = [taskButton, romanceButton, pointButton];
    let panelOpen = false;

    //Open reset options on click of delete local data button.
    panelButton.addEventListener('click', () => {
        if (!panelOpen) {
            resetButtons.forEach(button => {
                button.style.display = 'block';
            });
            panelOpen = true;
        } else {
            resetButtons.forEach(button => {
                button.style.display = 'none';
            });
            panelOpen = false;
        }
    });

    //Delete local task and project data on reset tasks click.
    taskButton.addEventListener('click', () => {
        Object.keys(localStorage).forEach(key => {
            if (key.startsWith('task_') || key.startsWith('proj_')) {
                delete localStorage[key];
            }
        });

        delete localStorage['pagevisited'];
    });

    //Delete local romance data on romance button click.
    romanceButton.addEventListener('click', () => {
        Object.keys(localStorage).forEach(key => {
            if (!key.startsWith('task_') && !key.startsWith('proj_') && !key.startsWith('points')) {
                delete localStorage[key];
            }
        });
    });

    //Delete local point data on point button click.
    pointButton.addEventListener('click', () => {
        delete localStorage['points'];
    });
})();


