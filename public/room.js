
// for video call
// const roomId = document.getElementById('roomId').value;
// const userID = document.getElementById('userId').value;
// const videoGrid = document.getElementById('video-grid');

// const peer = new Peer();
// let peerId;

// peer.on('open', id => {
//     peerId = id;
// })

// socket.emit('requestId', roomId);

// socket.on('getId', () => {
//     socket.emit('sendId', { peerId, roomId });
// })

// socket.on('receiveId', id => {
//     navigator.mediaDevices.getUserMedia({
//         video: true,
//         audio: true
//     }).then(stream => {
//         const call = peer.call(id, stream);
//         call.on('stream', receivedStream => {
//             outputVideoStream(receivedStream);
//         })
//     })
// })

// peer.on('call', call => {
//     navigator.mediaDevices.getUserMedia({
//         video: true,
//         audio: true
//     }).then(stream => {
//         call.answer(stream);
//         call.on('stream', receivedStream => {
//             outputVideoStream(receivedStream);
//         })
//     })
// })

// function outputVideoStream(stream) {
//     const video = document.createElement('video');
//     video.muted = true;
//     video.srcObject = stream;
//     video.addEventListener('loadedmetadata', () => {
//         video.play();
//     })
//     videoGrid.append(video);
// }





// const myVideo = document.createElement('video');
// myVideo.muted = true;
// const peers = {};

// navigator.mediaDevices.getUserMedia({
//     video: true,
//     audio: true
// }).then(stream => {

//     addVideoStream(myVideo, stream);
//     peer.on('call', call => {
//         call.answer(stream);
//         const video = document.createElement('video');
//         call.on('stream', userVideoStream => {
//             addVideoStream(video, userVideoStream);
//         })
//     })
//     socket.on('joinVidCall', userId => {
//         // console.log('user Joined ', userId);
//         connectToNewUser(userId, stream)
//     })
// })

// socket.on('userDisconnect', userId => {
//     peers[userId].close();
// })

// peer.on('open', id => {
//     socket.emit('videoCall', { roomId, id });
// })


// function connectToNewUser(id, stream) {
//     const call = peer.call(id, stream);
//     const video = document.createElement('video');
//     call.on('stream', userVideoStream => {
//         addVideoStream(video, userVideoStream);
//     })
//     call.on('close', () => {
//         video.remove()
//     })
//     peers[id] = call;
// }

// function addVideoStream(video, stream) {
//     video.srcObject = stream;
//     video.addEventListener('loadedmetadata', () => {
//         video.play();
//     })
//     videoGrid.append(video);
// }