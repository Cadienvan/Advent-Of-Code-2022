// Open file input.txt
const fs = require("fs");
const input = fs.readFileSync(__dirname + "/input.txt", "utf8");

const FIRST_HAND = {
  A: "ROCK",
  B: "PAPE",
  C: "SCIS",
};

const SECOND_HAND = {
  X: "ROCK",
  Y: "PAPE",
  Z: "SCIS",
};

function isSecondHandWinner(firstHandChoice, secondHandChoice) {
  return (
    (secondHandChoice === "ROCK" && firstHandChoice === "SCIS") ||
    (secondHandChoice === "PAPE" && firstHandChoice === "ROCK") ||
    (secondHandChoice === "SCIS" && firstHandChoice === "PAPE")
  );
}

// First hand/second hand composition
// For Step 1:
// First Hand:
// A: Rock
// B: Pape
// C: SCIS
// Second Hand:
// X: Rock
// Y: Pape
// Z: SCIS
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
  ROCK: 1,
  PAPE: 2,
  SCIS: 3,
};

// For each line, calculate the score
let scores = input.split("\n").map((line) => {
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
  score += addedScores[SECOND_HAND[secondHand]];
  return score;
});
console.log(
  "Step 1: ",
  scores.reduce((a, b) => a + b, 0)
);

// For step 2, we need to change the second hand definition
SECOND_HAND.X = "LOSE";
SECOND_HAND.Y = "DRAW";
SECOND_HAND.Z = "WIN";

// Create a function which takes firstHand and secondHand as parameters
// and returns the new second hand choice
function getSecondHandChoice(firstHand, secondHand) {
  const firstHandChoice = FIRST_HAND[firstHand];
  switch (secondHand) {
    case "LOSE":
      return firstHandChoice === "ROCK"
        ? "SCIS"
        : firstHandChoice === "PAPE"
        ? "ROCK"
        : "PAPE";
    case "DRAW":
      return firstHandChoice;
    case "WIN":
      return firstHandChoice === "ROCK"
        ? "PAPE"
        : firstHandChoice === "PAPE"
        ? "SCIS"
        : "ROCK";
      break;
  }
}
// For each line, calculate the score
scores = input.split("\n").map((line) => {
  let score = 0;
  // Split the line into 2 hands
  const [firstHand, secondHand] = line.split(" ");
  const firstHandChoice = FIRST_HAND[firstHand];
  const secondHandChoice = getSecondHandChoice(
    firstHand,
    SECOND_HAND[secondHand]
  );
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
  score += addedScores[secondHandChoice];
  console.log(
    firstHandChoice,
    " VS ",
    secondHandChoice,
    " -> ",
    SECOND_HAND[secondHand],
    " = ",
    score
  );
  return score;
});
console.log(
  "Step 2: ",
  scores.reduce((a, b) => a + b, 0)
);
