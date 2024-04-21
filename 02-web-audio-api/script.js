// Кнопка Play/Pause
// Инпут управления громкостью
// Инпут управления балансом стерео
const customPlayer = document.getElementById("customPlayer");
const volumeControl = document.getElementById("volume");
const balanceStereoControl = document.getElementById("balance");

// Инициализируем переменные Web Audio API
let audioContext;
let audio;
let source;
let gainNode;
let pannerNode;

// Функция для инициализации аудио контекста
function setupAudioContext() {
  // Создаем новый аудио контекст
  audioContext = new AudioContext();

  /**
   * Создаем объект для работы с аудио
   * Подробнее — https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement
   */
  // audio = new Audio("./new-nokia-ringtone.mp3");
  audio = new Audio(
    "https://42c8094e-d943-43ab-aac0-6fe1a69370d7.selstorage.ru/new-nokia-ringtone.mp3"
  );

  // Снимаем ограничения по CORS, чтобы можно
  // было получать аудио с CDN
  audio.crossOrigin = "Anonymous";

  // Зацикливаем аудио, чтобы было удобнее тестировать
  audio.loop = true;

  // Добавляем обработчик окончания проигрывания
  audio.addEventListener("ended", ended);

  // Создаем узел источника аудио
  source = audioContext.createMediaElementSource(audio);

  // Создаем узел для управления громкости
  gainNode = audioContext.createGain();

  // Создаем узел для управления стерео балансом
  pannerNode = audioContext.createStereoPanner();

  // Соединяем все модули вместе
  source
    .connect(gainNode)
    .connect(pannerNode)
    .connect(audioContext.destination);
}

// Обработчик изменения гропкости
function changeVolume() {
  gainNode.gain.value = this.value;
}

// Обработчик изменения гропкости
function changeBalance() {
  pannerNode.pan.value = this.value;
}

// Обработчик клика по кнопке, который
// запускает или ставит на паузу аудио
function play() {
  // Делаем это именно после клика пользователя,
  // так как нельзя начать работу с аудио
  // без действия пользователя на странице
  if (!audioContext) {
    setupAudioContext();
  }

  // Если аудио на паузе, то возобновляем воспроизведение.
  // В противном случае — наоборот, останавливаем.
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

// Устанавливаем обработчики HTML элементам
customPlayer.addEventListener("click", play);
volumeControl.addEventListener("input", changeVolume, false);
balanceStereoControl.addEventListener("input", changeBalance, false);
