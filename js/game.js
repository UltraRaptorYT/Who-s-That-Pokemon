function updateGameMode() {
  let gameModeArr = document.querySelectorAll("input[name='gameMode']");

  for (var gameMode of gameModeArr) {
    if (gameMode.checked) {
      break;
    }
  }

  switch (gameMode.value) {
    case "guessFromIndex":
      document.getElementById("gameMode").innerText = "Guess From Index";
      startGuessFromIndex();
      break;
    case "guessingIndex":
      document.getElementById("gameMode").innerText = "Guessing Index";
      window.location.href = "./pokemon.html";
      break;
    default:
      console.error("Invalid Game Mode");
      break;
  }
}

function updateGameSettings(e) {
  /*
    {
      generations: [1,2,3,4,5,6,7,8,9],
      shadow: false
    }
  */
  console.log(e);
  let settingDict = {
    generations: [],
    shadow: document.getElementById("shadow").checked,
  };
  let genArr = document.querySelectorAll(`input[name="generation"]`);
  for (let genInput of genArr) {
    if (genInput.checked) {
      settingDict["generations"].push(genInput.value);
    }
  }
  if (settingDict["generations"].length == 0) {
    generateToast(`Unable to update your new settings`, (color = "red"));
    e.target.checked = true;
    return;
  }
  console.log(settingDict["generations"]);
  if (localStorage.getItem("settings") == null) {
    localStorage.setItem("settings", JSON.stringify(settingDict));
  }
  document
    .getElementById("body")
    .prepend(
      generateToast(`Your new settings will take effect for the next Pokémon`)
    );
  localStorage.setItem("settings", JSON.stringify(settingDict));
}

function generateToast(message = "", color = "blue", delay = 3000) {
  if (document.getElementById("toast")) {
    document.getElementById("toast").remove();
  }
  let toast = document.createElement("div");
  toast.id = "toast";
  toast.classList.add(`fixed`);
  toast.classList.add(`z-50`);
  toast.classList.add(`top-[40px]`);
  toast.classList.add(`left-1/2`);
  toast.classList.add(`-translate-x-1/2`);
  toast.classList.add(`flex`);
  toast.classList.add(`items-center`);
  toast.classList.add(`w-full`);
  toast.classList.add(`max-w-xs`);
  toast.classList.add(`p-4`);
  toast.classList.add(`rounded-lg`);
  toast.classList.add(`shadow`);
  toast.classList.add(`text-${color}-400`);
  toast.classList.add(`bg-gray-800`);
  let toastText = document.createElement("div");
  toastText.classList.add(`text-sm`);
  toastText.classList.add(`font-bold`);
  toastText.innerText = message;
  let closeButtonDiv = document.createElement("div");
  closeButtonDiv.classList.add(`flex`);
  closeButtonDiv.classList.add(`items-center`);
  closeButtonDiv.classList.add(`ml-auto`);
  closeButtonDiv.classList.add(`space-x-2`);
  let closeButton = document.createElement("button");
  closeButton.type = "button";
  closeButton.classList.add(`rounded-lg`);
  closeButton.classList.add(`focus:ring-2`);
  closeButton.classList.add(`focus:ring-gray-300`);
  closeButton.classList.add(`p-1.5`);
  closeButton.classList.add(`inline-flex`);
  closeButton.classList.add(`h-8`);
  closeButton.classList.add(`w-8`);
  closeButton.classList.add(`text-gray-500`);
  closeButton.classList.add(`hover:text-white`);
  closeButton.classList.add(`bg-gray-800`);
  closeButton.classList.add(`hover:bg-gray-700`);
  closeButton.classList.add(`items-center`);
  closeButton.classList.add(`justify-center`);
  closeButton.addEventListener("click", () => {
    toast.remove();
  });
  let xButton = document.createElement("i");
  xButton.classList.add("bi");
  xButton.classList.add("bi-x-lg");
  closeButton.appendChild(xButton);
  closeButtonDiv.appendChild(closeButton);
  toast.appendChild(toastText);
  toast.appendChild(closeButtonDiv);
  setTimeout(() => {
    toast.remove();
  }, delay);
  document.getElementById("body").prepend(toast);
  return toast;
}

function removeStorage() {
  let confirmStorage = confirm(`Are you sure you want to clear storage?`);
  if (confirmStorage) {
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
  }
}

updateGameMode();
