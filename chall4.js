const express = require("express");
const {join, normalize} = require("node:path");

exports.chall4App = express();

// Servir les fichiers statiques de /chall4/www
exports.chall4App.use(express.static(join(__dirname, 'www/chall4/www')));

// Route vulnérable permettant l'accès aux fichiers en dehors de /chall4/www
exports.chall4App.get('/file', (req, res) => {
    const filePath = req.query.path.replaceAll('../', '/').replaceAll('\\', '/').replaceAll('./', '');
    // "...\../" pour avoir ../
    const basePath = join(__dirname, 'www/chall4/www');
    const basePathMax = join(__dirname, 'www/chall4');
    const resolvedPath = normalize(join(basePath, filePath));

    if (!resolvedPath.startsWith(basePathMax)) {
        return res.status(403).send('Access denied');
    }

    res.sendFile(resolvedPath, (err) => {
        if (err) {
            res.status(500).send('Cannot access' + filePath);
        }
    });
});

exports.chall4App.post('/login.html', (req, res) => {
    // Get and verify creds
    const {username, password} = req.body;
    if (username === process.env.UNAME4 && password === process.env.PW4) {
        res.send(process.env.FLAG4);
    } else {
        res.status(403).send('Login failed')
    }
});
