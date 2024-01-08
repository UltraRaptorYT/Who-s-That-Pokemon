let imgDiv = document.createElement("div");
imgDiv.style.display = "none";
for (let i = 1; i <= 151; i++) {
  let imgContainer = document.createElement("img");

  imgContainer.src = `./src/${i}.png`;
  imgContainer.onload = () => {
    console.log(`Pokemon ${i} loaded!`);
  };
  imgDiv.appendChild(imgContainer);
}

document.body.appendChild(imgDiv);

console.log("PRELOADING IMAGES");
