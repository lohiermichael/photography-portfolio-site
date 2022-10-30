require("dotenv").config()
const express = require('express');
const path = require('path');
const fs = require('fs');
const nodeMailer = require('nodemailer');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');

const app = express();
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
        <hr>
        <h3>Name:</h3> ${name},<br><br>
        <hr>
        <h3>Email:</h3> ${email},<br><br>
        <hr>
        <h3>Telephone:</h3> ${telephone},<br><br>
        <hr>
        <h3>Website:</h3> ${website}, <br><br>
        <hr>
        <h3>Message:</h3> <br>

        ${message} <br><br>
        <hr>
        <br><br>
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

// Main route: gallery with photos in the main folder
app.get('/', (_, response) => {

    // Get all images in the file
    rootPathImages = path.join(GALLERY_IMAGES_FOLDER, 'main');
    galleryImages = fs.readdirSync(rootPathImages);

    response.render('gallery', { relativePathImages: '/img/main' , galleryImages });
});

// Contact GET route: Empty form data returned
app.get('/contact', (_, response) => {
    response.render('contact', {
        alertMsgPerInput: new Map(),
        nameInput: '',
        emailInput: '',
        telephoneInput: '',
        websiteInput: '',
        messageInput: ''
    });
});

// Contact POST route: validate form and send an email
// - If the form is not validated, we're redirected to the contact GET route
// and the form is filled with the latest changes
// - If the form is validated, we're redirected to the thanks route
app.post(
    '/contact',
    check('name')
        .not().isEmpty()
            .withMessage('The name is required'),
    check('email')
        .not().isEmpty()
            .withMessage('The email is required')
        .bail()
        .isEmail()
            .withMessage('Please enter a valid email')
        .normalizeEmail(),
    check('message')
        .not().isEmpty()
            .withMessage('The message is required'),
    async (request, response) => {
        const errors = validationResult(request);
        const { name, email, telephone, website, message } = request.body;
        if (!errors.isEmpty()) {
            const alerts = errors.array();
            const alertMsgPerInput = new Map();
            alerts.forEach(alert => {
                alertMsgPerInput.set(alert.param, alert.msg);
            });
            response.render('contact', {
                alertMsgPerInput,
                nameInput: name,
                emailInput: email,
                telephoneInput: telephone,
                websiteInput: website,
                messageInput: message
            })
        }
    try {
        await sendEmail(name, email, telephone, website, message);
        console.info('Email sent successfully!')
        response.redirect('thanks');
    } catch (error) {
        console.error('Error:', error);
        response.status(500).send('Server error :(');
    }
});

// Thanks route
app.get('/thanks', (_, response) => {
    response.render('thanks');
});

// CV route
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

// Gallery routes: gallery with photos of one of the folders of GALLERY_NAMES
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

// Wildcard
app.get('*', (_, response) => {
    response.status(404).render('404')
})

module.exports = app;