const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
let timerId = null;

function change(color) {
  color = `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
  return (document.body.style.backgroundColor = color);
}

btnStart.addEventListener('click', () => {
  timerId = setInterval(change, 1000);
  btnStart.setAttribute('disabled', true);
  btnStop.removeAttribute('disabled');
});

btnStop.addEventListener('click', () => {
  clearInterval(timerId);
  btnStop.setAttribute('disabled', true);
  btnStart.removeAttribute('disabled');
});
