const taskForm = document.getElementById("task-form");
const taskList = document.getElementById("task-list");
const highCount = document.getElementById("high-priority-count");
const mediumCount = document.getElementById("medium-priority-count");
const lowCount = document.getElementById("low-priority-count");
const completedCount = document.getElementById("completed-tasks-count");
const pendingCount = document.getElementById("pending-tasks-count");

let taskCounts = { High: 0, Medium: 0, Low: 0 };
let taskStatus = { Completed: 0, Pending: 0 };

// Graphs setup
const priorityCtx = document.getElementById("priorityChart").getContext("2d");
const statusCtx = document.getElementById("statusChart").getContext("2d");

const priorityChart = new Chart(priorityCtx, {
    type: "bar",
    data: {
        labels: ["High Priority", "Medium Priority", "Low Priority"],
        datasets: [{
            label: "Task Count",
            data: [0, 0, 0],
            backgroundColor: ["#ff5252", "#ffb74d", "#81c784"],
        }],
    },
});

const statusChart = new Chart(statusCtx, {
    type: "pie",
    data: {
        labels: ["Completed", "Pending"],
        datasets: [{
            label: "Task Status",
            data: [0, 0],
            backgroundColor: ["#4caf50", "#ff5722"],
        }],
    },
});

// Form submission
taskForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const taskName = document.getElementById("task-name").value;
    const taskPriority = document.getElementById("task-priority").value;

    addTask(taskName, taskPriority, "Pending");
    updateDashboard(taskPriority, "Pending");
    taskForm.reset();
});

// Add task
function addTask(name, priority, status) {
    const li = document.createElement("li");
    li.innerHTML = `
        ${name} (${priority}) - ${status}
        <button onclick="changeStatus(this)">Change Status</button>
    `;
    li.setAttribute("data-priority", priority);
    li.setAttribute("data-status", status);
    taskList.appendChild(li);
}

// Change status
function changeStatus(button) {
    const taskItem = button.parentElement;
    const priority = taskItem.getAttribute("data-priority");
    const currentStatus = taskItem.getAttribute("data-status");

    const newStatus = currentStatus === "Pending" ? "Completed" : "Pending";
    taskItem.setAttribute("data-status", newStatus);
    taskItem.innerHTML = `
        ${taskItem.textContent.split(" - ")[0]} - ${newStatus}
        <button onclick="changeStatus(this)">Change Status</button>
    `;

    updateDashboard(priority, newStatus, currentStatus);
}

// Update dashboard and graphs
function updateDashboard(priority, newStatus, prevStatus = null) {
    if (prevStatus) taskStatus[prevStatus]--;
    taskStatus[newStatus]++;

    if (prevStatus === null) taskCounts[priority]++;
    highCount.textContent = taskCounts["High"];
    mediumCount.textContent = taskCounts["Medium"];
    lowCount.textContent = taskCounts["Low"];
    completedCount.textContent = taskStatus["Completed"];
    pendingCount.textContent = taskStatus["Pending"];

    updateGraphs();
}

function updateGraphs() {
    priorityChart.data.datasets[0].data = [
        taskCounts["High"],
        taskCounts["Medium"],
        taskCounts["Low"],
    ];
    priorityChart.update();

    statusChart.data.datasets[0].data = [
        taskStatus["Completed"],
        taskStatus["Pending"],
    ];
    statusChart.update();
}
