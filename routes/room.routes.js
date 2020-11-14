const express = require('express');
// const { v4: uuidV4 } = require('uuid');
const { v4 } = require('uuid');

const User = require('../models/user');

const router = express.Router();

router.get('/rooms', (req, res, next) => {
    res.redirect(`/${v4()}`)
})

router.get('/:room', (req, res, next) => {
    const roomId = req.params.room;
    req.session.roomId = roomId;
    res.redirect('/')
    // console.log('Room: ', roomId);
    // console.log('----')
    // res.render('room', {
    //     title: 'Video Call',
    //     userId: req.session.user._id,
    //     roomId
    // })
})


module.exports = router;