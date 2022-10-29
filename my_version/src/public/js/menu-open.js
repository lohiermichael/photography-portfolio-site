// It is initialized in the header.js file but some elements can be added to it
// in other Javascript files: contact.js, gallery.js...
import { elementsToChangeOpen } from './header.js'

const navButton = document.querySelector('.nav__button');

navButton.addEventListener('click', () => {
    elementsToChangeOpen.map(element => {
        element.classList.toggle('menu-open');
    })
});

