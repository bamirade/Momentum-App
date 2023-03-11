//Background Image 
const images = ['image4.png', 'image2.png', 'image3.png']; //sample only, FIND THEME SOON!!!
let index = 0;

//Preload
const imageObjects = [];
for (const image of images) {
  const img = new Image();
  img.src = `media/${image}`;
  imageObjects.push(img);
}


//change every 5 seconds *1 minute, add transition
setInterval(() => {
  const imageUrl = `url('media/${images[index]}')`;
  document.querySelector('body').style.backgroundImage = `${imageUrl}`;
  index = (index + 1) % images.length;
}, 5000);


//Real-Time Clock - HH:MM:SS *i.can be 12h or 24h & time zone
function updateTime() {
  var now = new Date();
  var hours = now.getHours();
  var minutes = now.getMinutes();
  var seconds = now.getSeconds();
  hours = (hours < 10 ? "0" : "") + hours;
  minutes = (minutes < 10 ? "0" : "") + minutes;
  seconds = (seconds < 10 ? "0" : "") + seconds;
  var timeString = hours + ":" + minutes + ":" + seconds;
  document.querySelector(".clock").textContent = timeString;
  setTimeout(updateTime, 1000);
}
updateTime();
