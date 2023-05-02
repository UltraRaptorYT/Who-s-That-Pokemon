let total = 0;
let score = 0;

function startGame() {
  total = 0;
  score = 0;
  next();
}

function next() {
  let pokeNum = generateNumber(1, POKEDEX.length);
  // let pokeNum = 100;

  document.getElementById("pokeDex").innerText = `Pokemon #${pokeNum}`;
  document.getElementById("score").innerText = `Score: ${score}/${total}`;

  let padNum = pokeNum.toString().padStart(4, "0");

  let pokeArr = [pokeNum];
  for (let i = 0; i < 9; i++) {
    do {
      let padArr = padNum.split("");
      let updateIndex = generateNumber(0, padArr.length - 1);
      if (Math.random() < 0.85) {
        padArr[updateIndex] = generateNumber(0, 9);
        var genNum = parseInt(padArr.join(""));
      } else {
        var genNum = parseInt(padArr.join(""));
        let diff = Math.random() < 0.5 ? -1 : 1;
        genNum -= diff;
      }
    } while (
      genNum > POKEDEX.length ||
      pokeArr.includes(genNum) ||
      genNum <= 0
    );
    pokeArr.push(genNum);
  }
  shuffleArr(pokeArr);
  document.getElementById("pokeFlex").textContent = "";
  for (let pokeDex of pokeArr) {
    let pokemonElement = document.createElement("div");
    pokemonElement.classList.add("pokemon");
    pokemonElement.classList.add("guess");
    pokemonElement.classList.add("flex");
    pokemonElement.classList.add("flex-col");
    pokemonElement.classList.add("text-center");
    pokemonElement.classList.add("justify-end");
    pokemonElement.textContent = POKEDEX[pokeDex - 1].name;
    // pokemonElement.textContent = pokeDex;
    pokemonElement.style.backgroundImage = `url("./src/${pokeDex}.png")`;
    document.getElementById("pokeFlex").appendChild(pokemonElement);
  }

  let allPokemonElement = document.querySelectorAll(".guess");

  allPokemonElement.forEach((el) =>
    el.addEventListener("click", (e) => {
      let style = window.getComputedStyle(e.target, false);
      let bi = style.backgroundImage.slice(4, -1).replace(/"/g, "");
      let dataCheck = bi.replace(".png", "").split("src/")[1];
      if (dataCheck == pokeNum) {
        score++;
      }
      total++;
      next();
    })
  );
}

startGame();
