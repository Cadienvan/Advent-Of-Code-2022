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

// Create an array for every 3 lines
const lines = input.split("\n");
const linesPerGroup = 3;
const groups = [];
for (let i = 0; i < lines.length; i += linesPerGroup) {
  groups.push(lines.slice(i, i + linesPerGroup));
}

// For each group, get the only character appearing in all 3 lines
for (const group of groups) {
  const commonCharacters = group[0]
    .split("")
    .filter(
      (character) =>
        group[1].includes(character) && group[2].includes(character)
    );
  if (commonCharacters.length) {
    priorityScore += priorities[commonCharacters[0]];
  }
}

// Print the priority score
console.log(priorityScore);
