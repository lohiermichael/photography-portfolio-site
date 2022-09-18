import { toggleElementsOnMenuOpening } from './menu-open.js';

export const elementsToChangeOpen = [
    document.querySelector('.header'),
    document.querySelector('.nav'),
    document.querySelector('.nav__button'),
    document.querySelector('.menu-nav'),
    document.querySelector('.burger'),
    document.querySelector('.logo'),
    document.querySelector('.footer'),
];

toggleElementsOnMenuOpening(elementsToChangeOpen);
