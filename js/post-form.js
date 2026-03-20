const form = document.querySelector("form[name='contact-form']");
const modalToggle = document.getElementById('modal-toggle');
const modalSuccessMsg = document.querySelector('.modal-success-msg');
const modalErrorMsg = document.querySelector('.modal-error-msg');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = {
    name: form['user-name'].value,
    email: form['user-email'].value,
    message: form['user-text'].value
  };

  try {
    const response = await fetch('https://xyz.sat.ua/postavka/hs/satlogistic/orders', {
      method: 'POST',
      headers: {
        Accept: 'application/vnd.sat-logistic.v1+json',
        'Accept-Language': 'uk',
        Authorization: 'Bearer 05e96f1a-1c32-404b-8f9e-3e55ba1d9205',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (response.status === 201 && result.success) {
      form.reset();
      modalSuccessMsg.style.display = 'block';
      modalErrorMsg.style.display = 'none';
      modalToggle.checked = true;
    } else {
      modalSuccessMsg.style.display = 'none';
      modalErrorMsg.style.display = 'block';
      modalErrorMsg.textContent =
        result.errors?.map((e) => e.message).join(', ') || 'Форма не надіслана. Спробуйте пізніше.';
      modalToggle.checked = true;
    }
  } catch (err) {
    modalSuccessMsg.style.display = 'none';
    modalErrorMsg.style.display = 'block';
    modalErrorMsg.textContent = 'Помилка мережі. Спробуйте пізніше.';
    modalToggle.checked = true;
  }
});
