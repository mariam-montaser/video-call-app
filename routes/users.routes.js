const express = require('express');

const User = require('../models/user');

const router = express.Router();

let allUsers = [];

router.get('/', (req, res, next) => {
    if (req.session.user) {
        User.find().then(users => {
            allUsers = users;
            res.render('index', {
                title: 'Homepage',
                user: req.session.user,
                roomId: req.session.roomId,
                allUsers,
                usersByName: null,
                filteredUsers: null,
                searchOption: ''
            })
        })
    } else {
        res.redirect('/login');
    }
})

router.get('/users', (req, res) => {
    let searchOption = {};
    if (req.query.username != null && req.query.username !== "") {
        searchOption.username = new RegExp(req.query.username, 'i');
    }
    User.find(searchOption).then(users => {
        if (users) {

            res.render('index', {
                title: 'Homepage',
                user: req.session.user,
                roomId: req.session.roomId,
                allUsers,
                usersByName: users,
                filteredUsers: null,
                searchOption: req.query
            });
        }
    }).catch(error => {
        console.log(error);
        // res.redirect('/');
    })
})

router.get('/usersByCity', (req, res) => {
    let searchOption = {};
    if (req.query.city != null && req.query.city !== "") {
        searchOption.city = new RegExp(req.query.city, 'i');
    }
    User.find(searchOption).then(fetchedUsers => {
        if (fetchedUsers) {
            res.render('index', {
                title: 'Homepage',
                user: req.session.user,
                roomId: req.session.roomId,
                allUsers,
                usersByName: null,
                filteredUsers: fetchedUsers,
                searchOption: req.query
            });
        }
    }).catch(error => {
        console.log(error);
        // res.redirect('/');
    })
})

module.exports = router;
