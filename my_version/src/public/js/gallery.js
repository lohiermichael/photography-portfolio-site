import { elementsToChangeOpen } from './header.js';

// Hide these elements on menu-open
elementsToChangeOpen.push(
    document.querySelector('.gallery-container'),
    document.querySelector('.background-video'),
)

// Make horizontal scrolling on vertical scrolling from tablet view: 768px
const galleryContainer = document.querySelector('.gallery-container');
galleryContainer.addEventListener('wheel', (scrollingEvent) => {
  if (window.innerWidth >= 768) {
    scrollingEvent.preventDefault();
    galleryContainer.scrollLeft += scrollingEvent.deltaY + scrollingEvent.deltaX;
  }
});

const galleryImages = galleryContainer.querySelectorAll('img');

// Only reveal visible images at launched

// Launch animation properties
let name = 'revealAnimation';
let duration = '1s';
let fillMode = 'forwards';

let initialRevealedIndex = 1;
const ANIMATION_INIT_TIME = 1; // seconds
const ANIMATION_MULTIPLIER = 0.3;

galleryImages.forEach(image => {
  image.addEventListener('load', () => {
    if (isImageVisible(image)) {
      let delay = String(
        ANIMATION_INIT_TIME + ANIMATION_MULTIPLIER * initialRevealedIndex
      ) + 's';
      let animation = `${duration} ${delay} ${fillMode} ${name}`
      initialRevealedIndex += 1
      image.style.animation = animation;

    }
  })
})

// When scrolling revealing images that appear
galleryContainer.addEventListener('wheel', () => {
  galleryImages.forEach(image => {
    const imageVisible = isImageVisible(image);
    if (!(image.classList.contains('reveal')) & imageVisible) {
      if (image.style.animationName == 'revealAnimation') {
        console.log('object');
        image.style.removeProperty('animation')
      }
      image.classList.replace('hide', 'reveal');
    }
    else if ((image.classList.contains('reveal')) & !imageVisible) {
      image.classList.replace('reveal', 'hide');
    }
  })
});

function isImageVisible(image) {
  const imageBounding = image.getBoundingClientRect();
  return (
      imageBounding.top < window.outerHeight &
      imageBounding.bottom > 0 &
      imageBounding.right > 0 &
      imageBounding.left < window.outerWidth
    );
}
