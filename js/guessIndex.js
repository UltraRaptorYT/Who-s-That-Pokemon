let total = sessionStorage.getItem("total2")
  ? parseInt(sessionStorage.getItem("total2"))
  : 0;
let score = sessionStorage.getItem("score2")
  ? parseInt(sessionStorage.getItem("score2"))
  : 0;
let pokeHist = [];

function startGame() {
  total = sessionStorage.getItem("total2")
    ? parseInt(sessionStorage.getItem("total2"))
    : 0;
  score = sessionStorage.getItem("score2")
    ? parseInt(sessionStorage.getItem("score2"))
    : 0;
  next();
}

function next() {
  document.getElementById("answer").focus();
  document.getElementById("answer").value = "";
  document.getElementById("score").innerText = `Score: ${score}/${total}`;
  do {
    var pokeNum = generateNumber(1, POKEDEX.length);
  } while (pokeHist.includes(pokeNum));
  let pokemonElement = document.getElementById("pokemon");
  pokemonElement.classList.add("pokemon");
  pokemonElement.style.backgroundImage = `url("./src/${pokeNum}.png")`;
}

startGame();

document.getElementById("ok").addEventListener("click", () => {
  checkAnswer();
});

document.getElementById("answer").addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    checkAnswer();
  }
});

document.getElementById("answer").addEventListener("input", (e) => {
  answerChecker();
});

function answerChecker() {
  document.getElementById("answer").focus();
  let style = window.getComputedStyle(
    document.getElementById("pokemon"),
    false
  );
  let bi = style.backgroundImage.slice(4, -1).replace(/"/g, "");
  let dataCheck = bi.replace(".png", "").split("src/")[1];
  if (document.getElementById("answer").value == dataCheck) {
    score++;
    sessionStorage.setItem("score2", score);
    pokeHist.push(parseInt(dataCheck));
    if (pokeHist.length >= POKEDEX.length) {
      pokeHist = [];
    }
    total++;
    sessionStorage.setItem("total2", total);
    next();
  }
}

function checkAnswer() {
  document.getElementById("answer").focus();
  let style = window.getComputedStyle(
    document.getElementById("pokemon"),
    false
  );
  let bi = style.backgroundImage.slice(4, -1).replace(/"/g, "");
  let dataCheck = bi.replace(".png", "").split("src/")[1];
  if (document.getElementById("answer").value == dataCheck) {
    score++;
    sessionStorage.setItem("score2", score);
    pokeHist.push(parseInt(dataCheck));
    if (pokeHist.length >= POKEDEX.length) {
      pokeHist = [];
    }
  }
  total++;
  sessionStorage.setItem("total2", total);
  next();
}

document.getElementById("answer").focus();

let callGridArr = document
  .getElementById("callGrid")
  .querySelectorAll("button");
for (let button of callGridArr) {
  button.addEventListener("click", (e) => {
    let buttonHTML = e.target;
    if (e.target.tagName == "P") {
      buttonHTML = e.target.parentElement;
    } else if (e.target.tagName == "I") {
      return;
    }
    if (buttonHTML.id) {
      return;
    }
    document.getElementById("answer").focus();
    document.getElementById("answer").value += buttonHTML.dataset.value;
    answerChecker();
  });
}

document.getElementById("backspace").addEventListener("click", () => {
  document.getElementById("answer").focus();
  document.getElementById("answer").value = document
    .getElementById("answer")
    .value.slice(0, -1);
});

document.getElementById("answer").addEventListener("input", () => {
  document.getElementById("answer").value = document
    .getElementById("answer")
    .value.replace(/[^\d]/g, "");
});

if (window.innerWidth <= 576) {
  document.getElementById("answer").readOnly = true;
} else {
  document.getElementById("answer").readOnly = false;
}

function resetScore() {
  sessionStorage.removeItem("score2");
  sessionStorage.removeItem("total2");
  score = 0;
  total = 0;
  startGame();
}
