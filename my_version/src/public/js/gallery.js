// Make horizontal scrolling on vertical scrolling from tablet view: 768px
const galleryContainer = document.querySelector('.gallery-container');
galleryContainer.addEventListener('wheel', (scrollingEvent) => {
  if (window.innerWidth >= 768) {
    scrollingEvent.preventDefault();
    galleryContainer.scrollLeft += scrollingEvent.deltaY + scrollingEvent.deltaX;
  }
});
