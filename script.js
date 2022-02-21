"use strict";

// Selecting elements
const player0El = document.querySelector(".player-0");
const player1El = document.querySelector(".player-1");
const score0El = document.querySelector(".player-0-temp-score");
const score1El = document.querySelector(".player-1-temp-score");
const current0El = document.querySelector(".current-score-player-0");
const current1El = document.querySelector(".current-score-player-1");

const diceELPlayer1 = document.querySelector(".dice-0");
const diceELPlayer2 = document.querySelector(".dice-1");
const btnNewPlayer1 = document.querySelector("#restart-btn-0");
const btnNewPlayer2 = document.querySelector("#restart-btn-1");
const btnRollPlayer1 = document.querySelector(".roll-player-0");
const btnRollPlayer2 = document.querySelector(".roll-player-1");
const btnHoldPlayer1 = document.querySelector(".hold-player-0");
const btnHoldPlayer2 = document.querySelector(".hold-player-1");

const winScore = 50;

let scores;
let currentScore;
let activePlayer;
let playing;
let firstTimePlaying = true;
let initilizing = true;

const SwitchPlayer = () => {
  document.querySelector(`.current-score-player-${activePlayer}`).textContent = 0;
  currentScore = 0;

  if (!firstTimePlaying) {
    if (!initilizing) {
      console.log("Here");
      activePlayer = activePlayer === 0 ? 1 : 0;
      player0El.classList.toggle("player-active");
      player1El.classList.toggle("player-active");
      initilizing = false;
    }
    firstTimePlaying = false;
  }

  if (activePlayer === 0) {
    btnNewPlayer1.disabled = false;
    btnRollPlayer1.disabled = false;
    btnHoldPlayer1.disabled = false;
    btnNewPlayer2.disabled = true;
    btnRollPlayer2.disabled = true;
    btnHoldPlayer2.disabled = true;
  } else {
    btnNewPlayer1.disabled = true;
    btnRollPlayer1.disabled = true;
    btnHoldPlayer1.disabled = true;
    btnNewPlayer2.disabled = false;
    btnRollPlayer2.disabled = false;
    btnHoldPlayer2.disabled = false;
  }

  if (activePlayer === 0 && window.screen.width < 450) {
    document.querySelector(".player-0-scroll").scrollIntoView();
  } else if (activePlayer === 1 && window.screen.width < 450) {
    document.querySelector(".player-1-scroll").scrollIntoView();
  }
};

const RollDice = () => {
  if (playing) {
    firstTimePlaying = false;
    initilizing = false;
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    if (activePlayer == 0) {
      diceELPlayer1.classList.remove("hidden");
      diceELPlayer1.src = `dice-${dice}.png`;
    } else {
      diceELPlayer2.classList.remove("hidden");
      diceELPlayer2.src = `dice-${dice}.png`;
    }

    // 3. Check for rolled 1
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.querySelector(`.current-score-player-${activePlayer}`).textContent = currentScore;
    } else {
      // Switch to next player
      firstTimePlaying = false;
      SwitchPlayer();
    }
  }
};

const HoldCurrentScore = () => {
  if (playing) {
    firstTimePlaying = false;
    initilizing = false;
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore

    document.querySelector(
      `.player-${activePlayer}-temp-score`
    ).textContent = scores[activePlayer];

    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= winScore) {
      // Finish the game
      playing = false;

      document.querySelector(`.player-${activePlayer}`).classList.add("player-winner");
      document.querySelector(`.player-${activePlayer}`).classList.remove("player-active");
    } else {
      // Switch to the next player
      SwitchPlayer();
    }
  }
};

// Starting conditions
const init = () => {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  initilizing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  player0El.classList.remove("player-winner");
  player1El.classList.remove("player-winner");
  player0El.classList.add("player-active");
  player1El.classList.remove("player-active");

  SwitchPlayer();
};

init();

btnNewPlayer1.addEventListener("click", init);
btnNewPlayer2.addEventListener("click", init);

btnRollPlayer1.addEventListener("click", RollDice);
btnRollPlayer2.addEventListener("click", RollDice);

btnHoldPlayer1.addEventListener("click", HoldCurrentScore);
btnHoldPlayer2.addEventListener("click", HoldCurrentScore);
