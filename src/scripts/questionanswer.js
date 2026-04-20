document.querySelectorAll(".faq-item").forEach(item => {
    const question = item.querySelector(".faq-question");
    const toggle = item.querySelector(".faq-toggle");

    const toggleFaq = () => {
      item.classList.toggle("open");
    };

    question.addEventListener("click", toggleFaq);
    toggle.addEventListener("click", (e) => {
      e.stopPropagation(); // чтобы клик на плюсике не срабатывал дважды
      toggleFaq();
    });
  });