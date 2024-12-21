const express = require("express");
const bodyParser = require('body-parser');

const {Builder} = require('selenium-webdriver');

const firefox = require("selenium-webdriver/firefox");
const {join} = require("node:path");

async function runSeleniumScript(url) {
    let options = new firefox.Options();

    options.addArguments('--headless'); // Remove this line if you want to see the browser
    options.addArguments('--no-sandbox');
    options.addArguments('--disable-gpu');

    options.addArguments("-disable-infobars");
    options.addArguments('--disable-dev-shm-usage');
    options.addArguments("--disable-popup-blocking");
    options.addArguments("disable-notifications");
    let service = new firefox.ServiceBuilder(join('/usr/local/bin', 'geckodriver')).build();
    let driver = await new Builder()
        .forBrowser('firefox')
        .setFirefoxOptions(options)
        .setFirefoxService(service)
        .build();

    await driver.get(`http://chall6.${process.env.DOMAIN}/admin/messages25a35023cf2b6e64fe21b9e19cc536157f9bb2dae54d6eec640c7bcc4f5cf458`);
    await driver.get(`http://chall6.${process.env.DOMAIN}` + url);
    await driver.sleep(1500);
    await driver.quit();
}

exports.chall6App = express();

exports.chall6App.use(bodyParser.urlencoded({extended: true}));


exports.chall6App.get('/add', (req, res) => {
    res.sendFile(__dirname + '/www/chall6/add.html');
});
exports.chall6App.get('/', (req, res) => {
    res.sendFile(__dirname + '/www/chall6/index.html');
    res.cookie('session', new Date().toISOString(), {maxAge: 90000, httpOnly: false});
});
exports.chall6App.get('/index.css', (req, res) => {
    res.sendFile(__dirname + '/www/index.css');
});


exports.chall6App.get('/preview', (req, res) => {
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
exports.chall6App.get('/send-message', (req, res) => {
    let {name, message, date} = req.query;
    if (!name) name = "nom";
    if (!name) message = "message";
    if (!name) date = "date";

    const sanitizedMessage = message.replace(/</g, "&lt;").replace(/>/g, "&gt;")
    const sanitizedName = name.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    res.send('Le message à bien été envoyé, nous allons l\'ouvrir et vous répondre sous peu !');
    runSeleniumScript(`/preview?name=${sanitizedName}&message=${sanitizedMessage}&date=${date}`);
});

exports.chall6App.get('/admin/messages25a35023cf2b6e64fe21b9e19cc536157f9bb2dae54d6eec640c7bcc4f5cf458', (req, res) => {
    res.cookie('session', process.env.FLAG6, {maxAge: 90000, httpOnly: false});
    res.send("Wait For message");
});
