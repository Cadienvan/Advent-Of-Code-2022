// Open the file input.txt
const fs = require("fs");
const input = fs.readFileSync(__dirname + "/input.txt", "utf8");

let overlapping = 0;
for (const line of input.split("\n")) {
  const [a1, a2, b1, b2] = line.split(',').map(x => x.split('-').map(y => parseInt(y)).flat()).flat();

  // Check if range a1-a2 overlaps with b1-b2, even partially
  if (a1 <= b2 && a2 >= b1) {
    overlapping++;
  }
}

console.log(overlapping);
