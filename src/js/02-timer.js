import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

let selectDate = new Date();
let currentDate = new Date();
let countimer = {};

const data = {
  button: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

data.button.setAttribute('disabled', true);
const options = {
  enableTime: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectDate = selectedDates[0];
    if (selectDate > currentDate) {
      Notiflix.Notify.success('Fecha Valida !!!');
      data.button.removeAttribute('disabled');
    } else {
      Notiflix.Notify.failure('Por favor seleccione una fecha en el futuro');
    }
  },
};
flatpickr('#datetime-picker', options);

data.button.addEventListener('click', () => {
  const timer = setInterval(() => {
    currentDate = new Date();
    if (currentDate < selectDate) {
      countimer = convertMs(selectDate - currentDate);
      upDate(countimer);
      data.button.setAttribute('disabled', true);
    } else {
      clearInterval(timer);
    }
  }, 1000);
});

function upDate(countimer) {
  data.days.textContent = addLeadingZero(countimer.days);
  data.hours.textContent = addLeadingZero(countimer.hours);
  data.minutes.textContent = addLeadingZero(countimer.minutes);
  data.seconds.textContent = addLeadingZero(countimer.seconds);
}
