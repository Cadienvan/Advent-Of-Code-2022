// Open file input.txt
const fs = require("fs");
const input = fs.readFileSync(__dirname + "/input.txt", "utf8");

const FIRST_HAND = {
  A: "ROCK",
  B: "PAPER",
  C: "SCISSORS",
};

const SECOND_HAND = {
  X: "ROCK",
  Y: "PAPER",
  Z: "SCISSORS",
};

function isSecondHandWinner(firstHandChoice, secondHandChoice) {
  return (
    (secondHandChoice === "ROCK" && firstHandChoice === "SCISSORS") ||
    (secondHandChoice === "PAPER" && firstHandChoice === "ROCK") ||
    (secondHandChoice === "SCISSORS" && firstHandChoice === "PAPER")
  );
}

// First hand/second hand composition
// For Step 1:
// First Hand:
// A: Rock
// B: Paper
// C: Scissors
// Second Hand:
// X: Rock
// Y: Paper
// Z: Scissors
// For Step 2:
// X: Lose
// Y: Draw
// Z: Win
const SCORE_DEFINITION = {
  WIN: 6,
  DRAW: 3,
  LOSE: 0,
};
// Additional scores
const addedScores = {
  X: 1,
  Y: 2,
  Z: 3,
};

// For each line, calculate the score
const scores = input.split("\n").map((line) => {
  let score = 0;
  // Split the line into 2 hands
  const [firstHand, secondHand] = line.split(" ");
  const firstHandChoice = FIRST_HAND[firstHand];
  const secondHandChoice = SECOND_HAND[secondHand];
  // For each hand, calculate the score
  // If the second hand wins, add the score
  if (isSecondHandWinner(firstHandChoice, secondHandChoice)) {
    score += SCORE_DEFINITION.WIN;
  } else if (firstHandChoice === secondHandChoice) {
    // If it's a draw, add the score
    score += SCORE_DEFINITION.DRAW;
  } else {
    // If the first hand wins, add the score
    score += SCORE_DEFINITION.LOSE;
  }
  // Add the additional score
  score += addedScores[secondHand];
  return score;
});
console.log(
  "Step 1: ",
  scores.reduce((a, b) => a + b, 0)
);
