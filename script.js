const videos = [
  "assets/video/1vector_demo.mp4",
  "assets/video/2city.mp4",
  "assets/video/3codingdemo.mp4",
  "assets/video/4stockmarket.mp4",
  "assets/video/5codingdemo.mp4"
];

let current = 0;
const videoElement = document.getElementById("heroVideo");

setInterval(() => {
  current = (current + 1) % videos.length;
  videoElement.src = videos[current];
  videoElement.play();
}, 4000);