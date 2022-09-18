const navButton = document.querySelector('.nav__button');

export function toggleElementsOnMenuOpening(elementsToChangeOpen) {
    navButton.addEventListener('click', () => {
        elementsToChangeOpen.map(element =>{
            console.log(element.classList);
            element.classList.toggle('menu-open');
        })
    })
}
