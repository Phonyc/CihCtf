const express = require("express");
exports.chall10App = express();
let {changeSeed, getSeedEmission, getSeed} = require('./chall10commun');
exports.chall10App.use("/administration", require("./chall10admin"))

setInterval(changeSeed, 5000);

let messages = [];


exports.chall10App.get('/add', (req, res) => {
    res.sendFile(__dirname + '/www/chall10/add.html');
});
exports.chall10App.get('/', (req, res) => {
    res.sendFile(__dirname + '/www/chall10/index.html');
    res.cookie('sessionId', new Date().toISOString(), {maxAge: 90000, httpOnly: false});
});
exports.chall10App.get('/index.css', (req, res) => {
    res.sendFile(__dirname + '/www/index.css');
});


exports.chall10App.get('/preview', (req, res) => {
    // Get name and message from query parameters
    const {name, message, date} = req.query;
    if (name === undefined || message === undefined || date === undefined) {
        res.send('Missing name, message or date');
        return;
    }

    const sanitizedMessage = message.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const sanitizedName = name.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    // Display the message
    res.send(`
        <!DOCTYPE html>
        <html lang="fr">
        <body>
            <h1>Confirmer avant d'envoyer</h1>
            <p><strong>Message de:</strong> ${sanitizedName}</p>
            <p><strong>Date :</strong> ${date}</p>
            <p><strong>Message:</strong> ${sanitizedMessage}</p>
            <a href="/send-message?name=${sanitizedName}&message=${sanitizedMessage}&objet=null&footer=null&header=null&date=${date}">Envoyer le message</a>
        </body>
        </html>
    `);
});

// Route to submit a message
exports.chall10App.get('/send-message', (req, res) => {
    const {name, message, date} = req.query;
    const sanitizedMessage = message.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    messages.push(date + ' : ' + name + ' A écrit : ' + sanitizedMessage);
    res.send('Le message à bien été envoyé, nous allons vous répondre sous peu !');
});

// TODO Complexifier l'url
exports.chall10App.get('/viewmessages', (req, res) => {
    let messageList = messages.map(msg => `<li>${msg}</li>`).join('');
    res.cookie('sessionId', process.env.CHALL10ADMIN_COOKIE, {maxAge: 90000, httpOnly: false});
    res.send(`
        <!DOCTYPE html>
        <html lang="fr">
        <body>
            <h1>Messages</h1>
            <ul>${messageList}</ul>
        <script>
        function reload() {
            window.location.reload();
        }
        setInterval(reload, 5000);
        </script>
        </body>
        </html>
    `);
    messages = [];
});


exports.chall10App.get('/random/getseed', (req, res) => {
    res.send(getSeed().toString() + "#Emission :" + getSeedEmission());
});

exports.chall10App.get('/robots.txt', (req, res) => {
    res.sendFile(__dirname + '/www/chall10/robots.txt');
});
