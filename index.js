const express = require('express');
const vhost = require('vhost');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

const {chall1App} = require('./chall1');
const {chall2App} = require('./chall2');
const {chall3App} = require('./chall3');
const {chall4App} = require('./chall4');

// Utilisation de vhost pour diriger les sous-domaines vers les applications correspondantes
app.use(vhost('127.0.0.1', chall1App));
app.use(vhost('127.0.0.2', chall2App));
app.use(vhost('127.0.0.3', chall3App));
app.use(vhost('127.0.0.4', chall4App));

// Démarrage du serveur
app.listen(3000, () => {
    console.log('Serveur en écoute sur le port 3000');
});