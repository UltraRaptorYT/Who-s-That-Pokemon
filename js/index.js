let settingsObj = localStorage.getItem("settings");

settingsObj = JSON.parse(settingsObj);
if (settingsObj == null) {
  settingsObj = {
    generations: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
    shadow: false,
  };
  localStorage.setItem("settings", JSON.stringify(settingsObj));
}

document.getElementById("generation").innerHTML = "";
for (var i = 1; i <= 9; i++) {
  let generationListItem = document.createElement("li");
  let inputCheckbox = document.createElement("input");
  inputCheckbox.setAttribute("id", `gen${i}`);
  inputCheckbox.setAttribute("value", `${i}`);
  inputCheckbox.setAttribute("type", `checkbox`);
  inputCheckbox.setAttribute("name", `generation`);
  inputCheckbox.classList.add("hidden");
  inputCheckbox.classList.add("peer");
  inputCheckbox.required = true;
  if (settingsObj["generations"].includes(i.toString())) {
    inputCheckbox.checked = true;
  }

  let inputLabel = document.createElement("label");
  inputLabel.setAttribute("for", `gen${i}`);
  inputLabel.classList.add(`bi`);
  inputLabel.classList.add(`relative`);
  inputLabel.classList.add(`inline-flex`);
  inputLabel.classList.add(`items-center`);
  inputLabel.classList.add(`justify-between`);
  inputLabel.classList.add(`w-full`);
  inputLabel.classList.add(`p-2`);
  inputLabel.classList.add(`border-2`);
  inputLabel.classList.add(`cursor-pointer`);
  inputLabel.classList.add(`hover:text-gray-300`);
  inputLabel.classList.add(`border-gray-700`);
  inputLabel.classList.add(`peer-checked:text-gray-300`);
  inputLabel.classList.add(`text-gray-400`);
  inputLabel.classList.add(`bg-gray-800`);
  inputLabel.classList.add(`hover:bg-gray-700`);

  let innerDiv = document.createElement("div");
  innerDiv.classList.add(`w-full`);
  innerDiv.classList.add(`text-base`);
  innerDiv.classList.add(`font-bold`);
  innerDiv.classList.add(`text-center`);
  innerDiv.innerText = `Gen ${i}`;

  inputLabel.appendChild(innerDiv);
  generationListItem.appendChild(inputCheckbox);
  generationListItem.appendChild(inputLabel);
  generationListItem.addEventListener("change", (e) => {
    updateGameSettings(e);
  });
  document.getElementById("generation").appendChild(generationListItem);
}

let shadowLabel = document.createElement("label");
shadowLabel.classList.add(`relative`);
shadowLabel.classList.add(`inline-flex`);
shadowLabel.classList.add(`items-center`);
shadowLabel.classList.add(`cursor-pointer`);
let shadowCheck = document.createElement("input");
shadowCheck.type = "checkbox";
shadowCheck.id = "shadow";
shadowCheck.value = "";
shadowCheck.classList.add("sr-only");
shadowCheck.classList.add("peer");
shadowCheck.addEventListener("change", (e) => {
  updateGameSettings(e);
});
if (settingsObj["shadow"]) {
  shadowCheck.checked = true;
}

let toggleButton = document.createElement("div");
toggleButton.classList.add(`w-11`);
toggleButton.classList.add(`h-6`);
toggleButton.classList.add(`rounded-full`);
toggleButton.classList.add(`peer`);
toggleButton.classList.add(`peer-focus:ring-4`);
toggleButton.classList.add(`peer-focus:ring-blue-800`);
toggleButton.classList.add(`bg-gray-700`);
toggleButton.classList.add(`peer-checked:after:translate-x-full`);
toggleButton.classList.add(`peer-checked:after:border-white`);
toggleButton.classList.add(`after:content-['']`);
toggleButton.classList.add(`after:absolute`);
toggleButton.classList.add(`after:top-0.5`);
toggleButton.classList.add(`after:left-[2px]`);
toggleButton.classList.add(`after:bg-white`);
toggleButton.classList.add(`after:border-gray-300`);
toggleButton.classList.add(`after:border`);
toggleButton.classList.add(`after:rounded-full`);
toggleButton.classList.add(`after:h-5`);
toggleButton.classList.add(`after:w-5`);
toggleButton.classList.add(`after:transition-all`);
toggleButton.classList.add(`border-gray-600`);
toggleButton.classList.add(`peer-checked:bg-blue-600`);

let shadowText = document.createElement("span");
shadowText.classList.add(`ml-3`);
shadowText.classList.add(`text-sm`);
shadowText.classList.add(`font-medium`);
shadowText.classList.add(`text-gray-300`);
shadowText.classList.add(`sm:text-gray-900`);
shadowText.innerText = `Shadow Sprite`;

shadowLabel.appendChild(shadowCheck);
shadowLabel.appendChild(toggleButton);
shadowLabel.appendChild(shadowText);

document.getElementById("gameModeSelector").parentElement.append(shadowLabel);
