const videos = [
  "assets/video/1vector_demo.mp4",
  "assets/video/2codingdemo.mp4",
  "assets/video/3stockmarket.mp4",
  "assets/video/4codingdemo.mp4"
];

let current = 0;
const videoElement = document.getElementById("heroVideo");

setInterval(() => {
  current = (current + 1) % videos.length;

  videoElement.src = videos[current];
  videoElement.load();
  videoElement.play();
}, 5000); // change every 5 seconds