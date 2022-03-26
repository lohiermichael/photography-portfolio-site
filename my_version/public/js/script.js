const header =  document.querySelector('.header');
const nav = document.querySelector('.nav');
const navButton = document.querySelector('.nav__button');
const menuNav = document.querySelector('.menu-nav')
const burger = document.querySelector('.burger')
const logo =  document.querySelector('.logo');
const footer =  document.querySelector('.footer');

const elementsToChangeOpen = [
    nav,
    navButton,
    header,
    burger,
    menuNav,
    logo,
    footer
]

let isMenuOpen = false

navButton.addEventListener('click', () => {
    if  (isMenuOpen) {
        elementsToChangeOpen.map(element => element.classList.remove('menu-open'))
        isMenuOpen = false;
    } else {
        elementsToChangeOpen.map(element => element.classList.add('menu-open'))
        isMenuOpen = true;
    }
})
