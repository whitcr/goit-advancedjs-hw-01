import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageTextarea = form.querySelector('textarea[name="message"]');

const updateLocalStorage = throttle(() => {
  const formData = {
    email: emailInput.value,
    message: messageTextarea.value,
  };
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}, 500);

form.addEventListener('input', function () {
  updateLocalStorage();
});

const storedData = localStorage.getItem('feedback-form-state');

if (storedData) {
  const data = JSON.parse(storedData);
  emailInput.value = data.email;
  messageTextarea.value = data.message;
} else {
  emailInput.value = '';
  messageTextarea.value = '';
}

form.addEventListener('submit', function (event) {
  event.preventDefault();
  localStorage.removeItem('feedback-form-state');
  emailInput.value = '';
  messageTextarea.value = '';
});
