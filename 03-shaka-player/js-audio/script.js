// Shaka не работает с локальными файлами и требует
// публичной ссылки по HTTP или HTTPS
const audioUri =
  "https://42c8094e-d943-43ab-aac0-6fe1a69370d7.selstorage.ru/remix-nokia-ringtone.mp3";

// Можем создать аудио элемент самостоятельно
const customPlayer = document.getElementById("customPlayer");
const audio = new Audio();

// Создаем экземпляр Shaka Player
const player = new shaka.Player(audio);

// Загружаем трек в плеер и обрабатываем статусы
player
  .load(audioUri)
  .then(() => {
    console.log("Трек загружен успешно!");
  })
  .catch((error) => {
    console.error("Произошла ошибка при загрузке трека:", error);
  });

// Логгирование ошибок от Shaka Player
player.addEventListener("error", function (event) {
  console.error("Error code", event.detail.code, "object", event.detail);
});

// Обработчик клика по кнопке, который
// запускает или ставит на паузу аудио
function play() {
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

// Устанавливаем обработчики HTML элементам
customPlayer.addEventListener("click", play);
