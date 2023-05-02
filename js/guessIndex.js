let total = 0;
let score = 0;

function startGame() {
  total = 0;
  score = 0;
  next();
}

function next() {
  document.getElementById("answer").focus();
  document.getElementById("answer").value = "";
  document.getElementById("score").innerText = `Score: ${score}/${total}`;
  let pokeNum = generateNumber(1, POKEDEX.length);
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
  }
  total++;
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
