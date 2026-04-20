document.addEventListener('DOMContentLoaded', () => {
    let index = 0;
    const slider = document.querySelector('.slider_offer');
    const slides = slider.querySelector('.slides_offer');
    const images = slides.querySelectorAll('img');
  
    const nextBtn = slider.querySelector('.next');
    const prevBtn = slider.querySelector('.prev');
  
    function updateSlider() {
      const slideWidth = slider.clientWidth;
      slides.style.transform = `translateX(-${index * slideWidth}px)`;
    }
  
    nextBtn.addEventListener('click', () => {
      index = (index + 1) % images.length;
      updateSlider();
    });
  
    prevBtn.addEventListener('click', () => {
      index = (index - 1 + images.length) % images.length;
      updateSlider();
    });
  
    window.addEventListener('resize', updateSlider);
  });