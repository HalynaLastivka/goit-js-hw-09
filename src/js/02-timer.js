import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import Notiflix from 'notiflix';

const inputData = document.getElementById('datetime-picker');
const btnStart = document.querySelector('[data-start]');

const dataDay = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');

btnStart.addEventListener('click', onStart);
// reset page
btnStart.disabled = true;
dataDay.textContent = '00';
dataHours.textContent = '00';
dataMinutes.textContent = '00';
dataSeconds.textContent = '00';
inputData.value = '';

console.log(inputData.disabled);

let timerId = null;
const dataNow = new Date(); 
let dataSelect = new Date();


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      dataSelect = selectedDates[0];
      if (dataSelect < dataNow) {
           btnStart.disabled = true;
          Notiflix.Notify.warning('Please choose a date in the future');
      }
    else{
           btnStart.disabled = false;
      }

  },
};

flatpickr('#datetime-picker', options);

console.log(inputData.disabled);


function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}


function onStart() {

  if (dataSelect <= new Date()) {
     Notiflix.Notify.warning('Please choose a date in the future');
    return;
   }
 
  btnStart.disabled = true;
  inputData.disabled = true;

    timerId = setInterval(() => {
        const dataNow = new Date(); 
        const objMs = convertMs(dataSelect.getTime() - dataNow.getTime());
   
        dataDay.textContent = addLeadingZero(objMs.days);
        dataHours.textContent = addLeadingZero(objMs.hours);
        dataMinutes.textContent = addLeadingZero(objMs.minutes);
        dataSeconds.textContent = addLeadingZero(objMs.seconds);

      console.log(inputData.disabled);
       if (objMs.days === 0 && objMs.hours === 0 && objMs.minutes === 0 && objMs.seconds === 0) {
         clearInterval(timerId);
         inputData.disabled = false; // Enable the input field
         btnStart.disabled = false; // Enable the start button
    }

    }, 1000);

}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}