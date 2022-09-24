const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname + 'public/css')));
app.use('/js', express.static(path.join(__dirname + 'public/js')));
app.use('/img', express.static(path.join(__dirname + 'public/img')));

// Set views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Routes
app.get('/', (_, result) => {
    result.render('gallery');
});

app.get('/contact', (_, result) => {
    result.render('contact');
});

// Port listening
app.listen(PORT, () => {
    console.log(`Application listening at http://localhost:${PORT}`);
});