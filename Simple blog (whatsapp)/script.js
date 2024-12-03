
let loggedInUser = null;
let chats = { User1: [], User2: [] };

function login() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if ((username === "User1" && password === "1234") || (username === "User2" && password === "1234")) {
        loggedInUser = username;
        document.getElementById("login-page").classList.add("hidden");
        document.getElementById("chat-page").classList.remove("hidden");
        updateChatWindows();
    } else {
        alert("Invalid credentials! Use User1/User2 with password 1234.");
    }
}

function logout() {
    loggedInUser = null;
    document.getElementById("chat-page").classList.add("hidden");
    document.getElementById("login-page").classList.remove("hidden");
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
}

function sendMessage(user) {
    const messageInput = document.getElementById(`${user.toLowerCase()}-message`);
    const message = messageInput.value.trim();
    if (message) {
        const recipient = user === "User1" ? "User2" : "User1";
        chats[user].push({ type: "sent", text: message });
        chats[recipient].push({ type: "received", text: message });
        updateChatWindows();
        messageInput.value = "";
    }
}

function updateChatWindows() {
    ["User1", "User2"].forEach((user) => {
        const chatBox = document.getElementById(`${user.toLowerCase()}-chat-box`);
        chatBox.innerHTML = "";
        chats[user].forEach((chat) => {
            const chatBubble = document.createElement("div");
            chatBubble.textContent = chat.text;
            chatBubble.style.background = chat.type === "sent" ? "#dcf8c6" : "#fff";
            chatBubble.style.padding = "10px";
            chatBubble.style.margin = "5px 0";
            chatBubble.style.borderRadius = "5px";
            chatBox.appendChild(chatBubble);
        });
        chatBox.scrollTop = chatBox.scrollHeight;
    });
}

// Initialize chats dynamically for both users
updateChatWindows();

// Example: Simulating chat message updates
function sendMessage(user) {
    const messageInput = document.getElementById(`${user.toLowerCase()}-message`);
    const chatBoxUser1 = document.getElementById('user1-chat-box');
    const chatBoxUser2 = document.getElementById('user2-chat-box');
    const message = messageInput.value.trim();

    if (message === '') {
        alert('Message cannot be empty!');
        return;
    }

    // Determine the recipient and sender chat box
    const senderBox = user === 'User1' ? chatBoxUser1 : chatBoxUser2;
    const recipientBox = user === 'User1' ? chatBoxUser2 : chatBoxUser1;

    // Append message in sender box
    const sentMessage = document.createElement('div');
    sentMessage.className = 'sent';
    sentMessage.textContent = message;
    senderBox.appendChild(sentMessage);

    // Simulate receiving message in recipient box
    const receivedMessage = document.createElement('div');
    receivedMessage.className = 'received';
    receivedMessage.textContent = message;
    recipientBox.appendChild(receivedMessage);

    // Clear input field
    messageInput.value = '';

    // Scroll to the latest message
    senderBox.scrollTop = senderBox.scrollHeight;
    recipientBox.scrollTop = recipientBox.scrollHeight;
}

/*
const users = { 
    User1: { username: "User1", password: "pass1" },
    User2: { username: "User2", password: "pass2" }
};

let currentUser = "";
let messages = [];

// Login Function
function login() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (users[username] && users[username].password === password) {
        currentUser = username;
        document.getElementById("current-user").textContent = `Logged in as: ${currentUser}`;
        document.getElementById("login-page").style.display = "none";
        document.getElementById("chat-page").style.display = "flex";
        updateChatBox();
    } else {
        alert("Invalid username or password!");
    }
}

// Send Message
function sendMessage() {
    const messageInput = document.getElementById("message-input");
    const message = messageInput.value.trim();

    if (message === "") return;

    const recipient = currentUser === "User1" ? "User2" : "User1";

    // Add messages to chat
    messages.push({ sender: currentUser, recipient, message });
    messageInput.value = "";
    updateChatBox();
}

// Update Chat Box
function updateChatBox() {
    const chatBox = document.getElementById("chat-box");
    chatBox.innerHTML = "";

    // Display messages relevant to the logged-in user
    messages.forEach(msg => {
        if (msg.sender === currentUser || msg.recipient === currentUser) {
            const messageDiv = document.createElement("div");
            messageDiv.className = msg.sender === currentUser ? "sent" : "received";
            messageDiv.textContent = msg.message;
            chatBox.appendChild(messageDiv);
        }
    });

    // Scroll to the latest message
    chatBox.scrollTop = chatBox.scrollHeight;
}
*/