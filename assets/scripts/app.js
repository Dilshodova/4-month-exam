const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");
const inpWord = document.getElementById("inp-word");
const form = document.querySelector(".search-box");
const wordExample = document.getElementsByClassName("word-example");

form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  let inpWordValue = inpWord.value;
  fetch(`${url}${inpWordValue}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      result.innerHTML = `
         <div class="word">
        <h3>${inpWordValue}</h3>
        <button onclick="playSound()">
            <i class="fa fa-volume-up" aria-hidden="true"></i>
        </button>
    </div>
        <div class="details">
             <p>${data[0].meanings[0].partOfSpeech}</p>
            <p>/${data[0].phonetics[0].text}/</p>
        </div>
    <p class="word-meaning">
    ${data[0].meanings[0].definitions[0].definition}
    </p>
    <p class="word-example">${
      data[0].meanings[0].definitions[0].example || "No example with sentences"
    }</p>`;
      sound.setAttribute("src", `${data[0].phonetics[1].audio}`);
    })
    .catch(() => {
      result.innerHTML = `<h3>Word you wanted is not defined</h3>`;
    });
});

function playSound() {
  sound.play();
}
