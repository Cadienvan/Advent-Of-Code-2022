// Open the file input.txt
const fs = require("fs");
const input = fs.readFileSync(__dirname + "/input.txt", "utf8");

// Define priorities:
// From a to z (lowercase) is 1-26, A-Z is 27-52
const priorities = {};
for (let i = 0; i < 26; i++) {
  priorities[String.fromCharCode(97 + i)] = i + 1;
  priorities[String.fromCharCode(65 + i)] = i + 27;
}

let priorityScore = 0;
for (const line of input.split("\n")) {
  // For each line, divide the content in 2 exact halves
  const firstHalf = line.slice(0, line.length / 2).split("");
  const secondHalf = line.slice(line.length / 2).split("");
  // Detect the characters appearing in both halves
  const commonCharacters = firstHalf.filter((character) =>
    secondHalf.includes(character)
  );
  // If commonCharacters are found, add the priority score for the first one
  if (commonCharacters.length) {
    priorityScore += priorities[commonCharacters[0]];
  }
}

// Print the priority score
console.log(priorityScore);
