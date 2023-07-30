

const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');

startButton.addEventListener('click', onStart);
stopButton.addEventListener('click', onStop);
let timerId = 0;

function onStart() {
    
    if (!startButton.disabled) {
        stopButton.disabled = false;
        startButton.disabled = true;
        timerId = setInterval(() => {
            document.body.style.background = getRandomHexColor();
        }, 1000)

    }
}

function onStop() {
    if (!stopButton.disabled) {
        stopButton.disabled = true;
        startButton.disabled = false;
        clearInterval(timerId);
    }
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}
