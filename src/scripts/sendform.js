document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('#form1, #form2');
  
    forms.forEach(form => {
      form.addEventListener('submit', async (e) => {
        e.preventDefault(); // Отменяем стандартную отправку
  
        const nameInput = form.querySelector('input[name="name"]');
        const phoneInput = form.querySelector('input[name="phone"]');
        const consentInput = form.querySelector('input[type="checkbox"]');
        const submitBtn = form.querySelector('input[type="submit"]');
  
        const data = {
          name: nameInput.value.trim(),
          phone: phoneInput.value.trim(),
          consent: consentInput.checked
        };
  
        // Базовая валидация на клиенте
        if (!data.name || !data.phone || !data.consent) {
          alert('Пожалуйста, заполните все поля и дайте согласие.');
          return;
        }
  
        // Простая проверка телефона
        const phoneRegex = /^[\d\+\-\(\)\s]{10,18}$/;
        if (!phoneRegex.test(data.phone)) {
          alert('Введите корректный номер телефона.');
          return;
        }
  
        // UI: показываем загрузку
        const originalBtnText = submitBtn.value;
        submitBtn.value = 'Отправка...';
        submitBtn.disabled = true;
  
        try {
          const response = await fetch('/api/submit-form', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          });
  
          const result = await response.json();
  
          if (response.ok) {
            alert(result.message || 'Заявка успешно отправлена!');
            form.reset();
          } else {
            throw new Error(result.error || 'Ошибка сервера');
          }
        } catch (error) {
          console.error('Ошибка отправки:', error);
          alert(error.message || 'Не удалось отправить форму. Попробуйте позже.');
        } finally {
          submitBtn.value = originalBtnText;
          submitBtn.disabled = false;
        }
      });
    });
  });