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
