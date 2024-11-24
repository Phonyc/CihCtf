const express = require("express");
exports.chall1App = express();

exports.chall1App.get('/', (req, res) => {
    res.sendFile(__dirname + '/www/index1_2.html');
});

exports.chall1App.get('/index.css', (req, res) => {
    res.sendFile(__dirname + '/www/index.css');
});

exports.chall1App.get('/login', (req, res) => {
    res.sendFile(__dirname + '/www/login.html');
});

exports.chall1App.post('/login', (req, res) => {
    const {username, password} = req.body;
    if (username === 'admin' && password === 'admin') {
        res.send(process.env.FLAG1);
    } else {
        res.status(403).send('Login failed')
    }
});