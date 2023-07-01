document.getElementById("generation").innerHTML = "";
for (var i = 1; i <= 9; i++) {
  document.getElementById("generation").innerHTML += `<li>
        <input type="checkbox" id="gen${i}" value="gen${i}" class="hidden peer" required="" checked>
        <label for="gen${i}" class="bi relative inline-flex items-center justify-between w-full p-2 text-gray-500 bg-white border-2 border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">                           
            <div class="w-full text-base font-semibold text-center">Gen ${i}</div>
        </label>
    </li>`;
}
