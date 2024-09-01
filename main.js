/* Elementlere ulasmak */

const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const repeatButton = document.getElementById("repeat");
const shuffleButton = document.getElementById("shuffle");
const audio = document.getElementById("audio");
const songImage = document.getElementById("song-image");
const songName = document.getElementById("song-name");
const songArtist = document.getElementById("song-artist");
const pauseButton = document.getElementById("pause");
const playButton = document.getElementById("play");
const playListButton = document.getElementById("playlist");

const maxDuration = document.getElementById("max-duration");
const currentTimeRef = document.getElementById("current-time");

const progressBar = document.getElementById("progress-bar");
const playListContainer = document.getElementById("playlist-container");
const closeButton = document.getElementById("close-button");
const playListSongs = document.getElementById("playlist-songs");

const currentProgress = document.getElementById("current-progress");

// sıra
let index;

// döngü

let loop = true;

// json verisi

const songList = [
  {
    name: "Zhurek",
    link: "audios/adam-zhurek.mp3",
    artist: "Adam",
    img: "images/adam.jpg",
  },
  {
    name: "Alibi",
    link: "audios/alibi.mp3",
    artist: "Ella Handerson",
    img: "images/alibi.png",
  },
  {
    name: "Ben Sana Gelemem",
    link: "audios/mela-bedel-ben-sana-gelemem.mp3",
    artist: "Mela Bedel",
    img: "images/mela-bedel.jpg",
  },
  {
    name: "Greedy",
    link: "audios/tate-mcrae-greedy.mp3",
    artist: "Tate MCrae",
    img: "images/greedy.jpg",
  },
  {
    name: "Yakışıklı",
    link: "audios/Yakışıklı.mp3",
    artist: "Simge",
    img: "images/yakışıklı.jpg",
  },
  {
    name: "Yansıma",
    link: "audios/Yansıma.mp3",
    artist: "Derya Uluğ",
    img: "images/yansıma.jpg",
  },
  {
    name: "Bécane",
    link: "audios/Yame_-_Becane.mp3",
    artist: "Yame",
    img: "images/becane.jpg",
  },
  {
    name: "Training Season",
    link: "audios/dua-lipa-training-season.mp3",
    artist: "Dua Lipa",
    img: "images/DuaLipaTrainingSeason.webp",
  },
];

// oynat
const playAudio = () => {
  audio.play();
  playButton.classList.add("hide");
  pauseButton.classList.remove("hide");
};

// durdur
const pauseAudio = () => {
  audio.pause();
  pauseButton.classList.add("hide");
  playButton.classList.remove("hide");
};

const setSong = (arrayIndex) => {
  let { name, link, artist, img } = songList[arrayIndex];

  audio.src = link;
  songName.innerHTML = name;
  songArtist.innerHTML = artist;
  songImage.src = img;

  audio.onloadedmetadata = () => {
    maxDuration.innerText = timeFormatter(audio.duration);
  };
  playListContainer.classList.add("hide");
  playAudio();
};

// sürekli saniye kontrolü yapma
setInterval(() => {
  currentTimeRef.innerHTML = timeFormatter(audio.currentTime);

  currentProgress.style.width =
    (audio.currentTime / audio.duration.toFixed(3)) * 100 + "%";
}, 1000);

// şarkının istedğimiz yerini çaldırma
progressBar.addEventListener("click", (event) => {
  let coordStart = progressBar.getBoundingClientRect().left;

  let coordEnd = event.clientX;

  let progress = (coordEnd - coordStart) / progressBar.offsetWidth;

  currentProgress.style.width = progress * 100 + "%";

  audio.currentTime = progress * audio.duration;

  audio.play();
  pauseButton.classList.remove("hide");
  playButton.classList.add("hide");
});

// zaman formatlama
const timeFormatter = (timeInput) => {
  let minute = Math.floor(timeInput / 60);
  minute = minute < 10 ? "0" + minute : minute;
  let second = Math.floor(timeInput % 60);
  second = second < 10 ? "0" + second : second;
  return `${minute}:${second}`;
};
//önceki şarkı
const previousSong = () => {
  if (index > 0) {
    pauseAudio();
    index = index - 1;
  } else {
    index = songList.length - 1;
  }
  setSong(index);
};
//sonraki şarkı
const nextSong = () => {
  if (loop) {
    if (index == songList.length - 1) {
      index = 0;
    } else {
      index = index + 1;
    }
    setSong(index);
  } else {
    let randIndex = math.floor(Math.random() * songList.length);
    setSong(randIndex);
  }
};

// şarkı tekrarı
repeatButton.addEventListener("click", () => {
  if (repeatButton.classList.contains("active")) {
    repeatButton.classList.remove("active");
    audio.loop = false;
  } else {
    repeatButton.classList.add("active");
    audio.loop = true;
  }
});

//karıştırıcı
shuffleButton.addEventListener("click", () => {
  if (shuffleButton.classList.contains("active")) {
    shuffleButton.classList.remove("active");
    audio.loop = true;
  } else {
    shuffleButton.classList.add("active");
    audio.loop = false;
  }
});

//şarkı bitiminde diğer şarkıya otomatik geçme
audio.onended = () => {
  nextSong();
};

// oynat butonuna tıklanıldığında
playButton.addEventListener("click", playAudio);

// durdur butonuna tıklanıldığında

pauseButton.addEventListener("click", pauseAudio);

//önceki şarkıya geçiş
prevButton.addEventListener("click", previousSong);

//sonraki şarkıya geçiş
nextButton.addEventListener("click", nextSong);

playListButton.addEventListener("click", () => {
  playListContainer.classList.remove("hide");
});

closeButton.addEventListener("click", () => {
  playListContainer.classList.add("hide");
});

const initializePlayList = () => {
  for (let i in songList) {
    playListSongs.innerHTML += `<li class="playlistSong"
    onclick = "setsong(${i})">
    <div class="playlist-image-container">
       <img src="${songList[i].img}" widht="10px"/>
    </div>
    <div class="playlist-song-details">
      <span id="playlist-song-name">${songList[i].name}</span>
      <span id="playlist-song-artist-album">${songList[i].artist}</span>
    </div>
    </li>
       `;
  }
};

window.onload = () => {
  index = 0;
  setSong(index);
  pauseAudio();
  initializePlayList();
};
