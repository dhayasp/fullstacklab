// Initial leave balances
let leaveBalance = {
    casual: 10,
    medical: 5,
    emergency: 5
};

// Leave history array
let leaveHistory = [];

// Display leave balance
function updateLeaveBalance() {
    document.getElementById('casual-balance').textContent = leaveBalance.casual;
    document.getElementById('medical-balance').textContent = leaveBalance.medical;
    document.getElementById('emergency-balance').textContent = leaveBalance.emergency;
}

// Display leave history
function updateLeaveHistory() {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = '';
    leaveHistory.forEach(entry => {
        const listItem = document.createElement('li');
        listItem.textContent = `${entry.type} Leave - ${entry.days} day(s)`;
        historyList.appendChild(listItem);
    });
}

// Apply leave
document.getElementById('leave-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const leaveType = document.getElementById('leave-type').value;
    const leaveDays = parseInt(document.getElementById('leave-days').value, 10);

    if (leaveDays <= 0) {
        alert('Number of days must be greater than 0.');
        return;
    }

    // Check leave balance
    if (leaveDays > leaveBalance[leaveType]) {
        alert(`Insufficient balance for ${leaveType} leave.`);
        return;
    }

    // Deduct leave balance
    leaveBalance[leaveType] -= leaveDays;

    // Add to leave history
    leaveHistory.push({
        type: leaveType.charAt(0).toUpperCase() + leaveType.slice(1),
        days: leaveDays
    });

    // Update UI
    updateLeaveBalance();
    updateLeaveHistory();

    alert('Leave applied successfully!');
    document.getElementById('leave-form').reset();
});

// Initialize
updateLeaveBalance();
