import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', onClick);



function onClick(event) {
  
  event.preventDefault();
  const amount = formEl.elements.amount.value;
  const delay = formEl.elements.delay.value;
  const step = formEl.elements.step.value;
  
  let nextStep = parseInt(delay);
  for (let i = 1; i <= amount; i += 1){
      console.log(nextStep);
    createPromise(i, nextStep)
      .then((value) => {
        Notiflix.Notify.success(value);

      })
     .catch((value) => {
       Notiflix.Notify.failure(value);
  
     })
      nextStep = nextStep + parseInt(step);
  }
}


function createPromise(position, delay) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        // Fulfill
        res(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        // Reject
        rej(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
  
}
