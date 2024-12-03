let currentUser = null;
let posts = []; // Store all posts globally
let followings = {}; // Store followings for each user
let comments = {}; // Store comments for each post

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
    loadFollowings();
    loadFollowedPosts();
}

// Function to log out
function logout() {
    currentUser = null;
    document.getElementById("loginSection").style.display = "block";
    document.getElementById("dashboardSection").style.display = "none";
    document.getElementById("username").value = '';
    resetData();
}

// Function to reset data on logout
function resetData() {
    posts = [];
    followings = {};
    comments = {};
    document.getElementById("userPosts").innerHTML = '';
    document.getElementById("followUser").value = '';
    document.getElementById("followingsList").innerHTML = '';
    document.getElementById("followedPosts").innerHTML = '';
}

// Function to post content
function postContent() {
    const newPostContent = document.getElementById("newPost").value;
    if (newPostContent.trim()) {
        const post = {
            user: currentUser,
            content: newPostContent,
            time: new Date().toLocaleString(),
            likes: 0,
            dislikes: 0,
        };
        posts.push(post);
        document.getElementById("newPost").value = ''; // Clear the textarea
        loadUserPosts();
    } else {
        alert("Please enter some content.");
    }
}

// Function to display posts made by the current user
function loadUserPosts() {
    let userPostsHtml = '';
    posts.forEach((post, index) => {
        if (post.user === currentUser) {
            userPostsHtml += `
                <div class="post" id="post${index}">
                    <p class="username">${post.user} <span>(${post.time})</span></p>
                    <p>${post.content}</p>
                    <button class="like-btn" onclick="likePost(${index})">Like (${post.likes})</button>
                    <button class="dislike-btn" onclick="dislikePost(${index})">Dislike (${post.dislikes})</button>
                    <button class="comment-btn" onclick="toggleCommentSection(${index})">Comment</button>

                    <div class="comment-section" id="commentSection${index}" style="display: none;">
                        <input type="text" class="comment-input" id="commentInput${index}" placeholder="Add a comment">
                        <button class="comment-btn" onclick="addComment(${index})">Add Comment</button>
                        <div id="commentsList${index}"></div>
                    </div>
                </div>
            `;
        }
    });
    document.getElementById("userPosts").innerHTML = userPostsHtml;
}

// Like post functionality (cannot dislike if liked)
function likePost(index) {
    // Reset dislike count if like is clicked
    if (posts[index].dislikes > 0) {
        posts[index].dislikes = 0;
    }
    posts[index].likes += 1;
    loadUserPosts(); // Reload user posts to update the like count
}

// Dislike post functionality (cannot like if disliked)
function dislikePost(index) {
    // Reset like count if dislike is clicked
    if (posts[index].likes > 0) {
        posts[index].likes = 0;
    }
    posts[index].dislikes += 1;
    loadUserPosts(); // Reload user posts to update the dislike count
}

// Toggle comment section visibility
function toggleCommentSection(index) {
    const commentSection = document.getElementById(`commentSection${index}`);
    commentSection.style.display = (commentSection.style.display === "none") ? "block" : "none";
}

// Add comment functionality
function addComment(index) {
    const commentInput = document.getElementById(`commentInput${index}`);
    const commentContent = commentInput.value.trim();
    if (commentContent) {
        if (!comments[index]) {
            comments[index] = [];
        }
        comments[index].push(commentContent);
        loadComments(index); // Load updated comments
        commentInput.value = ''; // Clear input
    } else {
        alert("Please enter a comment.");
    }
}

// Load comments for a post
function loadComments(index) {
    let commentsHtml = '';
    if (comments[index]) {
        comments[index].forEach(comment => {
            commentsHtml += `<p>${comment}</p>`;
        });
    }
    document.getElementById(`commentsList${index}`).innerHTML = commentsHtml;
}

// Function to follow another user
function followUser() {
    const followUsername = document.getElementById("followUser").value;
    if (followUsername && followUsername !== currentUser) {
        if (!followings[currentUser].includes(followUsername)) {
            followings[currentUser].push(followUsername); // Add to follow list
            document.getElementById("followUser").value = ''; // Clear input field
            loadFollowings();
            loadFollowedPosts();
        } else {
            alert("You are already following this user.");
        }
    } else {
        alert("Please enter a valid username to follow.");
    }
}

// Function to load the list of followed users
function loadFollowings() {
    let followingsListHtml = '';
    followings[currentUser].forEach(followedUser => {
        followingsListHtml += `<li>${followedUser}</li>`;
    });
    document.getElementById("followingsList").innerHTML = followingsListHtml;
}

// Function to load posts from followed users
function loadFollowedPosts() {
    let followedPostsHtml = '';
    posts.forEach(post => {
        if (followings[currentUser].includes(post.user)) {
            followedPostsHtml += `
                <div class="post">
                    <p class="username">${post.user} <span>(${post.time})</span></p>
                    <p>${post.content}</p>
                    <button class="like-btn" onclick="likePost(${posts.indexOf(post)})">Like (${post.likes})</button>
                    <button class="dislike-btn" onclick="dislikePost(${posts.indexOf(post)})">Dislike (${post.dislikes})</button>
                    <button class="comment-btn" onclick="toggleCommentSection(${posts.indexOf(post)})">Comment</button>

                    <div class="comment-section" id="commentSection${posts.indexOf(post)}" style="display: none;">
                        <input type="text" class="comment-input" id="commentInput${posts.indexOf(post)}" placeholder="Add a comment">
                        <button class="comment-btn" onclick="addComment(${posts.indexOf(post)})">Add Comment</button>
                        <div id="commentsList${posts.indexOf(post)}"></div>
                    </div>
                </div>
            `;
        }
    });
    document.getElementById("followedPosts").innerHTML = followedPostsHtml;
}
