// DOM Elements
const todoInput = document.getElementById('todo-input');
const addTaskBtn = document.getElementById('add-task-btn');
const todoList = document.getElementById('todo-list');
const clearAllBtn = document.getElementById('clear-all-btn');

// Load tasks from LocalStorage
const loadTasks = () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => renderTask(task));
};

// Save tasks to LocalStorage
const saveTasks = () => {
    const tasks = [];
    document.querySelectorAll('#todo-list li').forEach(item => {
        tasks.push({
            text: item.querySelector('span').textContent,
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Render a task
const renderTask = task => {
    const li = document.createElement('li');

    li.innerHTML = `
        <span>${task.text}</span>
        <button class="delete-btn">Delete</button>
    `;
    todoList.appendChild(li);

    // Delete task
    li.querySelector('.delete-btn').addEventListener('click', () => {
        li.remove();
        saveTasks();
    });
};

// Add a new task
addTaskBtn.addEventListener('click', () => {
    const taskText = todoInput.value.trim();
    if (taskText) {
        renderTask({ text: taskText });
        saveTasks();
        todoInput.value = '';
    }
});

// Clear all tasks
clearAllBtn.addEventListener('click', () => {
    todoList.innerHTML = '';
    localStorage.removeItem('tasks');
});

// Initialize the app
document.addEventListener('DOMContentLoaded', loadTasks);
