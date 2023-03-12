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

//Real-Time Clock - HH:MM:SS *i.can be 12h or 24h & time zone --onclick
let is24HourFormat = false;
const clockElement = document.querySelector(".clock");

function updateTime() {
	const now = new Date();
	let hours = now.getHours();
	let minutes = now.getMinutes();
	let seconds = now.getSeconds();

	if (is24HourFormat) {
		hours = (hours < 10 ? "0": "") + hours;
		minutes = minutes < 10 ? "0" + minutes: minutes;
		seconds = seconds < 10 ? "0" + seconds: seconds;
		const suffix = "";
		clockElement.textContent = `${hours}:${minutes}:${seconds} ${suffix}`;
  } else {
    const suffix = hours < 12 ? "AM" : "PM";
    hours = ((hours + 11) % 12 + 1);
    hours = (hours < 10 ? "0" : "") + hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    clockElement.textContent = `${hours}:${minutes}:${seconds} ${suffix}`;
  }
}

function toggleFormat() {
	is24HourFormat = !is24HourFormat;
	updateTime();
}

clockElement.addEventListener("click", toggleFormat);
setInterval(updateTime, 1000);

//Location + Weather (Time too, depends on proxy/gps detected)
const cityElem = document.getElementById('city');
const tempElem = document.getElementById('temperature');
const descElem = document.getElementById('description');
const iconElem = document.getElementById('icon');
const locationBtn = document.getElementById('btn-location');
locationBtn.addEventListener('click', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const {latitude, longitude} = position.coords;
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=30df0010a3aea22978f6f52a56a252e2`)
      .then(response => response.json())
      .then(data => {
        cityElem.innerText = data.name;
        tempElem.innerText = Math.round(data.main.temp - 273.15) + '°C';
        descElem.innerText = data.weather[0].description;
        iconElem.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather Icon">`;
      })
      .catch(error => console.error(error));
    });
  } else {
    alert('Geolocation is not supported by this browser.');
  }
});


// localStorage

//paging (integrate code from survey form?)
