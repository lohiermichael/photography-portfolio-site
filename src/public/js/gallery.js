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

// When scrolling revealing images that appear
galleryContainer.addEventListener('wheel', () => {
  galleryImages.forEach(image => {
    const imageVisible = isImageVisible(image);
    if (!(image.classList.contains('reveal')) & imageVisible) {
      if (image.style.animationName == 'revealAnimation') {
        image.style.removeProperty('animation')
      }
      image.classList.add('reveal');
    }
    else if ((image.classList.contains('reveal')) & !imageVisible) {
      image.classList.remove('reveal');
    }
  })
});

function isImageVisible(image) {
  const imageBounding = image.getBoundingClientRect();
  return (
      imageBounding.top < window.innerHeight &
      imageBounding.bottom > 0 &
      imageBounding.right > 0 &
      imageBounding.left < window.innerWidth
    );
}

// Prevent right click for downloading images
document.addEventListener('contextmenu', event => event.preventDefault());
