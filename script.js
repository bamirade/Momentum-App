const images = ['waves1.svg', 'waves2.svg', 'waves3.svg', 'waves4.svg', 'waves5.svg', 'waves6.svg', 'waves7.svg', 'waves8.svg', 'waves9.svg', 'waves10.svg'];
let index = 0;
const imageObjects = [];

for (const image of images) {
  const img = new Image();
  img.src = `media/${image}`;
  imageObjects.push(img);
}

function waveBgRandom() {
  const randomNumber = Math.floor(Math.random() * 10) + 1;
  const imageUrl = `url('media/waves${randomNumber}.svg')`;
  document.querySelector('.wave').style.backgroundImage = imageUrl;
}

waveBgRandom();

function waveBackground() {
  const imageUrl = `url('media/${images[index]}')`;
  document.querySelector('.wave').style.backgroundImage = `${imageUrl}`;
  index = (index + 1) % images.length;
}

setInterval(waveBackground, 60000);

const now = new Date();
const hour = now.getHours();
let gradientColors;

function bodyBackground() {
  if (hour >= 6 && hour < 18) {
    gradientColors = 'radial-gradient(ellipse at bottom, #87CEEB 0%, #1E90FF 100%)';
  } else {
    gradientColors = 'radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%)';
  }
  const imageUrl = ` ${gradientColors}`;
  document.querySelector('body').style.backgroundImage = `${imageUrl}`;
};

bodyBackground();

const images2 = [];
for (let i = 1; i <= 19; i++) {
  images2.push(`image${i}.webp`);
}

const imageObjects2 = [];
for (const image of images2) {
  const img = new Image();
  img.src = `media/img1/${image}`;
  imageObjects2.push(img);
}

let index2 = 0;

function chibiBackground() {
  const imageUrl = `url('media/img1/${images2[index2]}')`;
  document.querySelector('.page.two .chibi').style.backgroundImage = `${imageUrl}`;
  index2 = (index2 + 1) % images2.length;
}

chibiBackground();
setInterval(chibiBackground, 5000);

let is24HourFormat = false;
const clockElement1 = document.querySelector(".page.one .clock");
const clockElement2 = document.querySelector(".page.two .clock");

function updateTime() {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  if (is24HourFormat) {
    hours = (hours < 10 ? "0" : "") + hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    const suffix = "";
    clockElement1.textContent = `${hours}:${minutes}:${seconds} ${suffix}`;
    clockElement2.textContent = `${hours}:${minutes}:${seconds} ${suffix}`;
  } else {
    const suffix = hours < 12 ? "AM" : "PM";
    hours = ((hours + 11) % 12 + 1);
    hours = (hours < 10 ? "0" : "") + hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    clockElement1.textContent = `${hours}:${minutes}:${seconds} ${suffix}`;
    clockElement2.textContent = `${hours}:${minutes}:${seconds} ${suffix}`;
  }
}

function toggleFormat() {
  is24HourFormat = !is24HourFormat;
  updateTime();
}

clockElement1.addEventListener("click", toggleFormat);
clockElement2.addEventListener("click", toggleFormat);
setInterval(updateTime, 1000);

const dateElement1 = document.querySelector(".page.one .date");
const dateElement2 = document.querySelector(".page.two .date");

function updateDate() {
  const year = now.getFullYear();
  const month = now.toLocaleString("default", {
    month: "long"
  });
  const day = now.getDate();

  dateElement1.textContent = `${month} ${day}, ${year}`;
  dateElement2.textContent = `${month} ${day}, ${year}`;
}

updateDate();

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
  const {
    latitude,
    longitude
  } = position.coords;
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

const quotesElement = document.querySelector('.quotes');
const quoteTextElement = quotesElement.querySelector('q');
const authorElement = quotesElement.querySelector('a');

function fetchQuote() {
  fetch('https://type.fit/api/quotes')
    .then(res => res.json())
    .then(data => {
      const randomIndex = Math.floor(Math.random() * data.length);
      const {
        text,
        author
      } = data[randomIndex];
      quoteTextElement.textContent = text;
      authorElement.textContent = author ? ` - ${author}` : '';
    })
    .catch(err => console.error(err));
}

