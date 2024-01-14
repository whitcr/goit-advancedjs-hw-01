import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const saveTime = time => {
  localStorage.setItem('videoplayer-current-time', time);
};

const setCurrentTime = () => {
  const savedTime = localStorage.getItem('videoplayer-current-time');
  if (savedTime !== null) {
    player.setCurrentTime(parseFloat(savedTime));
  }
};

player.on(
  'timeupdate',
  throttle(data => {
    const currentTime = data.seconds;
    saveTime(currentTime);
  }, 1000)
);

setCurrentTime();
