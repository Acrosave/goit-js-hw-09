import Notiflix, { Notify } from 'notiflix';
const form = document.querySelector('.form');
form.addEventListener('submit', submit);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, 2000);
  });
}
function submit(x) {
  x.preventDefault();
  let delay = Number(form.elements.delay.value);
  const step = Number(form.elements.step.value);
  const amount = Number(form.elements.amount.value);

  for (let index = 1; index <= amount; index++) {
    createPromise(index, delay).then(onSucces).catch(onError);
    delay += step;
  }
}
function onSucces({ position, delay }) {
  Notiflix.Notify.success(`Aprobada ${position} en ${delay}ms`);
}
function onError({ position, delay }) {
  Notiflix.Notify.failure(`Denegada ${position} en ${delay}ms`);
}
