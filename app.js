// app.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 4000;

// Sample initial data
let userDetails = [];

// Set view engine and views directory
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

// Routes
app.get('/form', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.post('/formPost', (req, res) => {
    const { name, email ,img_link} = req.body;
    userDetails.push({ name, email,img_link});
    res.redirect('/details');
});

app.get('/details', (req, res) => {
    res.render('details', { userDetails });
});

app.get('/details/:index/delete', (req, res) => {
    const { index } = req.params;
    userDetails.splice(index, 1);
    res.redirect('/details');
});

app.get('/details/:index/edit', (req, res) => {
    const { index } = req.params;
    const user = userDetails[index];
    res.render('edit', { user, index });
});

app.post('/details/:index/update', (req, res) => {
    const { index } = req.params;
    const { name, email ,img_link} = req.body;
    userDetails[index] = { name, email ,img_link};
    res.redirect('/details');
});

// Start server
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
