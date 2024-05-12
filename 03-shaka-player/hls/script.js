// Можем создать аудио элемент самостоятельно
const customPlayer = document.getElementById("customPlayer");
const audio = new Audio();

// Создаем экземпляр Shaka Player и подключаем DRM
const player = new shaka.Player(
  audio
  // {
  //   drm: {
  //     servers: {
  //       "com.widevine.alpha": `https://audio.streaming.com/drm/widevine`,
  //       "com.apple.fps": `https://audio.streaming.com/drm/fairplay`,
  //     },
  //   },
  // }
);

// Указание, что нужно использовать HLS трансмуксер
shaka.media.ManifestParser.registerParserByExtension(
  "m3u8",
  shaka.hls.HlsParser
);
shaka.media.ManifestParser.registerParserByMime(
  "application/vnd.apple.mpegurl",
  shaka.hls.HlsParser
);
shaka.media.ManifestParser.registerParserByMime(
  "application/x-mpegURL",
  shaka.hls.HlsParser
);

// URL к HLS плейлисту аудио
const manifestUri =
  "https://42c8094e-d943-43ab-aac0-6fe1a69370d7.selstorage.ru/index.m3u8";

// Загружаем трек в плеер и обрабатываем статусы
player
  .load(manifestUri)
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
