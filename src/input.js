import { Project, Task, TaskHandler } from "./task";

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
        const newProject = Project(addProjInput.value);
        TaskHandler.displayProject(newProject);
    });

    addTaskButton.addEventListener('click', () => {
        console.log(this)
        
        const addTaskPriority = document.querySelector('input[name="priority"]:checked').value;
        const newTask = Task(addTaskName.value, addTaskDesc.value, addTaskDate.value, addTaskPriority, addTaskValue.value);
        
     
        TaskHandler.getCurrent().addTask(newTask);
        TaskHandler.displayTask(newTask);
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