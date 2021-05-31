"use strict";

function pageTransition() {
  var tl = gsap.timeline();
  tl.to("ul.transition li", {
    duration: 0.5,
    scaleY: 1,
    transformOrigin: "bottom  left",
    stagger: 0.2
  });
  tl.to("ul.transition li", {
    duration: 0.5,
    scaleY: 0,
    transformOrigin: "bottom  left",
    stagger: 0.1,
    delay: 0.1
  });
}

function contentAnimation() {
  var tl = gsap.timeline();
  tl.from('.left', {
    duration: 1.5,
    translateY: 50,
    opacity: 0
  });
  tl.to("img", {
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
  });
}

function delay(n) {
  n = n || 2000;
  return new Promise(function (done) {
    setTimeout(function () {
      done();
    }, n);
  });
}

barba.init({
  sync: true,
  transitions: [{
    leave: function leave(data) {
      var done;
      return regeneratorRuntime.async(function leave$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              done = this.async();
              pageTransition();
              _context.next = 4;
              return regeneratorRuntime.awrap(delay(1500));

            case 4:
              done();

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    },
    enter: function enter(data) {
      return regeneratorRuntime.async(function enter$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              contentAnimation();

            case 1:
            case "end":
              return _context2.stop();
          }
        }
      });
    },
    once: function once(data) {
      return regeneratorRuntime.async(function once$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              contentAnimation();

            case 1:
            case "end":
              return _context3.stop();
          }
        }
      });
    }
  }]
});
var musicContainer = document.getElementById("music-container");
var playBtn = document.getElementById("play");
var prevBtn = document.getElementById("prev");
var nextBtn = document.getElementById("next");
var audio = document.getElementById("audio");
var progress = document.getElementById("progress");
var progressContainer = document.getElementById("progress-container");
var title = document.getElementById("title");
var cover = document.getElementById("cover");
var currTime = document.querySelector("#currTime");
var durTime = document.querySelector("#durTime"); // Song titles

var songs = ["aludra", "getaway", "locofunk"]; // Keep track of song

var songIndex = 2; // Initially load song details into DOM

loadSong(songs[songIndex]); // Update song details

function loadSong(song) {
  title.innerText = song;
  audio.src = "Resources/music/".concat(song, ".mp3");
  cover.src = "Resources/images/".concat(song, ".jpg");
} // Play song


function playSong() {
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");
  audio.play();
} // Pause song


function pauseSong() {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fas").classList.add("fa-play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");
  audio.pause();
} // Previous song


function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);
  playSong();
} // Next song


function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);
  playSong();
} // Update progress bar


function updateProgress(e) {
  var _e$srcElement = e.srcElement,
      duration = _e$srcElement.duration,
      currentTime = _e$srcElement.currentTime;
  var progressPercent = currentTime / duration * 100;
  progress.style.width = "".concat(progressPercent, "%");
} // Set progress bar


function setProgress(e) {
  var width = this.clientWidth;
  var clickX = e.offsetX;
  var duration = audio.duration;
  audio.currentTime = clickX / width * duration;
} //get duration & currentTime for Time of song


function DurTime(e) {
  var _e$srcElement2 = e.srcElement,
      duration = _e$srcElement2.duration,
      currentTime = _e$srcElement2.currentTime;
  var sec;
  var sec_d; // define minutes currentTime

  var min = currentTime == null ? 0 : Math.floor(currentTime / 60);
  min = min < 10 ? "0" + min : min; // define seconds currentTime

  function get_sec(x) {
    if (Math.floor(x) >= 60) {
      for (var i = 1; i <= 60; i++) {
        if (Math.floor(x) >= 60 * i && Math.floor(x) < 60 * (i + 1)) {
          sec = Math.floor(x) - 60 * i;
          sec = sec < 10 ? "0" + sec : sec;
        }
      }
    } else {
      sec = Math.floor(x);
      sec = sec < 10 ? "0" + sec : sec;
    }
  }

  get_sec(currentTime, sec); // change currentTime DOM

  currTime.innerHTML = min + ":" + sec; // define minutes duration

  var min_d = isNaN(duration) === true ? "0" : Math.floor(duration / 60);
  min_d = min_d < 10 ? "0" + min_d : min_d;

  function get_sec_d(x) {
    if (Math.floor(x) >= 60) {
      for (var i = 1; i <= 60; i++) {
        if (Math.floor(x) >= 60 * i && Math.floor(x) < 60 * (i + 1)) {
          sec_d = Math.floor(x) - 60 * i;
          sec_d = sec_d < 10 ? "0" + sec_d : sec_d;
        }
      }
    } else {
      sec_d = isNaN(duration) === true ? "0" : Math.floor(x);
      sec_d = sec_d < 10 ? "0" + sec_d : sec_d;
    }
  } // define seconds duration


  get_sec_d(duration); // change duration DOM

  durTime.innerHTML = min_d + ":" + sec_d;
} // Event listeners


playBtn.addEventListener("click", function () {
  var isPlaying = musicContainer.classList.contains("play");

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
}); // Change song

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong); // Time/song update

audio.addEventListener("timeupdate", updateProgress); // Click on progress bar

progressContainer.addEventListener("click", setProgress); // Song ends

audio.addEventListener("ended", nextSong); // Time of song

audio.addEventListener("timeupdate", DurTime);