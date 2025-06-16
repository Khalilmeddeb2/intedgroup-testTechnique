require('./db');
const express = require('express');
require('dotenv').config();
const rateLimit = require('express-rate-limit')
const http = require('http'); 
const socketIo = require('socket.io'); 
const cors = require("cors");

const app = express();
const server = http.createServer(app); 
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
const limiter = rateLimit({
	windowMs: 1 * 60 * 1000, 
	max: 100,
	standardHeaders: true, 
	legacyHeaders: false, 
})
app.set('io', io);
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use('/media', express.static('media'));
app.use(limiter)

const user_router = require('./routers/users');
const role_router = require('./routers/roles');
const article_router = require('./routers/articles');
const comment_router = require('./routers/comments');

app.use('/api/users', user_router);
app.use('/api/roles', role_router);
app.use('/api/articles', article_router);
app.use('/api/comments', comment_router);

const PORT = process.env.port
server.listen(PORT, () => console.log(` Server running on http://localhost:${PORT}`));
