const heroVideoSources = [
  "assets/video/1vector_demo.mp4",
  "assets/video/2city.mp4",
  "assets/video/3codingdemo.mp4",
  "assets/video/4stockmarket.mp4",
  "assets/video/5codingdemo.mp4"
];

let currentHeroVideoIndex = 0;

const heroVideoElement = document.getElementById("heroVideo");

setInterval(() => {
  currentHeroVideoIndex =
    (currentHeroVideoIndex + 1) % heroVideoSources.length;

  heroVideoElement.src = heroVideoSources[currentHeroVideoIndex];
  heroVideoElement.play();
}, 4000);