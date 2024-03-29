document.addEventListener('DOMContentLoaded', () => {
    const socket = io();

    // Function to render posts
    function renderPosts(posts) {
        const postsContainer = document.getElementById('posts-container');
        postsContainer.innerHTML = '';
        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.innerHTML = `
                <img src="${post.image}" alt="Post Image">
                <p>${post.description}</p>
                <button onclick="likePost('${post._id}')">Like</button>
                <span>Likes: ${post.likes}</span>
                <button onclick="addComment('${post._id}')">Add Comment</button>
                <ul>
                    ${post.comments.map(comment => `<li>${comment}</li>`).join('')}
                </ul>
            `;
            postsContainer.appendChild(postElement);
        });
    }

    // Function to handle post like
    window.likePost = postId => {
        socket.emit('likePost', postId);
    };

    // Function to handle adding comments
    window.addComment = postId => {
        const comment = prompt('Enter your comment:');
        if (comment) {
            socket.emit('addComment', { postId, comment });
        }
    };

    // Listen for updated posts
    socket.on('updatePosts', posts => {
        renderPosts(posts);
    });

    // Fetch initial posts
    fetch('/posts')
        .then(response => response.json())
        .then(posts => renderPosts(posts))
        .catch(err => console.error(err));
});
