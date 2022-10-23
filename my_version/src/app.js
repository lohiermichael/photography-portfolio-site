const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;
const GALLERY_IMAGES_FOLDER = path.join(__dirname + '/public/img/');

// Static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname + 'public/css')));
app.use('/img', express.static(path.join(__dirname + 'public/img')));
app.use('/data', express.static(path.join(__dirname + 'public/data')));
app.use('/js', express.static(path.join(__dirname + 'public/js')));
app.use('/video', express.static(path.join(__dirname + 'public/video')));

// Set views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Routes
app.get('/', (_, response) => {

    // Get all images in the file
    rootPathImages = path.join(GALLERY_IMAGES_FOLDER, 'main');
    galleryImages = fs.readdirSync(rootPathImages);

    response.render('gallery', { relativePathImages: '/img/main' , galleryImages });
});

app.get('/contact', (_, response) => {
    response.render('contact');
});

app.get('/thanks', (_, response) => {
    response.render('thanks');
});

app.get('/cv', (_, response) => {
    response.sendFile(
        path.join(__dirname + '/public/data/CVLaurentDuboisPhotography.pdf')
    );
})


GALLERY_NAMES = [
    'fashion-week-1',
    'fashion-week-2',
    'portraits',
    'projects',
    'agency-test',
    'editorial'
]

// Routes
app.get('/:galleryName', (request, response) => {
    galleryName = request.params['galleryName']
    if (!GALLERY_NAMES.includes(galleryName)) {
        response.status(404).render('404')
    } else {
        // Get all images in the file
        rootPathImages = path.join(GALLERY_IMAGES_FOLDER, galleryName);
        galleryImages = fs.readdirSync(rootPathImages);

        response.render(
            'gallery',
            { relativePathImages: `/img/${galleryName}`, galleryImages }
        );
    }
});

// Port listening
app.listen(PORT, () => {
    console.log(`Application listening at http://localhost:${PORT}`);
});