require("dotenv").config()
const express = require('express');
const path = require('path');
const fs = require('fs');
const nodeMailer = require('nodemailer');
const bodyParser = require('body-parser');

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

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Function to send an email on the contact form
async function sendEmail(name, email, telephone, website, message) {
    const transporter = await nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.SENDER_GMAIL_USER,
            pass: process.env.SENDER_GMAIL_PASSWORD,
            }
    });
    const mailOptions = {
        from: process.env.SENDER_GMAIL_USER,
        to: process.env.RECIPIENT_EMAIL,
        subject: 'NOUVEAU CONTACT sur LaurentXDubois',
        html: `
        Bonjour Laurent, <br><br>
        Tu as un nouveau message sur laurentxdubois.com: <br><br>
        Name: ${name},<br><br>
        Email: ${email},<br><br>
        Telephone: ${telephone},<br><br>
        Website: ${website}, <br><br>
        Message: <br>

        ${message} <br><br>

        Pense à le recontacter! <br><br>

        Le bot de laurentxdubois.com
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        return Promise.resolve('Email successfully sent!');
    } catch (error) {
        return Promise.reject(error);
    }
}

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

app.post('/contact', async (request, response) => {
    const { name, email, telephone, website, message } = request.body;
    try {
        await sendEmail(name, email, telephone, website, message);
        console.info('Email sent successfully!')
        response.redirect('thanks');
    } catch (error) {
        console.error('Error:', error);
        response.redirect('contact');
    }
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