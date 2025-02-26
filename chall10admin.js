let {getSeed, getActualToken, changeSeed} = require("./chall10commun");
const router = require("express").Router()

function isAdmin(req) {
    return req.cookies.sessionId === process.env.CHALL10ADMIN_COOKIE;
}

function fax(token, key, seed) {
    return BigInt(BigInt(parseInt(token, 2)) ^ BigInt((parseInt(key, 2) + parseInt(fibonacci(seed).toString().charAt(3) + fibonacci(seed).toString().charAt(6)) + 16))).toString(2);
}


// Max approx : F70
function fibonacci(n) {
    return Math.round((1.6180339887498948482045868343656381177203091798057628621354486227052604628189024497072072041893911374847540880753868917521266338622235369317931800607667263544333890865959395829056383226613199282902678806752087668925017116962070322210432162695486262963136144381497587012203408058879544547492461856953648644492410 ** n) / Math.sqrt(5))
}

router.get('/token/fax', (req, res) => {
    const {token} = req.query;
    if (isAdmin(req)) {
        let result = fax(token, process.env.CHALL10KEY, getSeed()).toString()
        changeSeed();
        res.send("Envoyé & parsé :" + BigInt(parseInt(token, 2)).toString(2) + " | Result :" + result + ' | La seed vient d\'être changée');
    } else {
        res.status(403).send("Forbidden");
    }
});

router.get('/verify/token', (req, res) => {
    if (isAdmin(req)) {
        res.send(getActualToken());
    } else {
        res.status(403).send("Forbidden");
    }
});

router.post('/verify', (req, res) => {
    if (isAdmin(req)) {
        console.log(getActualToken());
        console.log(fax(getActualToken(), process.env.CHALL10KEY, getSeed()).toString());
        console.log(req.body["result"]);
        if (fax(getActualToken(), process.env.CHALL10KEY, getSeed()).toString() === req.body["result"]) {
            res.send(process.env.FLAG10);
        } else {

            res.send("Wrong result");
        }
    } else {
        res.status(403)
    }
});

router.get('/doc', (req, res) => {
    if (isAdmin(req)) {
        res.sendFile(__dirname + '/www/chall10/doc.html');
    } else {
        res.status(403).send("Forbidden");
    }
});

router.get('/', (req, res) => {
    if (isAdmin(req)) {
        res.redirect('/administration/doc');
    } else {
        res.status(403).send("Forbidden");
    }
});

router.get('/index.css', (req, res) => {
    res.sendFile(__dirname + '/www/index.css');
});

module.exports = router;