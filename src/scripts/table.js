document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".btn_pricelist");

  function setActive(id) {
    // скрыть таблицы
    document.querySelectorAll(".table_field table").forEach(table => {
      table.style.display = "none";
    });

    // сброс кнопок
    buttons.forEach(btn => {
      btn.style.background = "";
      btn.style.color = "";
    });

    // активные элементы
    const table = document.querySelector(".price_" + id);
    const button = document.getElementById(id);

    if (table) table.style.display = "table";

    if (button) {
      button.style.background = "#fff";
      button.style.color = "#1B3764";
      button.style.border = "1px solid #1B3764";
    }
  }

  // старт
  setActive("concrete");

  // клики
  buttons.forEach(button => {
    button.addEventListener("click", function () {
      setActive(this.id);
    });
  });
});