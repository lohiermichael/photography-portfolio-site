// It is initialized in the header.js file but some elements can be added to it
// in other Javascript files: contact.js, gallery.js...
import { elementsToChangeOpen } from './header.js'

const navButton = document.querySelector('.nav__button');

function toggleMobileMenu() {
    elementsToChangeOpen.map(element => {
        element.classList.toggle('menu-open');
    })
}

navButton.addEventListener('click', () => toggleMobileMenu());

// Close mobile menu on resize
window.addEventListener('resize', () => {
    const isMenuOpened = elementsToChangeOpen[0].classList.contains('menu-open');
    if (window.innerWidth >= 768 & isMenuOpened) toggleMobileMenu();

});
