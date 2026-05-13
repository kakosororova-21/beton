import nodemailer from 'nodemailer';

export const prerender = false;

export async function POST({ request }) {
  // 1. Получаем данные из формы
  let data;
  try {
    data = await request.json();
  } catch (error) {
    console.error('Ошибка: тело запроса не является валидным JSON.', error);
    return new Response(JSON.stringify({ message: 'Неверный формат данных.' }), { status: 400 });
  }

  const { name, phone } = data;

  // 2. Базовая валидация на сервере
  if (!name || !phone) {
    return new Response(JSON.stringify({ message: 'Имя и телефон обязательны.' }), { status: 400 });
  }

  console.log('Получена заявка:', { name, phone });

  // 3. Настройка Nodemailer (используем переменные окружения)
  // Эти переменные нужно будет добавить в ваш проект
  const transporter = nodemailer.createTransport({
    host: import.meta.env.EMAIL_HOST,
    port: parseInt(import.meta.env.EMAIL_PORT || '587'),
    secure: import.meta.env.EMAIL_PORT === '465', // true для 465, false для остальных
    auth: {
      user: import.meta.env.EMAIL_USER,
      pass: import.meta.env.EMAIL_PASSWORD,
    },
  });

  // 4. Опции письма
  const mailOptions = {
    from: `"Заявка с сайта" <${import.meta.env.EMAIL_USER}>`,
    to: 'sales@mavis-beton.ru', // Ваш email для получения заявок
    subject: 'Новая заявка с сайта Бетон! ✔',
    html: `
      <h2>Получена новая заявка с вашего сайта!</h2>
      <p><strong>Имя:</strong> ${name}</p>
      <p><strong>Телефон:</strong> ${phone}</p>
      <hr/>
      <p><em>Это письмо отправлено автоматически.</em></p>
    `,
  };

  // 5. Отправка письма
  try {
    await transporter.sendMail(mailOptions);
    console.log('Письмо успешно отправлено!');
    return new Response(JSON.stringify({ message: 'Заявка успешно отправлена!' }), { status: 200 });
  } catch (error) {
    console.error('Ошибка отправки письма:', error);
    // Возвращаем клиенту сообщение об ошибке, но скрываем детали
    return new Response(JSON.stringify({ message: 'Не удалось отправить заявку. Пожалуйста, попробуйте позже.' }), { status: 500 });
  }
}
