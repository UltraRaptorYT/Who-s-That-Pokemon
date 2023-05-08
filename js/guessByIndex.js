let total = sessionStorage.getItem("total")
  ? parseInt(sessionStorage.getItem("total"))
  : 0;
let score = sessionStorage.getItem("score")
  ? parseInt(sessionStorage.getItem("score"))
  : 0;

function startGame() {
  total = sessionStorage.getItem("total")
    ? parseInt(sessionStorage.getItem("total"))
    : 0;
  score = sessionStorage.getItem("score")
    ? parseInt(sessionStorage.getItem("score"))
    : 0;
  next();
}

function next() {
  //let pokeNum = generateNumber(1, POKEDEX.length);
  let pokeNum = generateNumber(1, 100);
  // let pokeNum = 1;

  // document.getElementById("pokeDex").innerText = `Pokemon #${pokeNum}`;
  document.getElementById("score").innerText = `Score: ${score}/${total}`;

  let padNum = pokeNum.toString().padStart(4, "0");

  let pokeArr = [pokeNum];
  for (let i = 0; i < 9; i++) {
    do {
      let padArr = padNum.split("");
      // Old Method
      // let updateIndex = generateNumber(0, padArr.length - 1);
      // Kenneth Method
      // let updateIndex = generateNumber(0, padArr.length - 2);
      // padArr[updateIndex] = generateNumber(0, 9);
      if (pokeNum <= POKEDEX.length % 100) {
        var genNum = pokeNum + 100 * generateNumber(1, 10);
      } else {
        var genNum = pokeNum + 100 * (i + 1);
      }
      if (genNum > POKEDEX.length) {
        genNum = generateNumber(1, POKEDEX.length);
      }
      // if (Math.random() < 0.90) {
      //   padArr[updateIndex] = generateNumber(0, 9);
      //   var genNum = parseInt(padArr.join(""));
      // } else {
      //   var genNum = parseInt(padArr.join(""));
      //   // let diff = Math.random() < 0.5 ? -1 : 1;
      //   let diff = generateNumber(0, 6) - 3;
      //   genNum -= diff;
      // }
    } while (
      genNum > POKEDEX.length ||
      pokeArr.includes(genNum) ||
      genNum <= 0
    );
    pokeArr.push(genNum);
  }
  shuffleArr(pokeArr);
  pokeNum = pokeArr[generateNumber(0, 9)];

  document.getElementById("pokeDex").innerText = `Pokemon #${pokeNum}`;
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
        sessionStorage.setItem("score", score);
      }
      total++;
      sessionStorage.setItem("total", total);
      next();
    })
  );
}

startGame();

function resetScore() {
  sessionStorage.removeItem("score");
  sessionStorage.removeItem("total");
  score = 0;
  total = 0;
  startGame();
}
