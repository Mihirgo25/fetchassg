let tasks = [];
var subtasks = [];
var log = [];
var ctr = 0;
var res = "";
var resid = 0;
document.querySelector("#addtask").addEventListener("click", function(){
    const taskInput = document.getElementById("taskInput");
    const task = taskInput.value.trim();
    const tagInput = document.getElementById("tagInput");
    const tag = tagInput.value.trim()
    const dateInput = document.getElementById("duedate");
    const d = dateInput.value.trim();
    const prioInput = document.getElementById("priority");
    const prio = prioInput.value.trim();
    const categoryInput = document.getElementById("categoryInput");
    const cate = categoryInput.value.trim();
    if (task !== "") {
        tasks.push({task: task, done: 0, tag: tag, date: d, priority: prio, category: cate});
        const taskList = document.getElementById("taskList");
        const listItem = document.createElement("li");
        listItem.draggable = true;
        listItem.innerHTML = `Task: ${task}, Duedate: ${d}`;
        taskList.appendChild(listItem);
        log.push({tk: tasks[ctr-1], action: "added"});
        taskInput.value = "";
        tagInput.value = "";
        dateInput.value = "";
        prioInput.value = "";
        categoryInput.value = "";
        ctr++;
    }
});

document.querySelector("#delsel").addEventListener("click", function(){
    const tasktodelete = document.querySelector("#idel");
    const t2d = tasktodelete.value.trim();
    const td = parseInt(t2d, 10);
    if(td < ctr){
        log.push({tk: tasks[td], action: "deleted"});
        tasks.splice(td, 1);
        ctr -= 1;
        tasktodelete.value = "";
        const taskList = document.getElementById("taskList");
        taskList.innerHTML = "";
        displayAllTasks();
    }
});

function deleteAll() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    tasks = [];
    ctr = 0;
}

document.querySelector("#mark").addEventListener("click", function(){
    const tasktomark = document.querySelector("#idmark");
    const t2m = tasktomark.value.trim();
    const marked = document.querySelector("#edit");
    const mr = marked.value.trim();
    const tm = parseInt(t2m,10);
    tasktomark.value = "";
    marked.value = "";
    tasks[tm].done ^= 1;
    if(tasks[tm].done == 1){
        log.push({tk: tasks[tm], action: "marked done"});
    }
    else{
        log.push({tk: tasks[tm], action: "marked undone"});
    }
    displayAllTasks();
});

document.querySelector("#editsel").addEventListener("click", function(){
    const tasktoedit = document.querySelector("#idedit");
    const t2e = tasktoedit.value.trim();
    const edited = document.querySelector("#edit");
    const ed = edited.value.trim();
    const te = parseInt(t2e,10);
    log.push({tk: tasks[te], action: "edited"});
    res = tasks[te].task;
    tasks[te].task = ed;
    resid = te;
    tasktoedit.value = "";
    edited.value = "";
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    displayAllTasks();
});

document.querySelector("#reset").addEventListener("click",function(){
    tasks[resid].task = res;
    const taskList = document.getElementById("taskList");
    log.push({tk: tasks[resid], action:"reset"});
    taskList.innerHTML = "";
    displayAllTasks();
});

function filterprio(){
    const priotoget = document.querySelector("#filterprio");
    const p2g = priotoget.value.trim();
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    tasks.forEach(task => {
        if(task.priority == p2g){
            if(task.done == 0){
                const listItem = document.createElement("li");
                listItem.innerHTML = `Task: ${task.task}, Duedate: ${task.date}`;
                taskList.appendChild(listItem);
            }
            else{
                const listItem = document.createElement("li");
                listItem.setAttribute('id', id);
                listItem.innerHTML = `Task: ${task.task}, Duedate: ${task.date}`;
                listItem.style.textDecoration = "line-through";
                taskList.appendChild(listItem);
            }
        }
    });
    priotoget.value = "";
}

function displayAllTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    tasks.forEach(task => {
        if(task.done == 0){
            const listItem = document.createElement("li");
            listItem.innerHTML = `Task: ${task.task}, <span></span> Duedate: ${task.date}`;
            taskList.appendChild(listItem);
        }
        else{
            const listItem = document.createElement("li");
            listItem.setAttribute('id', id);
            listItem.innerHTML = `Task: ${task.task}, <span></span> Duedate: ${task.date}`;
            listItem.style.textDecoration = "line-through";
            taskList.appendChild(listItem);
        }
    });
}
