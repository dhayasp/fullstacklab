// DOM Elements
const postContent = document.getElementById('post-content');
const postBtn = document.getElementById('post-btn');
const timelineList = document.getElementById('timeline-list');
const loginForm = document.getElementById('login-form');
const app = document.getElementById('app');
const signinBtn = document.getElementById('signin-btn');
const logoutBtn = document.getElementById('logout-btn');
const loginError = document.getElementById('login-error');

// Sample Users (in memory for this simple app)
const users = {
    'dhaya': { password: 'dhaya45', posts: [] },
    'alagarsamy': { password: 'Darun', posts: [] },
    'eswaran': { password: 'ITeswaran', posts: [] }
};

let currentUser = null;
let posts = [];

// Function to display posts
function displayPosts() {
    timelineList.innerHTML = ''; // Clear the previous timeline list

    // Check if there are posts and display them
    if (posts.length === 0) {
        const noPostsMessage = document.createElement('li');
        noPostsMessage.textContent = "No posts to show.";
        timelineList.appendChild(noPostsMessage);
    } else {
        posts.forEach((post, index) => {
            const postItem = document.createElement('li');
            postItem.innerHTML = `
                <p>${post}</p>
                <button onclick="deletePost(${index})">Delete</button>
            `;
            timelineList.appendChild(postItem);
        });
    }
}

// Handle user sign-in
signinBtn.addEventListener('click', () => {
    const username = document.getElementById('username').value.trim().toLowerCase();  // Convert to lowercase
    const password = document.getElementById('password').value.trim();

    if (username && password) {
        const user = users[username];
        if (user && user.password === password) {
            currentUser = username;
            loginForm.style.display = 'none';
            app.style.display = 'block';
            posts = user.posts;
            displayPosts();
        } else {
            loginError.textContent = 'Invalid username or password.';
        }
    } else {
        loginError.textContent = 'Please enter both username and password.';
    }
});

// Handle post submission
postBtn.addEventListener('click', () => {
    const content = postContent.value.trim();
    if (content && currentUser) {
        // Add the new post to the user's array and the global posts array
        posts.push(content);
        users[currentUser].posts = posts; // Update the user's posts in the data
        displayPosts(); // Refresh the timeline with new post
        postContent.value = '';  // Clear the input field
    } else {
        alert('Please enter some content to post.');
    }
});

// Handle logout
logoutBtn.addEventListener('click', () => {
    currentUser = null;
    loginForm.style.display = 'block';
    app.style.display = 'none';
});

// Handle delete post
function deletePost(index) {
    posts.splice(index, 1);  // Remove post from the array
    users[currentUser].posts = posts;  // Update the user's posts
    displayPosts();  // Refresh the timeline with the remaining posts
}
