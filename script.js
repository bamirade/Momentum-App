const images = ['image4.png', 'image2.png', 'image3.png']; //sample only, FIND THEME SOON!!!
let index = 0;

const imageObjects = [];
for (const image of images) {
  const img = new Image();
  img.src = `media/${image}`;
  imageObjects.push(img);
}

setInterval(() => {
  const imageUrl = `url('media/${images[index]}')`;
  document.querySelector('body').style.backgroundImage = `${imageUrl}`;
  index = (index + 1) % images.length;
}, 5000);


//var name = documentElementById("name").value;

//const quotes = ['quote 1', 'quote 2', 'quote 3']

//setInterval(() => {
//  const quoteText = quotes[index];
//  document. = `${quoteText}`;
//  index = (index + 1) % quoteText.length;
//}, 5000);