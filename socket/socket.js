const { v4 } = require('uuid');

const formatMessage = require('../utils/message');
const User = require('../models/user');


module.exports = io => {
    io.on('connection', socket => {
        socket.on('userJoin', ({ userId, username }) => {
            const user = { userId, username };
            User.updateOne({ _id: user.userId }, { $set: { isActive: true } }).then(result => {
            })

            // io.activeUsers[userId] = username;
            // console.log(io.activeUsers);
            // io.emit('activeUsers', io.activeUsers);

            // socket.emit('message', formatMessage(USER, `Welcome ${user.username}`));

            socket.broadcast.emit('message', formatMessage(user.username, `${user.username} has been joined.`));

            // socket.on('requestRoomId', () => {
            //     const roomId = v4();
            //     console.log(roomId);
            //     socket.emit('getRoomId', roomId);
            //     // socket.broadcast.emit('getId')
            // })

            socket.on('sendPeerId', peerId => {
                console.log(peerId);
                socket.broadcast.emit('getPeerId', peerId);
            })

            // socket.on('sendId', ({ peerId, roomId }) => {
            //     socket.to(roomId).broadcast.emit('receiveId', peerId);
            // })

            socket.on('disconnect', () => {
                User.updateOne({ _id: user.userId }, { $set: { isActive: false } }).then(result => {
                })
                // delete io.activeUsers[userId];
                // console.log(io.activeUsers);
                // io.emit('activeUsers', io.activeUsers);
                io.emit('userDisconnect', username);
            })
        })



        // socket.on('videoCall', ({ roomId, userID }) => {
        //     socket.join(roomId);
        //     socket.to(roomId).broadcast.emit('joinVidCall', userID);
        //     socket.on('disconnect', () => {
        //         socket, to(roomId).broadcast.emit('userDisconnect', userID)
        //     })
        // })

    })



}