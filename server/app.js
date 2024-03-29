const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const postRoutes = require('./routes/postRoutes');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/instagram_clone', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

// Socket.IO
io.on('connection', socket => {
    console.log('A user connected');

    socket.on('likePost', postId => {
        // Handle like functionality
    });

    socket.on('addComment', ({ postId, comment }) => {
        // Handle comment functionality
    });
});

// Middleware
app.use(express.json());
app.use('/posts', postRoutes);

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
