document.addEventListener('DOMContentLoaded', () => {
    const openBtns = document.querySelectorAll('.btn_call');
  
    openBtns.forEach(btn => {
      // Находим оверлей ВНУТРИ того же call-component, что и кнопка
      const overlay = btn.closest('.call-component')?.querySelector('.overlay');
      const closeBtn = overlay?.querySelector('.close');
      
      if (!overlay) return;
  
      // Открыть оверлей
      const openOverlay = (e) => {
        e?.preventDefault();
        overlay.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // блокируем скролл
      };
  
      // Закрыть оверлей
      const closeOverlay = () => {
        overlay.style.display = 'none';
        document.body.style.overflow = '';
      };
  
      btn.addEventListener('click', openOverlay);
      // Поддержка touch для мобильных
      btn.addEventListener('touchend', (e) => {
        e.preventDefault();
        openOverlay(e);
      });
  
      closeBtn?.addEventListener('click', closeOverlay);
      
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeOverlay();
      });
  
      // Escape работает только если оверлей виден
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.style.display === 'flex') {
          closeOverlay();
        }
      });
    });
  });