const feed = document.getElementById('feed');
const userPosts = document.getElementById('user-posts');
const inbox = document.getElementById('inbox');
const sections = document.querySelectorAll('section');

let posts = [];
//let messages = [];
let userName = "User1"; // Default sender

function showSection(sectionId) {
    sections.forEach((section) => {
        section.classList.remove('active-section');
    });
    document.getElementById(sectionId).classList.add('active-section');
}

function createPost() {
    const caption = document.getElementById('post-caption').value.trim();
    const imageFile = document.getElementById('post-image').files[0];

    if (!caption || !imageFile) {
        alert('Please provide both a caption and an image.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function (event) {
        const post = {
            caption,
            image: event.target.result,
            likes: 0,
            dislikes: 0,
            liked: false,
            disliked: false,
        };
        posts.unshift(post);
        updateFeed();
        updateUserPosts();
        clearInputs();
    };
    reader.readAsDataURL(imageFile);
}

function updateFeed() {
    feed.innerHTML = '';
    posts.forEach((post, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <img src="${post.image}" alt="Post Image" style="width: 100%; border-radius: 10px;">
            <p>${post.caption}</p>
            <button onclick="likePost(${index})" ${post.liked ? 'disabled' : ''}>Like (${post.likes})</button>
            <button onclick="dislikePost(${index})" ${post.disliked ? 'disabled' : ''}>Dislike (${post.dislikes})</button>
        `;
        feed.appendChild(listItem);
    });
}

function updateUserPosts() {
    userPosts.innerHTML = '';
    posts.forEach((post, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <img src="${post.image}" alt="Post Image" style="width: 100%; border-radius: 10px;">
            <p>${post.caption}</p>
            <button onclick="likePost(${index})" ${post.liked ? 'disabled' : ''}>Like (${post.likes})</button>
            <button onclick="dislikePost(${index})" ${post.disliked ? 'disabled' : ''}>Dislike (${post.dislikes})</button>
        `;
        userPosts.appendChild(listItem);
    });
}

function likePost(index) {
    if (!posts[index].liked && !posts[index].disliked) {
        posts[index].likes++;
        posts[index].liked = true;
    }
    updateFeed();
    updateUserPosts();
}

function dislikePost(index) {
    if (!posts[index].liked && !posts[index].disliked) {
        posts[index].dislikes++;
        posts[index].disliked = true;
    }
    updateFeed();
    updateUserPosts();
}

function clearInputs() {
    document.getElementById('post-caption').value = '';
    document.getElementById('post-image').value = '';
}

// Messaging System
/*
function sendMessage() {
    const recipient = document.getElementById('message-recipient').value;
    const content = document.getElementById('message-content').value.trim();

    if (!content) {
        alert('Message content cannot be empty.');
        return;
    }

    const message = { sender: userName, recipient, content };
    messages.push(message);
    updateInbox();
    document.getElementById('message-content').value = '';
}

function updateInbox() {
    inbox.innerHTML = '';
    messages
        .filter((msg) => msg.recipient === userName || msg.sender === userName)
        .forEach((msg) => {
            const listItem = document.createElement('li');
            listItem.textContent = `From: ${msg.sender}, To: ${msg.recipient} - ${msg.content}`;
            inbox.appendChild(listItem);
        });
}
*/
let currentUser = "User1"; // Current logged-in user
const messages = []; // Array to hold chat messages
const users = ["User1", "User2"]; // Available users

function showSection(sectionId) {
    const sections = document.querySelectorAll("section");
    sections.forEach((section) => section.classList.remove("active-section"));
    document.getElementById(sectionId).classList.add("active-section");
}

function switchUser(user) {
    currentUser = user;
    document.getElementById("message-recipient").value =
        users.find((u) => u !== user); // Auto-select the other user
    document.getElementById("inbox-title").textContent = `Inbox for ${currentUser}`;
    updateInbox();
}

function sendMessage() {
    const recipient = document.getElementById("message-recipient").value;
    const content = document.getElementById("message-content").value.trim();

    if (!content) {
        alert("Message content cannot be empty.");
        return;
    }

    const message = { sender: currentUser, recipient, content, timestamp: new Date() };
    messages.push(message);
    updateInbox();
    document.getElementById("message-content").value = "";
}

function updateInbox() {
    const inbox = document.getElementById("inbox");
    inbox.innerHTML = "";

    messages
        .filter((msg) => msg.sender === currentUser || msg.recipient === currentUser)
        .forEach((msg) => {
            const listItem = document.createElement("li");
            listItem.textContent = `[${msg.timestamp.toLocaleTimeString()}] ${
                msg.sender === currentUser ? "You" : msg.sender
            }: ${msg.content}`;
            inbox.appendChild(listItem);
        });

    // Auto-scroll to the latest message
    inbox.scrollTop = inbox.scrollHeight;
}

// Initialize with default user
switchUser(currentUser);





// Initialize
showSection('home');