fetchQuote();
setInterval(fetchQuote, 60000);

const clearStorageBtn = document.getElementById('clear-storage');

function clearStorage() {
  localStorage.clear();
  location.reload();
}

clearStorageBtn.addEventListener('click', clearStorage);

const nextPageButton = document.querySelector('.next-button');
const pageOne = document.querySelector('.page.one');
const pageTwo = document.querySelector('.page.two');
const displayName = document.getElementById('display-name');

function showPageTwo() {
  const name = document.getElementById('name').value;
  if (name) {
    localStorage.setItem('name', name);
    displayName.textContent = "\u00A0" + name;
    pageOne.style.display = 'none';
    pageTwo.style.display = 'grid';
  }
}

nextPageButton.addEventListener('click', showPageTwo);

document.getElementById('name').addEventListener('keyup',
  function (event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      nextPageButton.click();
    }
  });

const storedName = localStorage.getItem('name');
if (storedName) {
  displayName.textContent = `\u00A0 ${storedName}`;
  pageOne.style.display = 'none';
  pageTwo.style.display = 'grid';
}

function updateName() {
  const newName = prompt('Enter your new name:');
  if (newName) {
    localStorage.setItem('name', newName);
    displayName.textContent = "\u00A0" + newName;
  }
}

displayName.addEventListener('click', updateName);

const greeting1 = document.querySelector(".page.one #greeting");
const greeting2 = document.querySelector(".page.two #greeting");

function updateGreetings() {
  if (hour >= 5 && hour < 12) {
    greeting1.textContent = 'Good morning';
    greeting2.textContent = 'Good morning';
  } else if (hour >= 12 && hour < 18) {
    greeting1.textContent = 'Good afternoon';
    greeting2.textContent = 'Good afternoon';
  } else {
    greeting1.textContent = 'Good evening';
    greeting2.textContent = 'Good evening';
  }
};

updateGreetings();

const todoButton = document.querySelector('.todo');
const todoPanel = document.querySelector('.todo-panel');
const closeTodoButton = document.querySelector('.close');
const todoList = document.querySelector('.todo-list');
const todoForm = document.querySelector('.todo-form');
const todoInput = document.querySelector('.todo-input');

let todos = [];

function renderTodos() {
  todoList.innerHTML = '';
  for (let i = 0; i < todos.length; i++) {
    const todo = todos[i];
    const todoItem = document.createElement('li');
    todoItem.className = 'todo-item';
    const todoCheckbox = document.createElement('input');
    todoCheckbox.type = 'checkbox';
    todoCheckbox.checked = todo.completed;
    todoCheckbox.addEventListener('change', () => {
      todo.completed = !todo.completed;
      saveTodos();
      renderTodos();
    });
    const todoText = document.createElement('span');
    todoText.textContent = todo.text;
    if (todo.completed) {
      todoText.style.textDecoration = 'line-through';
    }
    const todoDeleteButton = document.createElement('button');
    todoDeleteButton.textContent = 'Delete';
    todoDeleteButton.addEventListener('click', () => {
      todos.splice(i, 1);
      saveTodos();
      renderTodos();
    });
    todoItem.appendChild(todoCheckbox);
    todoItem.appendChild(todoText);
    todoItem.appendChild(todoDeleteButton);
    todoList.appendChild(todoItem);
  }
}

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos() {
  const storedTodos = localStorage.getItem('todos');
  if (storedTodos) {
    todos = JSON.parse(storedTodos);
    renderTodos();
  }
}

todoButton.addEventListener('click', () => {
  todoPanel.style.display = 'block';
  todoButton.style.display = 'none'
  loadTodos();
});

closeTodoButton.addEventListener('click', () => {
  todoPanel.style.display = 'none';
  todoButton.style.display = 'flex'
});

todoForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const todoText = todoInput.value.trim();
  if (todoText) {
    todos.push({
      text: todoText,
      completed: false
    });
    saveTodos();
    renderTodos();
    todoInput.value = '';
  }
});