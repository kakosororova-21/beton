document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('.mobile-toggle');
  const menu = document.querySelector('.mobile-menu');
  const items = document.querySelectorAll('.mobile-menu__item');

  if (!btn || !menu) return;

  // открыть / закрыть меню
  btn.addEventListener('click', () => {
    const open = btn.getAttribute('aria-expanded') === 'true';

    btn.setAttribute('aria-expanded', String(!open));
    menu.classList.toggle('mobile-menu--open');

    document.body.style.overflow = open ? '' : 'hidden';
  });

  // аккордеон + переход по второму клику
  items.forEach(item => {
    const link = item.querySelector('.mobile-menu__link');
    const submenu = item.querySelector('.mobile-submenu');

    if (!submenu || !link) return;

    let opened = false;

    link.addEventListener('click', (e) => {
      if (!opened) {
        e.preventDefault();

        // закрыть другие подменю (опционально)
        items.forEach(i => {
          if (i !== item) {
            i.classList.remove('open');
            i._opened = false;
          }
        });

        item.classList.add('open');
        opened = true;
        item._opened = true;
      }
      // второй клик — переход произойдет сам
    });
  });

  // закрытие при клике на вложенные ссылки
  document.querySelectorAll('.mobile-submenu .mobile-menu__link')
    .forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('mobile-menu--open');
        btn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
});