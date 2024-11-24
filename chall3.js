const express = require("express");

exports.chall3App = express();
exports.chall3App.get('/', (req, res) => {
    res.sendFile(__dirname + '/www/index1_2.html');
});
exports.chall3App.get('/robots.txt', (req, res) => {
    res.sendFile(__dirname + '/www/chall3/robots.txt');
});

exports.chall3App.get('/index.css', (req, res) => {
    res.sendFile(__dirname + '/www/index.css');
});

exports.chall3App.get('/meslogsdeconnexion/logs.txt', (req, res) => {
    res.sendFile(__dirname + '/www/chall3/logs.txt');
});

exports.chall3App.get('/login', (req, res) => {
    res.sendFile(__dirname + '/www/login.html');
});
exports.chall3App.post('/login', (req, res) => {
    // Get and verify creds
    const {username, password} = req.body;
    if (username === 'RooT' && password === process.env.PW3) {
        res.send(process.env.FLAG3);
    } else {
        res.status(403).send('Login failed')
    }
});