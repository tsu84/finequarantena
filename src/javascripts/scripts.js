const Countdown = require('countdown');
const randomColor = require('random-color');

const end = new Date(2020, 5 - 1, 4);
let now;

function getWeekDay(date) {
  const weekdays = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];
  const day = date.getDay();
  return weekdays[day];
}

function getRandomColor() {
  const color = randomColor();
  return color.hexString();
}

function srvTime() {
  const xmlHttp = new XMLHttpRequest();
  xmlHttp.open('HEAD', window.location.href.toString(), false);
  xmlHttp.setRequestHeader('Content-Type', 'text/html');
  xmlHttp.send('');
  now = new Date(xmlHttp.getResponseHeader('Date'));
}

function getCountdown() {
  const ts = new Countdown(now, end);
  Countdown.resetLabels();
  Countdown.setLabels(
    ' millisecondo| secondo| minuto| ora| giorno| settimana| mese| anno| decennio| secolo| millennio',
    ' millisecondi| secondi| minuti| ore| giorni| settimane| mesi| anni| decenni| secoli| millenni',
    ' e ',
    ', ',
    'adesso',
  );
  return ts.toString();
}

function showCountdown() {
  document.getElementById('countdown').innerHTML = getCountdown(now);
}

function updateCountdown() {
  const ms = now.getTime() + 1000;
  now = new Date(ms);
  showCountdown(now);
}

window.addEventListener('DOMContentLoaded', () => {
  const color = getRandomColor();
  document.body.style.backgroundColor = color;

  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  };
  document.getElementById('date').innerHTML = `${getWeekDay(end)}, ${new Intl.DateTimeFormat('it-IT', options).format(end)}`;
  srvTime();
  setInterval(updateCountdown, 1000);
  document.getElementsByClassName('lds-ellipsis')[0].style.display = 'none';
  document.getElementById('text').style.display = 'block';
});
