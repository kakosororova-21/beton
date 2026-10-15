      const preloader = document.getElementById('page-preloader');
      if (preloader) {
        const hide = () => preloader.classList.add('loaded');
        // Если страница уже загрузилась (кэш/быстрый переход)
        if (document.readyState === 'complete') hide();
        else window.addEventListener('load', hide);
      }