// Кастомная кнопка Play/Pause
const customPlayer = document.getElementById("customPlayer");

// Создаем элемент <audio> и устанавливаем источник
const audio = document.createElement("audio");
audio.src = "./nokia-ringtone.mp3";

// Создаем объект для работы с аудио
// Подробнее — https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement
// const audio = new Audio("./nokia-ringtone.mp3");

// Обработчик клика по кнопке, который
// запускает или ставит на паузу аудио
function play() {
  if (audio.paused) {
    audio.play();
    customPlayer.className = "pause";
  } else {
    audio.pause();
    customPlayer.className = "play";
  }
}

// Обработчик завершения проигрывания аудио
function ended() {
  customPlayer.className = "play";
}

customPlayer.addEventListener("click", play);
audio.addEventListener("ended", ended);
