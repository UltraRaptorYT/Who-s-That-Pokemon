let marquee = document.createElement("div");
marquee.classList.add("marquee");
let marqueeClone = marquee.cloneNode(true);
let marqueeContent = document.createElement("div");
marqueeContent.classList.add("marquee__content");

for (let i = 0; i < 20; i++) {
  let pokemonElement = document.createElement("div");
  pokemonElement.classList.add("pokemon");
  pokemonElement.classList.add("black");
  pokemonElement.style.backgroundImage = `url("./src/${generateNumber(
    1,
    POKEDEX.length
  )}.png")`;
  marqueeContent.appendChild(pokemonElement);
}

marquee.appendChild(marqueeContent);
marquee.appendChild(marqueeContent.cloneNode(true));
document.getElementById("main").appendChild(marquee);
let marqueeContentClone = document.createElement("div");
marqueeContentClone.classList.add("marquee__content");
marqueeContentClone.classList.add("reverse");

for (let i = 0; i < 20; i++) {
  let pokemonElement = document.createElement("div");
  pokemonElement.classList.add("pokemon");
  pokemonElement.classList.add("black");
  pokemonElement.style.backgroundImage = `url("./src/${generateNumber(
    1,
    POKEDEX.length
  )}.png")`;
  marqueeContentClone.appendChild(pokemonElement);
}

marqueeClone.appendChild(marqueeContentClone);
marqueeClone.appendChild(marqueeContentClone.cloneNode(true));
document.getElementById("main").appendChild(marqueeClone);

function generateNumber(min = 0, max) {
  return Math.floor(Math.random() * max + min);
}

function shuffleArr(arr) {
  let currentIndex = arr.length,
    randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [arr[currentIndex], arr[randomIndex]] = [
      arr[randomIndex],
      arr[currentIndex],
    ];
  }

  return arr;
}
