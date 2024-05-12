// Shaka не работает с локальными файлами и требует
// публичной ссылки по HTTP или HTTPS
const audioUri =
  "https://42c8094e-d943-43ab-aac0-6fe1a69370d7.selstorage.ru/remix-nokia-ringtone.mp3";

// Можем использовать HTML5 Audio тег
const audio = document.getElementById("audioPlayer");

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
