// Open the file input.txt
const fs = require("fs");
const input = fs.readFileSync(__dirname + "/input.txt", "utf8");
const sums = [];
// Every line can contain a number or nothing
// If the line contains a number, add it to the sum
// If the line is empty, save the sum in an array and reset it to 0
for (const line of input.split("\n")) {
  if (line) {
    sums[sums.length - 1] += Number(line);
  } else {
    sums.push(0);
  }
}
// When the file is done, print the sum of the 3 highets sums
console.log(
  sums
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((a, b) => a + b, 0)
);
