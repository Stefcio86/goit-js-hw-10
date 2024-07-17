import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const startBtn = document.querySelector('button[data-start]');
const inputDate = document.querySelector('#datetime-picker');
const timerValue = {
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

startBtn.disabled = true;
let dateNow = Date.now();
let timeLeft = 0;
let selectedDate = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (Date.parse(selectedDates[0]) < dateNow) {
      iziToast.error({
        message: 'Please choose a date in the future',
      });
      startBtn.disabled = true;
    } else {
      selectedDate = Date.parse(selectedDates[0]);
      startBtn.disabled = false;
    }
  },
};

const fp = flatpickr(inputDate, options);

startBtn.addEventListener('click', onStartBtnClick);

function onStartBtnClick() {
  const interval = setInterval(() => {
    dateNow = Date.now();
    timeLeft = selectedDate - dateNow;
    if (timeLeft > 0) {
      const convertTimeLeft = convertMs(timeLeft);
      timerValue.days.textContent = convertTimeLeft.days;
      timerValue.hours.textContent = convertTimeLeft.hours;
      timerValue.minutes.textContent = convertTimeLeft.minutes;
      timerValue.seconds.textContent = convertTimeLeft.seconds;
    } else {
      clearInterval(interval);
    }
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}