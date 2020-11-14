const http = require('http');
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const socketio = require('socket.io');

const authRoutes = require('./routes/auth.routes');
const usersRoutes = require('./routes/users.routes');
const roomRoutes = require('./routes/room.routes');

const app = express();
const server = http.Server(app);
const io = socketio(server);

io.activeUsers = {};

require('./socket/socket')(io)

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('connected.');
}).catch(error => {
    console.log(error);
})

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 * 60 }
}))
app.use(flash());

app.use(authRoutes);
app.use(usersRoutes);
app.use(roomRoutes);

const port = process.env.PORT || 3000
server.listen(port, () => {
    console.log('listen');
})