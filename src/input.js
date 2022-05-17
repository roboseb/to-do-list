import { Project, Task, TaskHandler } from "./task";
import {taskList} from "./index"

const projectInput = (() => {

    const projPanel = document.getElementById('addproject');
    const addProjButton =  document.getElementById('addprojbtn');
    const addProjInput = document.getElementById('addprojectname');
    const projPanelButton = document.getElementById('openprojpanel');
    const closeProjPanelBtn = document.getElementById('closeprojpanel');

    const taskPanel = document.getElementById('addtask');
    const addTaskButton =  document.getElementById('addtaskbtn');
    const addTaskName = document.getElementById('addtaskname');
    const addTaskDesc = document.getElementById('addtaskdesc');
    const addTaskDate = document.getElementById('addtaskdate');
    const addTaskValue = document.getElementById('addtaskvalue');
    
    const closeTaskPanelBtn = document.getElementById('closetaskpanel');

    addProjButton.addEventListener('click', () => {
        //Generate a list of project names.
        let projectList = Array.from(document.querySelectorAll('.project'));
        let projectNames = [];
        projectList.forEach(proj => {
            projectNames.push(proj.innerText);
        })
        
        //Prevent making a new project using an existing name.
        if (projectNames.includes(addProjInput.value)) {
            alert('Project already exists with that name.');
        } else if (addProjInput.value.length > 15) {
            alert('Project names are limited to 15 characters.')
        } else {
            const newProject = Project(addProjInput.value);
            TaskHandler.displayProject(newProject);
            
            //Add project to local storage.
            localStorage[`proj_${newProject.getTitle()}`] = newProject.getTitle();
        }
    });

    addTaskButton.addEventListener('click', () => {

        //Prevent adding a task using an existing task name.
        let taskNames = [];
        taskList.forEach(task => {
            taskNames.push(task.getName());
        }); 
        if (taskNames.includes(addTaskName.value)) {
            alert('Project already exists with that name.');
            return;
        }
        
        const addTaskPriority = document.querySelector('input[name="priority"]:checked').value;
        const newTask = Task(addTaskName.value, TaskHandler.getCurrent().getTitle(), addTaskDesc.value, addTaskDate.value, addTaskPriority, addTaskValue.value);
        
     
        TaskHandler.getCurrent().addTask(newTask);
        TaskHandler.displayTask(newTask);
        TaskHandler.hideTasks();
        TaskHandler.showTasks(TaskHandler.getCurrent());

        //Add task to local storage.
        localStorage[`task_${newTask.getName()}`] = JSON.stringify(newTask);
        taskList.push(newTask);

    });

    projPanelButton.addEventListener('click', () => {
        if (projPanel.style.display !== 'flex') {
            projPanel.style.display = 'flex';
        } else {
            projPanel.style.display = 'none';
        }
    });

    closeProjPanelBtn.addEventListener('click', () => {
        projPanel.style.display = 'none';
    });

    closeTaskPanelBtn.addEventListener('click', () => {
        taskPanel.style.display = 'none';
    });
})();

export {projectInput}