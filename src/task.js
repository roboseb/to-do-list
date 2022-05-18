import { isArguments } from "lodash";
import {taskList} from "./index"
export {Task, TaskHandler, Project}


//Task constructor.
const Task = (name, project, description, dueDate, priority, value, taskChecked) => {
    let taskName = name;
    let taskProj = project;
    let taskDesc = description;
    let taskDate = dueDate;
    let taskPriority = priority;
    let taskValue = value;
    let checked = taskChecked;
    

    const getName = () => { 
        return taskName;
    } 

    const getProject = () => {
        return taskProj;
    }

    const getDesc = () => {
        return taskDesc;
    }

    const getDate = () => {
        return taskDate;
    }

    const getPriority = () => { 
        return taskPriority;
    }

    const getValue = () => {
        return taskValue;
    }

    const getChecked = () => {
        return checked;
    }

    const setChecked = (state) => {
        checked = state;
    }

    return {getName, getDesc, getDate, getPriority, getValue,
            getChecked, setChecked, getProject, taskName, taskProj, taskDesc, taskDate, taskPriority, taskValue, checked}
};

//Used to display tasks and projects.
const TaskHandler = (() => {
    const taskBox = document.getElementById('tasks'); 
    const doneTaskBox = document.getElementById('donetasks'); 
    const projectPanel = document.getElementById('projectpanel');
    const addTaskPanel = document.getElementById('addtask');
    let anyOpen = false;
    let lastProject;
    let currentProject;
    const emptyBoxHeader = taskBox.querySelector('h2');

    const pointsDisplay = document.getElementById('points');

    let points = 0;

    const getCurrent = () => {
        return currentProject;
    }

    const getPoints = () => {
        return points;
    }

    const updatePoints = (change) => {
        points += change;
        pointsDisplay.innerText = `${points} ₪`;

        //Update points in local storage.
        localStorage['points'] = points;
        console.log(localStorage['points']);

        return points;
    }

    const displayTask = (task) => {

        //Add a button to remove task from display and project task list.
        const createDeleteButton = () => {
            const removeTaskButton = document.createElement('button');
            removeTaskButton.classList.add('remove');
            removeTaskButton.innerText = 'remove';

            //Remove task from DOM, tasklist, localStorage, and project tasks.
            removeTaskButton.addEventListener('click', () => {
                newTask.remove();
                currentProject.removeTask(task);


                //Remove local storage for task if it exists.            
                if (localStorage[`task_${task.getName()}`]) {
                    delete localStorage[`task_${task.getName()}`];
                }
                
                const taskIndex = taskList.indexOf(task);
                taskList.splice(taskIndex,1);
            });
            newTask.appendChild(removeTaskButton);
        }

        //Create button to strikethrough task and move to bottom,
        //and do the opposite if already checked.
        const createCheckButton = () => {
            const checkButton = document.createElement('button');
            checkButton.classList.add('checkbtn');

            const checkButtonDiv = document.createElement('div');
            checkButtonDiv.classList.add('checksymbol');

            checkButtonDiv.innerText = '✔️';
            if (task.getChecked()) {
                checkButtonDiv.style.color = 'white';
            }
            

            checkButton.addEventListener('click', () => {
                if (task.getChecked()) {
                    newTask.remove();
                    task.setChecked(false);
                    displayTask(task);

                    //Update checked state in local storage.
                    if (localStorage[`task_${task.getName()}`]) {
                        let updatedTask = task;
                        updatedTask.checked = false;
                        localStorage[`task_${task.getName()}`] = JSON.stringify(updatedTask);
                    }
                    //Remove points based on task value.
                    if (task.getValue() !== undefined) {
                        updatePoints(parseInt(task.getValue()) * -1);
                    }
                   
                } else {
                    newTask.remove();
                    task.setChecked(true);
                    displayTask(task);

                    //Update checked state in local storage.
                    if (localStorage[`task_${task.getName()}`]) {
                        let updatedTask = task;
                        updatedTask.checked = true;
                        localStorage[`task_${task.getName()}`] = JSON.stringify(updatedTask);
                    }                  
                    //Add points based on point value.

                    if (task.getValue() !== undefined) {
                        updatePoints(parseInt(task.getValue()));
                    }
                }
            });
            newTask.appendChild(checkButton);
            checkButton.appendChild(checkButtonDiv);
        }

        const newTask = document.createElement('div');
        const textBox = document.createElement('div');
        
        newTask.classList.add('task');

        let newTaskText = task.getName();
        let taskExpanded = false;

        if (task.getValue()) newTaskText += `\n\n${task.getValue()} ₪`;
        if (task.getPriority()) {
            if (task.getPriority() === 'Low') {
                newTask.classList.add('lowpriority');
            } else {
                newTask.classList.add('highpriority');
            }
            
        } 
        createCheckButton();

      

        if (task.getChecked()) {
            textBox.style.filter = 'opacity(0.5)'
            textBox.style.textDecoration = 'line-through';
        }
        textBox.innerText = newTaskText;
        newTask.appendChild(textBox);
        
        if (!task.getChecked()) {
            
            taskBox.appendChild(newTask);
        } else {
            doneTaskBox.appendChild(newTask);
        }
        

        //Expand task details on click.
        newTask.addEventListener('click', () => {
            if (!taskExpanded) {
                taskExpanded = true;
                newTask.classList.add('expanded');
                newTaskText = task.getName();

                if (task.getDesc()) newTaskText += `\n\n${task.getDesc()}`;
                if (task.getDate()) newTaskText += `\n\nDue ${task.getDate()}`;
                if (task.getPriority()) newTaskText += `\n\n${task.getPriority()} priority`;
                if (task.getValue()) newTaskText += `\n\n${task.getValue()} ₪`;
                
                textBox.innerText = newTaskText;
                createDeleteButton();
            } else {
                taskExpanded = false;
                newTask.classList.remove('expanded');
                let newTaskText = task.getName();
                
                if (task.getValue()) newTaskText += `\n\n${task.getValue()} ₪`;
                
                textBox.innerText = newTaskText;

                //Remove the remove button.
                if (newTask.querySelector('.remove')) {
                    newTask.querySelector('.remove').remove();
                }
                
            }
        });
    }

    const displayProject = (project) => {
        const newProject = document.createElement('div');
        newProject.classList.add('project');
        newProject.innerText = project.getTitle();

        //Create button to delete a project.
        const deleteProjectButton = document.createElement('button');
        deleteProjectButton.innerText = 'X';
        projectPanel.appendChild(newProject);
        projectPanel.appendChild(deleteProjectButton);

        deleteProjectButton.addEventListener('click', () => {
            if (project.isOpen()) {
                hideTasks();
                project.setOpen(false);
                anyOpen = false;
            }

            //Remove local storage for project if it exists.            
            if (localStorage[`proj_${project.getTitle()}`]) {
                delete localStorage[`proj_${project.getTitle()}`];
            }
            

            newProject.remove();
            deleteProjectButton.remove();
        });

        

        newProject.addEventListener('click', () => {
            const projList = Array.from(document.querySelectorAll('.project'));

            //Close if the selected project is open.
            if (project.isOpen()) {
                hideTasks();
                project.setOpen(false);
                anyOpen = false;
                projList.forEach(proj => {
                    proj.classList.remove('openproject');
                });
                

            //Open the selected project.
            } else if (!anyOpen) {
                showTasks(project);
                project.setOpen(true);
                anyOpen = true;
                currentProject = project;
                newProject.classList.add('openproject');

            //Close a currently open project and open the selected one.
            } else {
                hideTasks();
                lastProject.setOpen(false);
                project.setOpen(true);
                showTasks(project);
                currentProject = project;
                projList.forEach(proj => {
                
                    proj.classList.remove('openproject');
                });
                newProject.classList.add('openproject');
            }
            lastProject = project;    
        });
    }

    const showTasks = (project) => {
        //Add the project name as a header to the tasks.
        const projHeader = document.createElement('h2');
        projHeader.innerText = project.getTitle();
        projHeader.classList.add('projheader');
        taskBox.appendChild(projHeader);

        emptyBoxHeader.style.display = 'none';

        //Create button to add a new task.
        const addTaskButton = document.createElement('button');
        addTaskButton.id = 'addtaskbtn';
        addTaskButton.innerText = 'Add Task';
        taskBox.appendChild(addTaskButton);
        addTaskButton.addEventListener('click', () => {
            
            //Toggle add task panel.
            if (addTaskPanel.style.display !== 'flex') {
                addTaskPanel.style.display = 'flex';
            } else {
                addTaskPanel.style.display = 'none';
            }
        });

        //Display all of a project's tasks in priority order;
        project.getTasks().forEach(task => {
            if (task.getPriority() === 'High') displayTask(task); 
        });
        project.getTasks().forEach(task => {
            if (task.getPriority() === 'Low') displayTask(task); 
        });
        project.getTasks().forEach(task => {
            if (!task.getPriority()) displayTask(task); 
        });
    }

    const hideTasks = () => {
        emptyBoxHeader.style.display = 'block';
        const tasks = Array.from(document.querySelectorAll('.task'));
        tasks.forEach(task => {
            task.remove();
        })
        const addTaskButton = taskBox.querySelector('button');
        addTaskButton.remove();

        const projHeader = document.querySelector('.projheader');
        projHeader.remove();
    }

    return {displayProject, getCurrent, displayTask, hideTasks,
            getPoints, updatePoints, showTasks}
})();

//Project constructor.
let Project = (name) => {
    let tasks = [];
    let title = name;
    let projectOpen = false;

    const isOpen = () => {
        return projectOpen;
    }

    const setOpen = (state) => {
        projectOpen = state;
    }

    const getTitle = () => {
        return title;
    }

    const getTasks = () => {
        return tasks;
    }

    const addTask = (...args) => {
        for (let i = 0; i < args.length; i++) {
            tasks.push(args[i]);
        }
    }

    const removeTask = (...args) => {
        for (let i = 0; i < args.length; i++) {
            const index = tasks.indexOf(args[i]);
            if (index > -1) {
                tasks.splice(index, 1); // 2nd parameter means remove one item only
            }
        }
    }

    return {getTitle, getTasks, addTask, removeTask, isOpen, setOpen}
}

