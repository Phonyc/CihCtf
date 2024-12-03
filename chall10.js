const express = require("express");
exports.chall10App = express();
let {changeSeed, getSeedEmission, getSeed} = require('./chall10commun');
exports.chall10App.use("/admin", require("./chall10admin"))

setInterval(changeSeed, 5000);


exports.chall10App.get('/random/getseed', (req, res) => {
    res.send(getSeed().toString() + "#Emission :" + getSeedEmission());
});
