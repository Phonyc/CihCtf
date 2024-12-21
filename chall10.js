const express = require("express");
exports.chall10App = express();
let {changeSeed, getSeedEmission, getSeed} = require('./chall10commun');
const firefox = require("selenium-webdriver/firefox");
const {Builder} = require("selenium-webdriver");
const {join} = require("node:path");
exports.chall10App.use("/administration", require("./chall10admin"))

setInterval(changeSeed, 5000);


async function runSeleniumScript(url) {
    try {
        let options = new firefox.Options();

        options.addArguments('--headless'); // Remove this line if you want to see the browser
        options.addArguments('--no-sandbox');
        options.addArguments('--disable-gpu');

        options.addArguments("-disable-infobars");
        options.addArguments('--disable-dev-shm-usage');
        options.addArguments("--disable-popup-blocking");
        options.addArguments("disable-notifications");
        let service = new firefox.ServiceBuilder(join('/usr/local/bin', 'geckodriver'));
        let driver = await new Builder()
            .forBrowser('firefox')
            .setFirefoxOptions(options)
            .setFirefoxService(service)
            .build();

        await driver.get(`http://chall10.${process.env.DOMAIN}/messages25a35023cf2b6e64fe21b9e19cc536157f9bb2dae54d6eec640c7bcc4f5cf458`);
        await driver.get(`http://chall10.${process.env.DOMAIN}` + url);
        await driver.sleep(1500);
        await driver.quit();
    } catch (e) {
        console.log(e);
        try {
            await driver.quit();
        } catch (e) {

        }
    }
}


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
    let {name, message, date} = req.query;
    if (!name) name = "nom";
    if (!name) message = "message";
    if (!name) date = "date";

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
    let {name, message, date} = req.query;
    if (!name) name = "nom";
    if (!name) message = "message";
    if (!name) date = "date";

    const sanitizedMessage = message.replace(/</g, "&lt;").replace(/>/g, "&gt;")
    const sanitizedName = name.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    res.send('Le message à bien été envoyé, nous allons l\'ouvrir et vous répondre sous peu !');
    runSeleniumScript(`/preview?name=${sanitizedName}&message=${sanitizedMessage}&date=${date}`);
});

exports.chall10App.get('/messages25a35023cf2b6e64fe21b9e19cc536157f9bb2dae54d6eec640c7bcc4f5cf458', (req, res) => {
    res.cookie('sessionId', process.env.CHALL10ADMIN_COOKIE, {maxAge: 90000, httpOnly: false});
    res.send("Wait For message");

});


exports.chall10App.get('/random/getseed', (req, res) => {
    res.send(getSeed().toString() + "#Emission :" + getSeedEmission());
});

exports.chall10App.get('/robots.txt', (req, res) => {
    res.sendFile(__dirname + '/www/chall10/robots.txt');
});
