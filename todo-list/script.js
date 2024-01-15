// Check if there are tasks in localStorage
if (localStorage.getItem('tasks')) {
    var tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.forEach(function(task) {
        addTaskToList(task);
    });
}

// Function to add a task
function addTask() {
    var taskInput = document.getElementById('todoInput');
    var task = taskInput.value;

    // Check if the task input is empty
    if (task === '') {
        alert('Please enter a task.');
        return;
    }

    addTaskToList(task);

    // Save task to localStorage
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    taskInput.value = '';
}

// Function to add a task to the list
function addTaskToList(task) {
    var li = document.createElement('li');
    li.appendChild(document.createTextNode(task));

    var deleteButton = document.createElement('button');
    deleteButton.appendChild(document.createTextNode('Delete'));
    deleteButton.onclick = function() {
        this.parentElement.remove();

        // Remove task from localStorage
        var tasks = JSON.parse(localStorage.getItem('tasks'));
        tasks = tasks.filter(function(t) {
            return t !== task;
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));

        // Add task to history
        var historyContainer = document.getElementById('historyContainer');
        var historyItem = document.createElement('p');
        historyItem.appendChild(document.createTextNode(task + ' - ' + new Date().toLocaleString()));
        historyContainer.appendChild(historyItem);
    };

    li.appendChild(deleteButton);

    document.getElementById('todoList').appendChild(li);
}

// Function to toggle the history container
function toggleHistory() {
    var historyContainer = document.getElementById('historyContainer');
    historyContainer.style.display = historyContainer.style.display === 'none' ? 'block' : 'none';
}

// Function to save tasks to localStorage
function saveTasks() {
    var tasks = [];
    var todoList = document.getElementById('todoList');
    for (var i = 0; i < todoList.children.length; i++) {
        tasks.push(todoList.children[i].innerText);
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from localStorage
function loadTasks() {
    var tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks) {
        for (var i = 0; i < tasks.length; i++) {
            addTaskToList(tasks[i]);
        }
    }
}

// Call the function to load tasks when the page loads
window.onload = loadTasks;

// Call the function to save tasks every 5 seconds
setInterval(saveTasks, 5000);