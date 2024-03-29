const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const postRoutes = require('./routes/postRoutes');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000; // Use specified port or default to 3000

// Connect to MongoDB
mongoose.connect('mongodb+srv://abhandarge01:abhandarge01@cluster0.uxfzqse.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: 'false',
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
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
