const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public/html')));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (_, result) => {
    result.render('index.html');
});

app.listen(PORT, () => {
    console.log(`Application listening at http://localhost:${PORT}`);
});