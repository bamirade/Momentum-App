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

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(getWeatherData);
} else {
  alert('Geolocation is not supported by this browser.');
}

function getWeatherData(position) {
  const {latitude, longitude} = position.coords;
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=30df0010a3aea22978f6f52a56a252e2`)
    .then(response => response.json())
    .then(data => {
      cityElem.innerText = data.name;
      tempElem.innerText = Math.round(data.main.temp - 273.15) + '°C';
      descElem.innerText = data.weather[0].description;
      iconElem.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather Icon">`;
      localStorage.setItem('weatherData', JSON.stringify(data));
    })
    .catch(error => console.error(error));
}

//for functionality test proxy % mock location
const locationBtn = document.getElementById('btn-location');
locationBtn.addEventListener('click', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getWeatherData);
  } else {
    alert('Geolocation is not supported by this browser.');
  }
});

const storedData = localStorage.getItem('weatherData');
if (storedData) {
  const data = JSON.parse(storedData);
  cityElem.innerText = data.name;
  tempElem.innerText = Math.round(data.main.temp - 273.15) + '°C';
  descElem.innerText = data.weather[0].description;
  iconElem.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather Icon">`;
}

//querySelector(.quotes) *doesn't show as template literal, prolly css? or try <q> for each tag. kek, need to sleep >>>:
const quotes = [
  {
    q: `An old silent pond
        A frog jumps into the pond—
        Splash! Silence again.`,
    a: "Matsuo Bashō"
  },
  {
    q: `A world of dew,
        And within every dewdrop
        A world of struggle.`,
    a: "Kobayashi Issa"
  },
  {
    q: `The light of a candle
        Is transferred to another candle—
        Spring twilight`,
    a: "Yosa Buson"
  },
  {
    q: `I write, erase, rewrite
        Erase again, and then
        A poppy blooms.`,
    a: "Katsushika Hokusai"
  },
  {
    q: `Over the wintry
        Forest, winds howl in rage
        With no leaves to blow.`,
    a: "Natsume Sōseki"
  }
];


const quotesElement = document.querySelector('.quotes');

function updateQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const { q, a } = quotes[randomIndex];
  quotesElement.textContent = `${q} - ${a}`;
}

updateQuote();
setInterval(updateQuote, 5000);

const clearStorageBtn = document.getElementById('clear-storage');
function clearStorage() {
  localStorage.clear();
  location.reload();
}

clearStorageBtn.addEventListener('click', clearStorage);

// localStorage

//#paging (integrate code from survey form?)

//universal