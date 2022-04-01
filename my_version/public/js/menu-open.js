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

navButton.addEventListener('click', () => {
    elementsToChangeOpen.map(element =>{
        element.classList.toggle('menu-open')
    })
})