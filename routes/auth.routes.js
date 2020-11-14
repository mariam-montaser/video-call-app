const express = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

const router = express.Router();

router.get('/signup', (req, res, next) => {
    res.render('signup', { title: 'Sign Up' });
})

router.post('/signup', (req, res, next) => {
    bcrypt.hash(req.body.password, 11).then(hash => {
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            city: req.body.city,
            password: hash
        });
        return user.save()
    }).then(user => {
        console.log(user);
        if (user) {
            res.redirect('/')
        }
    })
        .catch(error => {
            console.log(error);
        })
})

router.get('/login', (req, res, next) => {
    res.render('login', { title: 'Login' })
})

router.post('/login', (req, res, next) => {
    let user;
    User.findOne({ email: req.body.email }).then(fetchedUser => {
        if (fetchedUser) {
            console.log(fetchedUser);
            user = fetchedUser;
            return bcrypt.compare(req.body.password, user.password);
        }
    })
        .then(same => {
            if (same) {
                req.session.user = user;
                res.redirect('/')
            } else {
                res.redirect('/login');
            }
        }).catch(error => {
            console.log(error);

        })
})

router.post('/logout', (req, res, next) => {
    req.session.user = null;
    console.log(req.session.user);
    res.redirect('/login')
})

module.exports = router;