const images = ["짱구.jpg", "짱구2.png", "스누피.png"];

function setImage() {
  const chosenImage = images[Math.floor(Math.random() * images.length)];
  const bgImage = document.createElement("img");
  bgImage.src = `img/${chosenImage}`;
  document.body.appendChild(bgImage);
}

setImage();
