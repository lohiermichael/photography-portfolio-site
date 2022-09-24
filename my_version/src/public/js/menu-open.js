const navButton = document.querySelector('.nav__button');

export function toggleElementsOnMenuOpening(elementsToChangeOpen) {
    navButton.addEventListener('click', () => {
        elementsToChangeOpen.map(element =>{
            element.classList.toggle('menu-open');
        })
    })
}
