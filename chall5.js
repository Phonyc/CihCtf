const express = require("express");

exports.chall5App = express();

exports.chall5App.get('/cap.pcap', (req, res) => {
    res.sendFile(__dirname + '/www/chall5/cap.pcap');
});

exports.chall5App.get('/robots.txt', (req, res) => {
    res.redirect("/cap.pcap");
});

exports.chall5App.get('/', (req, res) => {
    res.sendFile(__dirname + '/www/index1_2.html');
});

exports.chall5App.get('/index.css', (req, res) => {
    res.sendFile(__dirname + '/www/index.css');
});

exports.chall5App.get('/login', (req, res) => {
    res.sendFile(__dirname + '/www/login.html');
});

exports.chall5App.post('/login', (req, res) => {
    // Get and verify creds
    const {username, password} = req.body;
    if (username === process.env.UNAME5 && password === process.env.PW5) {
        res.send(process.env.FLAG5);
    } else {
        res.status(403).send('Login failed')
    }
});