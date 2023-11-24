function resetGame() {
  let mainDiv = document.createElement("div");
  mainDiv.classList.add("flex", "flex-col", "gap-8", "p-5");
  let headerDiv = document.createElement("div");
  headerDiv.classList.add("text-center", "font-bold", "text-2xl");
  headerDiv.innerText = "PokeDex Range";
  let flexDiv = document.createElement("div");
  flexDiv.classList.add("flex", "gap-5", "justify-between");
  const startDiv = document.createElement("div");

  const startLabel = document.createElement("label");
  startLabel.htmlFor = "min";
  startLabel.textContent = "Start";
  startLabel.classList.add(
    "block",
    "text-sm",
    "font-medium",
    "leading-6",
    "text-gray-900"
  );

  const startInput = document.createElement("input");
  startInput.type = "number";
  startInput.name = "min";
  startInput.id = "min";
  startInput.value = "1";
  startInput.classList.add(
    "block",
    "w-full",
    "rounded-md",
    "border-0",
    "py-1.5",
    "px-3",
    "text-gray-900",
    "shadow-sm",
    "ring-1",
    "ring-inset",
    "ring-gray-300",
    "placeholder:text-gray-400",
    "focus:ring-2",
    "focus:ring-inset",
    "focus:ring-indigo-600",
    "sm:text-sm",
    "sm:leading-6"
  );
  startInput.placeholder = "Minimum Value";

  startDiv.appendChild(startLabel);
  startDiv.appendChild(startInput);
  const endDiv = document.createElement("div");

  const endLabel = document.createElement("label");
  endLabel.htmlFor = "max";
  endLabel.textContent = "End";
  endLabel.classList.add(
    "block",
    "text-sm",
    "font-medium",
    "leading-6",
    "text-gray-900"
  );

  const endInput = document.createElement("input");
  endInput.type = "number";
  endInput.name = "max";
  endInput.id = "max";
  endInput.value = "151";
  endInput.classList.add(
    "block",
    "w-full",
    "rounded-md",
    "border-0",
    "py-1.5",
    "px-3",
    "text-gray-900",
    "shadow-sm",
    "ring-1",
    "ring-inset",
    "ring-gray-300",
    "placeholder:text-gray-400",
    "focus:ring-2",
    "focus:ring-inset",
    "focus:ring-indigo-600",
    "sm:text-sm",
    "sm:leading-6"
  );
  endInput.placeholder = "Maximum Value";

  endDiv.appendChild(endLabel);
  endDiv.appendChild(endInput);

  flexDiv.appendChild(startDiv);
  flexDiv.appendChild(endDiv);
  mainDiv.appendChild(headerDiv);
  let startBtn = document.createElement("button");
  startBtn.type = "button";
  startBtn.id = "startBtn";
  startBtn.classList.add(
    "rounded-md",
    "bg-indigo-600",
    "px-6",
    "py-2",
    "text-base",
    "font-semibold",
    "text-white",
    "shadow-sm",
    "hover:bg-indigo-500",
    "focus-visible:outline",
    "focus-visible:outline-2",
    "focus-visible:outline-offset-2",
    "focus-visible:outline-indigo-600",
    "mx-auto",
    "w-fit"
  );
  startBtn.innerText = "Start";
  startBtn.addEventListener("click", () => {
    if (startInput.value > endInput.value) {
      return alert("Start Value must be smaller than End Value");
    }
    if (startInput.value <= 0) {
      return alert("Start Value must be greater than 0");
    }
    if (endInput.value > POKEDEX.length) {
      return alert(`End Value must be smaller than ${POKEDEX.length}`);
    }
    startGame(startInput.value, endInput.value);
  });
  mainDiv.appendChild(flexDiv);
  mainDiv.appendChild(startBtn);
  let containerDiv = document.getElementById("container");
  containerDiv.innerHTML = "";
  containerDiv.appendChild(mainDiv);
}

resetGame();

let duration = 1;

let sessionPokemon = [];
function startGame(min, max) {
  let seconds = 55;
  let minutes = 0;
  let currentTime = new Date();
  let stopTime = new Date(currentTime);
  sessionPokemon = []
  stopTime.setMinutes(stopTime.getMinutes() + duration);
  console.log(currentTime - stopTime);

  let mainDiv = document.createElement("div");
  mainDiv.classList.add("flex", "flex-col", "gap-12");
  let headerDiv = document.createElement("div");
  headerDiv.classList.add("flex", "w-full", "justify-between", "p-5");
  let counterDiv = document.createElement("p");
  counterDiv.id = "counter";
  counterDiv.classList.add("font-bold", "text-2xl");
  counterDiv.innerText = 0;
  let timerDiv = document.createElement("p");
  timerDiv.id = "timer";
  timerDiv.classList.add("font-bold", "text-2xl");
  timerDiv.innerText = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;
  setInterval(() => {
    seconds += 1;
    if (seconds >= 60) {
      seconds = 0;
      minutes = 1;
    }
    timerDiv.innerText = `${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}`;
  }, 1000);
  let pokemonBtn = document.createElement("button");
  pokemonBtn.id = "pokemonBtn";
  pokemonBtn.appendChild(generatePokemon(min, max));
  pokemonBtn.addEventListener("click", (e) => {
    pokemonBtn.innerHTML = "";
    pokemonBtn.appendChild(generatePokemon(min, max));
    counterDiv.innerText = parseInt(counterDiv.innerText) + 1;
  });
  let containerDiv = document.getElementById("container");
  headerDiv.appendChild(counterDiv);
  headerDiv.appendChild(timerDiv);
  mainDiv.appendChild(headerDiv);
  mainDiv.appendChild(pokemonBtn);
  containerDiv.innerHTML = "";
  containerDiv.appendChild(mainDiv);
}

function generatePokemon(min, max) {
  if (sessionPokemon.length == max - min + 1) {
    alert("You have completed the PokeDex Range selected");
    return resetGame();
    // sessionPokemon = sessionPokemon.slice(sessionPokemon.length - 1);
  }
  let imgContainer = document.createElement("img");
  do {
    var pokeNum = generateNumber(parseInt(min), parseInt(max));
    console.log(pokeNum);
  } while (sessionPokemon.includes(pokeNum));
  sessionPokemon.push(pokeNum);
  imgContainer.src = `./src/${pokeNum}.png`;
  return imgContainer;
}
