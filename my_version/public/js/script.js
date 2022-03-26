const navButton = document.querySelector('.nav__button');
let isMenuOpen = false

navButton.addEventListener('click', () => {
    if  (isMenuOpen) {
        navButton.classList.remove('menu-open');
        isMenuOpen = false;
    } else {
        navButton.classList.add('menu-open');
        isMenuOpen = true;
    }
})
