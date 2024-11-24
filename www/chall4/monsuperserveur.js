const express = require('express');
const path = require('path');

const app = express();

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Basic route for the homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Example route for a login page
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.post('/login', (req, res) => {
    // Get and verify creds
    const {username, password} = req.body;
    if (username === 'monsuperadmin' && password === "mon#super!mot/de^passe)plus=que&trop-bien{sécurisé|") {
        res.send("Bienvenue sur la page Admin !");
    } else {
        res.status(403).send('Login failed')
    }
});
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});