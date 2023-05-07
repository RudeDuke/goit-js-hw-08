import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const STORAGE_KEY = 'videoplayer-current-time';
const UPDATE_FREQUENCY = 1000; // => встановлюємо частоту збереження часу відтворення

// Створюємо функцію збереження часу відтворення
const saveCurrentTime = throttle(time => {
  localStorage.setItem(STORAGE_KEY, time);
}, UPDATE_FREQUENCY);

// Встановлюємо обробник події 'timeupdate'
player.on('timeupdate', event => {
  const currentTime = event.seconds;
  saveCurrentTime(currentTime);
});

// Створюємо функцію для відновлення показу
const restoreCurrentTime = () => {
  const currentTime = localStorage.getItem(STORAGE_KEY);
  if (currentTime) {
    player.setCurrentTime(currentTime);
  }
};

// Відтворюємо показ відео з місця, де перервали перегляд
restoreCurrentTime();
