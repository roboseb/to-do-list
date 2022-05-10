import { isArguments } from "lodash";

//Task constructor.
const Task = (name, description, dueDate, priority, value) => {
    let taskName = name;
    let taskDesc = description;
    let taskDate = dueDate;
    let taskPriority = priority;
    let taskValue = value;

    const getName = () => { 
        return taskName;
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

    return {getName, getDesc, getDate, getPriority, getValue}
};

//Used to display tasks and projects.
const TaskHandler = (() => {
    const taskBox = document.getElementById('tasks'); 
    const sideBar = document.getElementById('sidebar');
    let anyOpen = false;
    let lastProject;

    const displayTask = (task) => {
        const newTask = document.createElement('div');
        newTask.classList.add('task');
        newTask.innerText += task.getName();
        if (task.getDesc()) newTask.innerText += `\n\n${task.getDesc()}`;
        taskBox.appendChild(newTask);
    }

    const displayProject = (project) => {
        const newProject = document.createElement('div');
        newProject.classList.add('project');
        newProject.innerText = project.getTitle();
        sideBar.appendChild(newProject);



        

        newProject.addEventListener('click', () => {


            if (project.isOpen()) {
                hideTasks();
                project.setOpen(false);
                anyOpen = false;

            } else if (!anyOpen) {

                showTasks(project);
                project.setOpen(true);
                anyOpen = true;

            } else {

                hideTasks();

                lastProject.setOpen(false);

                showTasks(project);
                project.setOpen(true);
                anyOpen = true;

            }

            lastProject = project;
            //console.log(`${project.getTitle()} is open? ${project.isOpen()}`);
            //console.log(`any open? ${anyOpen}`)
            //console.log(project.getTitle());

            
        });
    }

    const showTasks = (project) => {
        project.getTasks().forEach(task => {
            displayTask(task);
        });
    }

    const hideTasks = () => {
        const tasks = Array.from(document.querySelectorAll('.task'));
        tasks.forEach(task => {
            task.remove();
        })
    }

    return {displayProject}
})();

//Project constructor.
const Project = (name) => {
    let tasks = []
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

    return {getTitle, getTasks, addTask, isOpen, setOpen}
};

export {Task, TaskHandler, Project}