const images = ['image4.png', 'image2.png', 'image3.png'];
let index = 0;

const imageObjects = [];
for (const image of images) {
  const img = new Image();
  img.src = `media/${image}`;
  imageObjects.push(img);
}

setInterval(() => {
  const imageUrl = `url('media/${images[index]}')`;
  document.getElementById('overview').style.backgroundImage = `${imageUrl}`;
  index = (index + 1) % images.length;
}, 5000);