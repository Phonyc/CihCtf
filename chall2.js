const express = require("express");
exports.chall2App = express();
exports.chall2App.get('/', (req, res) => {
    res.sendFile(__dirname + '/www/chall2/index.html');
});
exports.chall2App.get('/posts.json', (req, res) => {
    res.sendFile(__dirname + '/www/chall2/posts.json');
});

exports.chall2App.get('/login', (req, res) => {
    res.sendFile(__dirname + '/www/chall2/login.html');
});
exports.chall2App.post('/login', (req, res) => {
    // Get and verify creds
    const {username, password} = req.body;
    if (username === 'admin' && password === process.env.PW2) {
        res.send(process.env.FLAG2);
    } else {
        res.status(403).send('Login failed')
    }
});