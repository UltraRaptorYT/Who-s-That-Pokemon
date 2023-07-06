/*
{
  best: {
    time: __,
    pokemonId: __
  },
  streaks: __,
  totals: {
    time: __,
    guesses: __
  }
}
*/
let records = localStorage.getItem("records");

var timingArr = [];
var indexArr = [];
var resultsDict = {};

records = JSON.parse(records);
if (records == null) {
  records = {
    best: {
      time: 0,
      pokemonId: 0,
    },
    streaks: 0,
    total: {
      time: 0,
      guesses: 0,
    },
  };
  localStorage.setItem("records", JSON.stringify(records));
}

let bestPokemonIdx = records["best"]["pokemonId"];
let bestTime = records["best"]["time"];
let bestStreak = records["streaks"];
let totalTime = records["total"]["time"];
let totalGuess = records["total"]["guesses"];
let currentStreak = 0;

document.getElementById("averageTime").innerText = isNaN(totalTime / totalGuess)
  ? "-"
  : (totalTime / totalGuess / 1000).toFixed(2);
document.getElementById("currentStreak").innerText = currentStreak;
document.getElementById("bestStreak").innerText = bestStreak;
document.getElementById("bestTimePokemon").innerText = bestPokemonIdx
  ? `#${bestPokemonIdx} ${POKEDEX[bestPokemonIdx - 1]["name"]}`
  : "-";
document.getElementById("bestTime").innerText = (bestTime / 1000).toFixed(2);

let total = sessionStorage.getItem("total")
  ? parseInt(sessionStorage.getItem("total"))
  : 0;
let score = sessionStorage.getItem("score")
  ? parseInt(sessionStorage.getItem("score"))
  : 0;

function startGuessFromIndex() {
  total = sessionStorage.getItem("total")
    ? parseInt(sessionStorage.getItem("total"))
    : 0;
  score = sessionStorage.getItem("score")
    ? parseInt(sessionStorage.getItem("score"))
    : 0;
  nextGuessFromIndex();
}

function nextGuessFromIndex(prevTime = null) {
  if (prevTime != null) {
    document.getElementById("previousTime").innerText = (
      prevTime / 1000
    ).toFixed(2);
  } else {
    document.getElementById("previousTime").innerText = "-";
    currentStreak = 0;
    document.getElementById("currentStreak").innerText = currentStreak;
  }
  document.getElementById("score").innerText = `${score} / ${total}`;
  var startTime = Date.now();
  let pokeNum;
  do {
    //let pokeNum = generateNumber(1, POKEDEX.length);
    // document.getElementById("pokeDex").innerText = `Pokemon #${pokeNum}`;
    pokeNum = generateNumber(1, 100);
    // pokeNum = 1;

    let padNum = pokeNum.toString().padStart(4, "0");

    var pokeArr = [pokeNum];
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
    var inGen = false;
    let genArr = document.querySelectorAll(`input[name="generation"]`);
    for (let [idx, gen] of Object.entries(genArr)) {
      if (gen.checked) {
        let min;
        if (idx == 0) {
          min = 0;
        } else {
          min = GENERATION[idx - 1]["total"];
        }
        let max = GENERATION[idx]["total"];
        if (pokeNum > min && pokeNum <= max) {
          inGen = true;
        }
      }
    }
  } while (Object.keys(resultsDict).includes(pokeNum.toString()) || !inGen); // change to or
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
    if (document.getElementById("shadow").checked) {
      pokemonElement.classList.add("black");
      pokemonElement.textContent = " ";
    } else {
      pokemonElement.textContent = POKEDEX[pokeDex - 1].name;
    }
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
      let prevTime = null;
      if (dataCheck == pokeNum) {
        var endTime = Date.now();
        prevTime = endTime - startTime;
        resultsDict[pokeNum] = prevTime;
        totalTime += prevTime;
        totalGuess++;
        let genArr = document.querySelectorAll(
          `input.hidden.peer[name="generation"]`
        );
        var pokeLength = 0;
        for (let [idx, gen] of Object.entries(genArr)) {
          if (gen.checked) {
            pokeLength += GENERATION[idx]["count"];
          }
        }
        if (Object.keys(resultsDict).length == pokeLength) {
          resultsDict = {};
        }
        score++;
        sessionStorage.setItem("score", score);
        currentStreak++;
        if (bestStreak < currentStreak) {
          bestStreak = currentStreak;
          document.getElementById("bestStreak").innerText = bestStreak;
        }
        let tempTime = Math.min(...Object.values(resultsDict));
        console.log(tempTime, bestTime);
        if (bestTime > tempTime || bestTime == 0) {
          bestTime = tempTime;
          bestPokemonIdx = pokeNum;
        }
        records = {
          best: {
            time: bestTime,
            pokemonId: bestPokemonIdx,
          },
          streaks: bestStreak,
          total: {
            time: totalTime,
            guesses: totalGuess,
          },
        };
        localStorage.setItem("records", JSON.stringify(records));
        document.getElementById("averageTime").innerText = isNaN(
          totalTime / totalGuess
        )
          ? "-"
          : (totalTime / totalGuess / 1000).toFixed(2);
        document.getElementById("bestTimePokemon").innerText = bestPokemonIdx
          ? `#${bestPokemonIdx} ${POKEDEX[bestPokemonIdx - 1]["name"]}`
          : "-";
        document.getElementById("bestTime").innerText = (
          bestTime / 1000
        ).toFixed(2);
      } else {
        currentStreak = 0;
        generateToast(
          `Correct Answer is ${POKEDEX[pokeNum - 1]["name"]}`,
          "red",
          5000
        );
      }
      total++;
      sessionStorage.setItem("total", total);
      document.getElementById("currentStreak").innerText = currentStreak;
      nextGuessFromIndex(prevTime);
    })
  );
}

function resetScore() {
  sessionStorage.removeItem("score");
  sessionStorage.removeItem("total");
  score = 0;
  total = 0;
  startGuessFromIndex();
}
