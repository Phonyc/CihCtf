const express = require("express");
const bodyParser = require('body-parser');
exports.chall6App = express();

exports.chall6App.use(bodyParser.urlencoded({extended: true}));

let messages = [];

exports.chall6App.get('/add', (req, res) => {
    res.sendFile(__dirname + '/www/chall6/add.html');
});
exports.chall6App.get('/', (req, res) => {
    res.sendFile(__dirname + '/www/chall6/index.html');
    res.cookie('session', new Date().toISOString(), { maxAge: 90000, httpOnly: false });
});
exports.chall6App.get('/index.css', (req, res) => {
    res.sendFile(__dirname + '/www/index.css');
});


exports.chall6App.get('/preview', (req, res) => {
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
exports.chall6App.get('/send-message', (req, res) => {
    const {name, message, date} = req.query;
    const sanitizedMessage = message.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    messages.push(date + ' : ' + name + ' A écrit : ' + sanitizedMessage);
    res.send('Le message à bien été envoyé, nous allons vous répondre sous peu !');
});

exports.chall6App.get('/admin/messages25a35023cf2b6e64fe21b9e19cc536157f9bb2dae54d6eec640c7bcc4f5cf458', (req, res) => {
    let messageList = messages.map(msg => `<li>${msg}</li>`).join('');
    res.cookie('session', process.env.FLAG6, { maxAge: 90000, httpOnly: false });
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
