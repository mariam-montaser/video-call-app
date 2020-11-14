const noteEl = document.querySelector('.note-msg');
const userId = document.getElementById('id').value;
// const roomId = document.getElementById('roomId').value;
const username = document.getElementById('username').value;
const usersEls = document.querySelectorAll('.user-item');
const usersLiEls = document.querySelectorAll('.user-list-item');
////////////////////////////////////////////////////////////

socket.on('connect', () => {
    socket.emit('userJoin', { userId, username });
})

socket.on('message', message => {
    showNotification(message);
    updateUserToActive(message)
})

socket.on('userDisconnect', username => {
    updateUserToInactive(username)
})

// socket.on('activeUsers', users => {
//     outputUsers(users);
// })

function showNotification(message) {
    const span = document.createElement('span');
    span.classList.add('alert-success');
    span.textContent = `${message.text}`;
    noteEl.appendChild(span);
    setTimeout(() => {
        span.remove();
    }, 2000)
}

function updateUserToActive(data) {
    usersEls.forEach(userEl => {
        if (userEl.textContent === data.username) {
            userEl.nextElementSibling.classList.remove('red');
            userEl.nextElementSibling.classList.add('green');
            userEl.nextElementSibling.classList.add('active');
        }
    })
}

function updateUserToInactive(username) {
    usersEls.forEach(userEl => {
        if (userEl.textContent === username) {
            userEl.nextElementSibling.classList.remove('green');
            userEl.nextElementSibling.classList.remove('active');
            userEl.nextElementSibling.classList.add('red');
        }
    })
}



// /////////////////////////////////////////////////////////////////

// for video call

const peer = new Peer();
let peerId;
let roomId;

peer.on('open', id => {
    peerId = id;
})

usersLiEls.forEach(listItem => {
    listItem.addEventListener('click', () => {
        // socket.emit('requestRoomId');
        socket.emit('sendPeerId', peerId);
        // console.log('roomId');
    })
})
// console.log(roomId)
// socket.on('getRoomId', roomID => {
//     // socket.emit('sendId', { peerId, roomId });
//     roomId = roomID;
//     console.log(roomId);

// })

socket.on('getPeerId', peerId => {
    console.log(peerId);
    navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
    }).then(stream => {
        const call = peer.call(peerId, stream);
        call.on('stream', receivedStream => {
            // console.log('stream');
            outputVideoStream(receivedStream);
        })
    })
})

peer.on('call', call => {
    navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
    }).then(stream => {
        console.log('call');
        call.answer(stream);
        call.on('stream', receivedStream => {
            outputVideoStream(receivedStream);
        })
    })
})


// socket.on('receiveId', id => {
//     console.log(id);
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
const videoGrid = document.getElementById('video-grid');
console.log(videoGrid);
// videoGrid.className = 'video-grid';
function outputVideoStream(stream) {
    const video = document.createElement('video');
    console.log(video)
    video.muted = true;
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
        video.play();
    })
    videoGrid.appendChild(video);
    // document.body.prepend(videoGrid);
}
