const express = require("express");
const bodyParser = require('body-parser');
const path = require('path');
// TODO Faire en sorte que l'user puisse preview son message et faire en sorte que l'url pour voir les messages soit plus compliqué
// La faille XSS sera dans le champ "date", qui ne sera pas modifiable en html
exports.chall6App = express();

exports.chall6App.use(bodyParser.urlencoded({ extended: true }));

let messages = [];

// Serve static files from the 'public' directory
exports.chall6App.use(express.static(path.join(__dirname, 'public')));
exports.chall6App.get('/', (req, res) => {
    res.sendFile(__dirname + '/www/chall6/index.html');
});
// Route to submit a message
exports.chall6App.post('/send-message', (req, res) => {
    const { message } = req.body;
    messages.push(message);
    res.send('Message sent to admin!');
});

exports.chall6App.get('/admin/messages', (req, res) => {
    let messageList = messages.map(msg => `<li>${msg}</li>`).join('');
    res.send(`
        <html>
        <body>
            <h1>Messages</h1>
            <ul>${messageList}</ul>
        </body>
        </html>
    `);
});
