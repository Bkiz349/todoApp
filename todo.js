const table = document.querySelector("table");
let Tasks = JSON.parse(localStorage.getItem('tasks')) || []
const inputField = document.querySelector('input')
const taskCon = document.getElementById('Tasks')
const add = document.getElementById('add')
const addTaskBtn = document.getElementById('add-task-btn')
const addBtn = document.getElementById('add-btn')
const show = document.getElementById('display')
const saveBtn = document.getElementById('saveBtn')
const editClose = document.getElementById("editClose")
const editInput = document.getElementById("editInput");
const editBtn = document.getElementById("editBtn");
const editCon = document.querySelector(".editCon");


// Function to Display Tasks Based on Filter
function displayTasks(filter = "all") {
    show.innerHTML = ""; 

    let tasks = JSON.parse(localStorage.getItem("tasks")) || []; 

    let filteredTasks = tasks;
    if (filter === "complete") {
        filteredTasks = tasks.filter(task => task.complete);  
    } else if (filter === "uncomplete") {
        filteredTasks = tasks.filter(task => !task.complete);  
    }

    filteredTasks.forEach((task) => {
        let tr = document.createElement("tr"); 

        let tdName = document.createElement("td");
        tdName.textContent = task.task;
        tdName.innerHTML = task.complete ? `<p style="text-decoration: line-through; color:gray">${task.task}</p>` : task.task;

        tr.appendChild(tdName);

        let tdActions = document.createElement("td");

        if (task.complete) {
            tdActions.innerHTML = `
                <button class="uncheck" onclick="toggleTaskCompletion(${task.id})">Uncheck</button>
                <button class="delete" onclick="deleteTask(${task.id})">Delete</button>
            `;
        } else {
            tdActions.innerHTML = `
                <button class="edit" onclick="editTask(${task.id})">Edit</button>
                <button class="delete" onclick="deleteTask(${task.id})">Delete</button>
                <button class="complete" onclick="toggleTaskCompletion(${task.id})">Complete</button>
            `;
        }

        tr.appendChild(tdActions);
        show.appendChild(tr); 
    });
}


//function to viesws tasks
function viewAllTasks() {
    displayTasks("all");
}

function viewCompletedTasks() {
    displayTasks("complete");
}

function viewUncompletedTasks() {
    displayTasks("uncomplete");
}

// Function to Delete Task
function deleteTask(id) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task.id !== id);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks(); 
}


// Function to Edit Task
function editTask(id) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let taskToEdit = tasks.find(task => task.id === id);

    if (taskToEdit) {
        taskCon.style.display = 'none'
        editInput.value = taskToEdit.task;
        editCon.style.display = "block";

        editBtn.onclick = () => {
            let newTaskName = editInput.value.trim();
            if (newTaskName !== "") {
                taskToEdit.task = newTaskName;
                localStorage.setItem("tasks", JSON.stringify(tasks));
                displayTasks();
                editCon.style.display = "none";
                taskCon.style.display = 'flex'
            }
        };
    }
}

function toggleTaskCompletion(id) {
    let Tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let task= Tasks.find(task => task.id === id);

    if (task) {
        task.complete = !task.complete;
        localStorage.setItem("tasks", JSON.stringify(Tasks));

        console.log("Updated Tasks:", JSON.parse(localStorage.getItem("tasks"))); 
        displayTasks();
    }
}



// Event Listeners
document.addEventListener("DOMContentLoaded", () => displayTasks("all"))

addTaskBtn.addEventListener("click", ()=> {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    let TaskName = inputField.value.trim();
    if(TaskName != ""){
        let TaskList = {
            id: Date.now(),
            task: TaskName,
            complete: false
        }
        tasks.unshift(TaskList)

        localStorage.setItem("tasks", JSON.stringify(tasks))
        console.log(localStorage.getItem("tasks"))
        inputField.value = ""
        closeInput()

    }
})

function closeInput(){
    console.log('clicked')
    taskCon.style.display = 'flex'
    add.style.display = 'none'
    displayTasks()
}

addBtn.addEventListener("click", ()=> {
    console.log('clicked')
    taskCon.style.display = 'none'
    add.style.display = 'flex'
    displayTasks()
})

editClose.addEventListener("click", ()=>{
    editCon.style.display = "none";
    taskCon.style.display = 'flex'
})

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});
