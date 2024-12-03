let currentUser = null;
let posts = []; // Store all posts
let followings = {}; // Store followings for each user

// Function to log in
function login() {
    const username = document.getElementById("username").value;
    if (username.trim()) {
        currentUser = username;
        if (!followings[currentUser]) {
            followings[currentUser] = []; // Initialize followings list if it's new
        }
        document.getElementById("userDisplayName").textContent = currentUser;
        showDashboard();
    } else {
        alert("Please enter a valid username.");
    }
}

// Function to show the dashboard after logging in
function showDashboard() {
    document.getElementById("loginSection").style.display = "none";
    document.getElementById("dashboardSection").style.display = "block";
    loadUserPosts();
}

// Function to log out
function logout() {
    currentUser = null;
    document.getElementById("loginSection").style.display = "block";
    document.getElementById("dashboardSection").style.display = "none";
    document.getElementById("username").value = '';
    resetData();
}

// Function to reset data (for logout)
function resetData() {
    posts = [];
    followings = {};
    document.getElementById("userPosts").innerHTML = '';
    document.getElementById("followUser").value = '';
    document.getElementById("followingsList").innerHTML = '';
}

// Function to post content
function postContent() {
    const newPostContent = document.getElementById("newPost").value;
    if (newPostContent.trim()) {
        const post = {
            user: currentUser,
            content: newPostContent,
            time: new Date().toLocaleString(),
        };
        posts.push(post);
        document.getElementById("newPost").value = '';
        loadUserPosts();
    } else {
        alert("Please enter some content.");
    }
}

// Function to display posts by the current user
function loadUserPosts() {
    let userPostsHtml = '';
    posts.forEach(post => {
        if (post.user === currentUser) {
            userPostsHtml += `<div class="post">
                <p class="username">${post.user} <span>(${post.time})</span></p>
                <p>${post.content}</p>
            </div>`;
        }
    });
    document.getElementById("userPosts").innerHTML = userPostsHtml;
}

// Function to follow another user
function followUser() {
    const followUsername = document.getElementById("followUser").value;
    if (followUsername && followUsername !== currentUser) {
        if (!followings[currentUser].includes(followUsername)) {
            followings[currentUser].push(followUsername); // Add to follow list
            document.getElementById("followUser").value = ''; // Clear input field
            loadFollowings();
        } else {
            alert("You are already following this user.");
        }
    } else {
        alert("Please enter a valid username to follow.");
    }
}

// Function to load followings list
function loadFollowings() {
    let followingsListHtml = '';
    followings[currentUser].forEach(followedUser => {
        followingsListHtml += `<li>${followedUser}</li>`;
    });
    document.getElementById("followingsList").innerHTML = followingsListHtml;
}
