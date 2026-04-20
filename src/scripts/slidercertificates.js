const slider = document.getElementById('slider');
const slides = document.querySelectorAll('.slide');
const prev = document.getElementById('prev');
const next = document.getElementById('next');

let index = 0;

function getVisibleCount() {
  if (window.innerWidth <= 600) return 1;
  if (window.innerWidth <= 900) return 2;
  return 3;
}

function updateSlider() {
  const visible = getVisibleCount();
  const slideWidth = slides[0].clientWidth;
  slider.style.transform = `translateX(-${index * slideWidth}px)`;
}

next.addEventListener('click', () => {
  if (index < slides.length - getVisibleCount()) {
    index++;
    updateSlider();
  }
});

prev.addEventListener('click', () => {
  if (index > 0) {
    index--;
    updateSlider();
  }
});

window.addEventListener('resize', updateSlider);

updateSlider();

/* Fullscreen */
const fullscreen = document.getElementById('fullscreen');
const fsImg = document.getElementById('fullscreen-img');
const close = document.getElementById('close');
const fsPrev = document.querySelector('.fs-prev');
const fsNext = document.querySelector('.fs-next');

let currentIndex = 0;

slides.forEach((slide, i) => {
  slide.addEventListener('click', () => {
    fullscreen.style.display = 'flex';
    fsImg.src = slide.src;
    currentIndex = i;
  });
});

close.addEventListener('click', () => {
  fullscreen.style.display = 'none';
});
