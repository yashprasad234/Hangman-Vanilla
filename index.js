import words from "./wordList.js";

const hangmanAnswer = document.querySelector(".hangman-answer");
const heading = document.querySelector(".heading");
const keyboard = document.querySelector(".keyboard");

let guessedLetters = [];
let wrongGuesses = 0;
let correctGuesses = 0;
let isGameOn = true;
let notGuessedCorrectly = [];
let hangmanBodyParts = [
  "head",
  "body",
  "right-hand",
  "left-hand",
  "right-leg",
  "left-leg",
];

const ans = words[Math.floor(Math.random() * words.length)];
const spreadAns = ans.split("");
// console.log(ans);

function displayUnderline() {
  let html = "";
  spreadAns.map((letter) => {
    html = `${html}<span class="underline" ><span class="ans-letter" style="visibility: hidden;" >${letter}</span></span>`;
  });
  hangmanAnswer.innerHTML = html;
}

function showCorrectlyGuessedLetter(ansLettersToVisible, guess) {
  for (let i = 0; i < spreadAns.length; i++) {
    if (spreadAns[i] == guess) {
      ansLettersToVisible.push(document.querySelectorAll(".ans-letter")[i]);
    }
  }
  for (let i = 0; i < ansLettersToVisible.length; i++) {
    ansLettersToVisible[i].style.visibility = "visible";
    correctGuesses++;
  }
}

function failedToGuess() {
  heading.textContent = "You Lost";
  notGuessedCorrectly = spreadAns.filter(
    (letter) => !guessedLetters.includes(letter)
  );
  let notGuessedAnsLettersEl = [];
  for (let i = 0; i < spreadAns.length; i++) {
    if (notGuessedCorrectly.includes(spreadAns[i])) {
      notGuessedAnsLettersEl.push(document.querySelectorAll(".ans-letter")[i]);
    }
  }
  for (let i = 0; i < notGuessedAnsLettersEl.length; i++) {
    notGuessedAnsLettersEl[i].style.visibility = "visible";
    notGuessedAnsLettersEl[i].classList.add("not-guessed");
  }
}

function showHangman(button) {
  button.disabled = true;
  document
    .getElementById(`${hangmanBodyParts[wrongGuesses - 1]}`)
    .classList.remove("hidden");
  document
    .getElementById(`${hangmanBodyParts[wrongGuesses - 1]}`)
    .classList.add("visible");
}

const handleKeyboardClick = (e) => {
  const button = e.target;
  const guess = button.id;
  const ansLettersToVisible = [];
  if (isGameOn && !guessedLetters.includes(guess)) {
    guessedLetters.push(guess);
    if (spreadAns.includes(guess)) {
      showCorrectlyGuessedLetter(ansLettersToVisible, guess);
      if (correctGuesses === spreadAns.length) {
        heading.textContent = "You won! 🎉";
        isGameOn = false;
        keyboard.removeEventListener("click", handleKeyboardClick);
      }
    } else {
      wrongGuesses++;
      if (wrongGuesses === 6) {
        isGameOn = false;
        failedToGuess();
        keyboard.removeEventListener("click", handleKeyboardClick);
      }
      showHangman(button);
    }
  }
};

const handleKeyPress = (e) => {
  const guess = e.key.toLowerCase();
  const guessAscii = guess.charCodeAt(0);
  // console.log(guess);
  if (guessAscii >= 97 && guessAscii <= 122) {
    const button = document.getElementById(`${guess}`);
    // console.log(button);
    const ansLettersToVisible = [];
    if (isGameOn && !guessedLetters.includes(guess)) {
      guessedLetters.push(guess);
      if (spreadAns.includes(guess)) {
        showCorrectlyGuessedLetter(ansLettersToVisible, guess);
        if (correctGuesses === spreadAns.length) {
          heading.textContent = "You won! 🎉";
          isGameOn = false;
          window.removeEventListener("click", handleKeyPress);
        }
      } else {
        wrongGuesses++;
        if (wrongGuesses === 6) {
          isGameOn = false;
          failedToGuess();
          window.removeEventListener("click", handleKeyPress);
        }
        showHangman(button);
      }
    }
  }
};

displayUnderline();
window.addEventListener("keydown", handleKeyPress);
keyboard.addEventListener("click", handleKeyboardClick);
