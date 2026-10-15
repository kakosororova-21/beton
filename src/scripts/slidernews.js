const wrapper = document.querySelector('.news-wrapper');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const items = document.querySelectorAll('.news-item');

let currentIndex = 0;
let visibleItems = getVisibleItems();
const totalItems = items.length;

function getVisibleItems() {
  return window.innerWidth <= 768 ? 1 : 2;
}

function updateSlider() {
  visibleItems = getVisibleItems();

  const itemWidth = items[0].offsetWidth + 20; // ширина + gap
  const maxIndex = totalItems - visibleItems;

  // чтобы индекс не выходил за пределы после ресайза
  currentIndex = Math.min(currentIndex, maxIndex);

  const offset = -(currentIndex * itemWidth);
  wrapper.style.transform = `translateX(${offset}px)`;
}

prevBtn.addEventListener('click', () => {
  currentIndex = Math.max(currentIndex - 1, 0);
  updateSlider();
});

nextBtn.addEventListener('click', () => {
  const maxIndex = totalItems - visibleItems;
  currentIndex = Math.min(currentIndex + 1, maxIndex);
  updateSlider();
});

window.addEventListener('resize', updateSlider);

// первый запуск
updateSlider();