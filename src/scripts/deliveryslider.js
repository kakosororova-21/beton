const track = document.querySelector('.slider-wrapper');
const cards = document.querySelectorAll('.card');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const pagination = document.querySelector('.pagination');

let index = 0;
let visibleCards;
let cardWidth;
let maxIndex;

function getVisibleCards() {
  if (window.innerWidth <= 600) return 1;
  if (window.innerWidth <= 900) return 2;
  return 3;
}

function createDots() {
  pagination.innerHTML = '';
  for (let i = 0; i <= maxIndex; i++) {
    const dot = document.createElement('div');
    dot.className = 'pagination-dot';
    if (i === index) dot.classList.add('active');

    dot.addEventListener('click', () => {
      index = i;
      updateSlider();
    });

    pagination.appendChild(dot);
  }
}

function updateSlider() {
  track.style.transform = `translateX(-${index * cardWidth}px)`;

  prev.disabled = index === 0;
  next.disabled = index === maxIndex;

  document.querySelectorAll('.pagination-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

function recalc() {
  visibleCards = getVisibleCards();
  cardWidth = cards[0].offsetWidth + 20;
  maxIndex = cards.length - visibleCards;
  index = Math.min(index, maxIndex);

  createDots();
  updateSlider();
}

next.addEventListener('click', () => {
  if (index < maxIndex) {
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

window.addEventListener('resize', recalc);

recalc();