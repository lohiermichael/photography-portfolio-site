// It is initialized in the header.js file but some elements can be added to it
// in other Javascript files: contact.js, gallery.js...
import { elementsToChangeOpen } from './header.js'

let STATE = "CLOSED"

// For mobiles on click item-with-dropdown show the dropdown
const itemWithDropdown = document.querySelector('.menu-nav__item-with-dropdown>.menu-nav__link');
const dropdownMenu = document.querySelector('.menu-nav__dropdown-menu');
itemWithDropdown.addEventListener('click', () => {
    dropdownMenu.classList.toggle('dropdown-open');
    itemWithDropdown.classList.toggle('dropdown-open');
});

// const navButton = document.querySelector('.nav__button');
const burgerButton = document.querySelector('.burger-button');

function toggleMobileMenu() {
    elementsToChangeOpen.map(element => {
        element.classList.toggle('menu-open');
    })
};

burgerButton.addEventListener('click', () => {
    // If it is opened, close the dropdown when closing the menu
    if (STATE == "OPENED") {
        dropdownMenu.classList.remove('dropdown-open');
        itemWithDropdown.classList.remove('dropdown-open');
    }

    // Update the state
    if (STATE == "CLOSED") {
        STATE = "OPENED";
    } else {
        STATE = "CLOSED";
    }
    toggleMobileMenu();

});


// Close mobile menu on resize
window.addEventListener('resize', () => {
    const isMenuOpened = elementsToChangeOpen[0].classList.contains('menu-open');
    if (window.innerWidth >= 768 & isMenuOpened) toggleMobileMenu();

});

